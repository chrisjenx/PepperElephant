var _ = require("underscore");

/**
 * Default input parsing options for the CVS parser
 * @type {{delimiter: string}}
 */
exports.input_config = {
  delimiter: ',',
  columns: ['SHOW', 'YEAR', 'BAND_MEMBERS', 'BAND', 'INSTRUMENTS', 'SONGS', 'CREW', 'MAIN_COMMITTEE', 'COMMITTEE_MEMBERS', 'HOSPICE_HELPERS']
};

/**
 * @param row the CVS row we are parsing
 * @return boolean - true if row is blank, (omit it) or false if contains data.
 */
exports.isRowBlank = function (row) {
  if (_.isUndefined(row)) return true;
  if (_.isEmpty(row)) return true;
  //If we got this far and not array then there is data
  if (!_.isArray(row) && !_.isObject(row)) return false;

  var hasData = false;
  for (var i in row) {
    if (_.isString(row[i]) && row[i].length > 0) {
      hasData = true;
    }
  }
  return !hasData;
}

/**
 * Trims null values from an object
 * @param data
 * @returns {*}
 */
exports.trimNulls = function (data) {
  var y;
  for (var x in data) {
    y = data[x];
    if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length == 0)) {
      delete data[x];
    }
    if (y instanceof Object) y = trim_nulls(y);
  }
  return data;
}