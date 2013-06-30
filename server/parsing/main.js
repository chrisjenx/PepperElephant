var fs = require('fs');
var path = require("path");
var csv = require('csv');

var parse = exports;

var rawDataDir;

//--
// Private methods
//--

/**
 * Setup the module
 * @param socketStream the socketStreaming module
 */
function init(socketStream){
  parse.ss = socketStream;
  initDirs();
}

function initDirs(){
  rawDataDir = path.resolve("docs/data/raw");
//  rawDataDir = __dirname + "docs/data/raw";
  console.log("RawDataFolder %s".grey, rawDataDir);
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
