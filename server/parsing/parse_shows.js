//Consts
var K_NAME = "name",
    K_YEAR = "year",
    K_SONGS = "songs",
    K_BANDS = "bands";

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
 * "name" = {
 *  name:"",
 *  year:"",
 *  bands:["",""]
 *  songs:[{
 *    name:"",
 *    bands:["",""]
 *  }],
 *  people:{}
 * }
 */
var showsJSONMap = {};
/**
 *
 * @type {Array}
 * Person Object
 * "name":{
 *  name:"",
 *  bands:[],
 *  instruments:[],
 *  songs:[{
 *    name:"",
 *    bands:["",""]
 *  }],
 *  crew:"position"
 *  main_committee:true|false,
 *  committee_member:true|false,
 *  hospice_helper:true|false,
 * }
 */
var peopleJSONMap = [];

var s;

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
//  console.log('#' + index + ' ' + JSON.stringify(row));
//  console.log("Row[%d] %j".cyan, index, row);
  parseRow(row);
}

function onEnd(count) {
  console.log("Shows Map: \n%s", JSON.stringify(showsJSONMap,null,4));
  console.log('Number of lines: %d'.red, count);
}

function onError(error) {
}

/**
 * Try and parse a row one at a time.
 * @param row
 */
function parseRow(row) {
  //Create new object
  var showObject = getCurrentShowObject(showsJSONMap, row);
  populateShowName(showObject, row);
  populateShowYear(showObject, row);
  populateShowBands(showObject, row);
  populateShowSongs(showObject, row);
  showsJSONMap[showObject.name] = showObject
}

/**
 * Will find the show with the current name otherwise returns a new object
 * @param showsMap
 * @param row
 * @returns {*}
 */
function getCurrentShowObject(showsMap, row) {
  var currShow = showsMap[row.SHOW];
  if (currShow === undefined || currShow == null) {
    return {};
  }
  return currShow;
}

/**
 * Grab the name of the show into the object
 * @param showObject
 * @param row
 */
function populateShowName(showObject, row) {
  showObject[K_NAME] = row.SHOW;
}

/**
 * Populates the show year to the show object
 * @param showObject
 * @param row
 */
function populateShowYear(showObject, row) {
  showObject[K_YEAR] = row.YEAR;
}

/**
 * Appends songs to the show object
 * @param showObject
 * @param row
 */
function populateShowSongs(showObject, row) {
  showObject[K_SONGS] =
      u.addToArrayIfValid(showObject[K_SONGS], row.SONGS);
}

/**
 * Add bands to the show object
 * @param showObject
 * @param row
 */
function populateShowBands(showObject, row) {
  showObject[K_BANDS] =
      u.addToArrayIfValid(showObject[K_BANDS], row.BAND);
}



