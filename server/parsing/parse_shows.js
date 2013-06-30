// Imports
var colors = require('colors');
var fs = require('fs');
var csv = require('csv');
var u = require('./utils');

var sp = exports;
var INPUT, OUTPUT;
// Public
/**
 * Parse the show file
 * @param inputFilePath the absolute file path to the csv
 * @param outPutFilePath the absolute output file path to the json
 */
sp.parseShow = function (inputFilePath, outPutFilePath) {
  INPUT = inputFilePath;
  OUTPUT = outPutFilePath;
  if (INPUT === undefined || OUTPUT === undefined) {
    throw new Error('Input and Output file paths must be defined');
  }
  startParsing();
}


// Private
function startParsing() {
  csv()
      .from.stream(fs.createReadStream(INPUT), u.input_config)
//      .to.path(OUTPUT)
      .transform(transform)
      .on('record', onRecord)
      .on('close', onClose)
      .on('error', onError);
}

function transform(row) {
  if(u.isRowBlank(row)){
    return null;
  }
//  row.unshift(row.pop());
  return JSON.stringify(row);
}

function onRecord(row, index) {
  console.log('#' + index + ' ' + row);
//  console.log("Row[%d] %j".cyan, index, row);
}

function onClose(count) {
  console.log('Number of lines: %d'.red, count);
}

function onError(error) {
}