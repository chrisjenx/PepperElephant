var path = require("path");

var parse = exports;

var DATA_DIR, DATA_DIR_RAW, DATA_DIR_JSON;

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
  DATA_DIR = path.resolve("docs/data");
  DATA_DIR_RAW = path.resolve(DATA_DIR, "raw");
  DATA_DIR_JSON = path.resolve(DATA_DIR, "json");

  console.log("DataFolder %s".grey, DATA_DIR);
  console.log("RawDataFolder %s".grey, DATA_DIR_RAW);
  console.log("JsonDataFolder %s".grey, DATA_DIR_JSON);
  // Set exports
//  parse.DATA_DIR = DATA_DIR;
//  parse.DATA_DIR_RAW = DATA_DIR_RAW;
//  parse.DATA_DIR_JSON = DATA_DIR_JSON;
}

/**
 * Start parsing the csv
 */
function startParsing() {
  console.log("Parsing ShowData".cyan);
  require("./parse_shows").parseShow(DATA_DIR_RAW + "/peppershows.csv", DATA_DIR_JSON + "/peppershows.json");

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
