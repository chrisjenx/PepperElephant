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

/**
 *
 * @type {Array}
 * Show object
 * {
 *  name:"",
 *  year:"",
 *  songs:[]
 * }
 */
var showsJSONArr = [];
var _tempShowObject;

// Private
function startParsing() {
  csv()
      .from.stream(fs.createReadStream(INPUT), u.input_config)
//      .to.path(OUTPUT)
      .transform(transform)
      .on('record', onRecord)
      .on('end', onEnd)
      .on('error', onError);
}

function transform(row, index) {
  if (index <= 2) return null;
  if (u.isRowBlank(row)) {
    return null;
  }
  return u.trimNulls(row);
}

function onRecord(row, index) {
  console.log('#' + index + ' ' + JSON.stringify(row));
//  console.log("Row[%d] %j".cyan, index, row);
}

function onEnd(count) {
  console.log('Number of lines: %d'.red, count);
}

function onError(error) {
}