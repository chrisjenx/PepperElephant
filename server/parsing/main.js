var csv = require('csv'),
    fs = require('fs');

var parse = exports;

//--
// Private methods
//--

/**
 * Setup the module
 */
function init(){
}


/**
 * Start parsing the csv
 */
function startParsing() {
  console.log("Parser Started".cyan);
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
  parse.ss = ss;
  startParsing();
}
