var _ = require("underscore");

/**
 * Default input parsing options for the CVS parser
 * @type {{delimiter: string}}
 */
exports.input_config = {
  delimiter: ','
};

/**
 * @param row the CVS row we are parsing
 * @return boolean - true if row is blank, (omit it) or false if contains data.
 */
exports.isRowBlank = function (row) {
  if (_.isUndefined(row)) return true;
  if (_.isEmpty(row)) return true;
  //If we got this far and not array then there is data
  if (!_.isArray(row)) return false;

  var hasData = false;
  for (var i in row) {
    if (_.isString(row[i]) && row[i].length > 0) {
      hasData = true;
    }
  }
  return !hasData;
}