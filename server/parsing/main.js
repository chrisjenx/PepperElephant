var fs = require('fs');
var path = require("path");
var csv = require('csv');

var parse = exports;

var dataDir, dataDirRaw, dataDirJson;

//--
// Private methods
//--

/**
 * Setup the module
 * @param socketStream the socketStreaming module
 */
function init(socketStream) {
  parse.ss = socketStream;
  initDirs();
}

/**
 * Find all the absolute paths for the data
 */
function initDirs() {
  dataDir = path.resolve("docs/data");
  dataDirRaw = path.resolve(dataDir,"raw");
  dataDirJson = path.resolve(dataDir,"json");

  console.log("DataFolder %s".grey, dataDir);
  console.log("RawDataFolder %s".grey, dataDirRaw);
  console.log("JsonDataFolder %s".grey, dataDirJson);
}

/**
 * Start parsing the csv
 */
function startParsing() {

  console.log("Parser Started\n---".green);
}
//--
// Public Methods

/**
 * Start the parser
 *
 * Pass in socket stream so we can notify when we have finished parsing
 * @param ss SocketStream
 */
parse.start = function (ss) {
  console.log("---\nParser Starting".blue);
  init(ss);
  startParsing();
}
