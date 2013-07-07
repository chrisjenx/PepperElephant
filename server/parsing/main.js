var path = require("path"),
    _ = require("lodash");

var parse = exports;

var DATA_DIR, DATA_DIR_RAW, DATA_DIR_JSON;
var callback;


//-----
// Public Methods
// -----
/**
 * Start the parser
 *
 * Pass in socket stream so we can notify when we have finished parsing
 * @param ss SocketStream
 */
parse.start = function (ss, completeCB) {
  console.log("---\nParser Starting".blue);
  init(ss, completeCB);
  startParsing();
}

//--
// Private methods
//--

/**
 * Setup the module
 * @param socketStream the socketStreaming module
 */
function init(socketStream, completeCallback) {
  parse.ss = socketStream;
  callback = completeCallback;
  initDirs();
}

/**
 * Find all the absolute paths for the data
 */
function initDirs() {
  DATA_DIR = path.resolve("docs/data");
  DATA_DIR_RAW = path.resolve(DATA_DIR, "raw");
  DATA_DIR_JSON = path.resolve(DATA_DIR, "json");

//  console.log("DataFolder %s".grey, DATA_DIR);
//  console.log("RawDataFolder %s".grey, DATA_DIR_RAW);
//  console.log("JsonDataFolder %s".grey, DATA_DIR_JSON);
}

/**
 * Start parsing the csv
 */
function startParsing() {
  console.log("Parsing ShowData".cyan);
  var showParser = require("./parse_shows");
  showParser.parseShow(
      DATA_DIR_RAW + "/peppershows.csv",
      DATA_DIR_JSON + "/peppershows.json",
      finishedParsingShows);
  console.log("Parser Started\n---".green);
}

/**
 * Shows finished loading, return callback
 *
 * @param showObject
 */
function finishedParsingShows(showObject) {
  //Callback when finished parsing.
  if(_.isFunction(callback)){
    callback(showObject);
  }
}

