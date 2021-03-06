var _ = require("lodash");
var u = exports;

/**
 * Default input parsing options for the CVS parser
 * @type {{delimiter: string}}
 */
u.input_config = {
  delimiter: ',',
  columns: ['SHOW', 'YEAR', 'BAND_MEMBERS', 'BAND', 'INSTRUMENTS', 'SONGS', 'CREW', 'MAIN_COMMITTEE', 'COMMITTEE_MEMBERS', 'HOSPICE_HELPERS']
};

/**
 * @param row the CVS row we are parsing
 * @return boolean - true if row is blank, (omit it) or false if contains data.
 */
u.isRowBlank = function (row) {
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
u.trimNulls = function (data) {
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

/**
 * Returns a cleaned up array, no duplicates or nulls
 * @param array
 * @returns {*}
 */
u.cleanUpArray = function (array) {
  array = _.compact(array);
  array = _.uniq(array);
  return array;
}

/**
 * Add to array and clean up
 *
 * @param inArray
 * @param value
 * @returns {*}
 */
u.addToArrayIfValid = function (inArray, value) {
  return u.addToArrayIfValid(inArray, value, undefined);
}

/**
 * Add to array and clean up
 *
 * @param inArray
 * @param value
 * @param val1Key (optional) the name of the first key if you want to add to the array as key/val
 * @returns {*}
 */
u.addToArrayIfValid = function (inArray, value, val1Key) {
  return u.addToArrayIfValid(inArray, value, val1Key, undefined);
}

/**
 * Add to array and clean up
 *
 * @param inArray
 * @param value
 * @param val1Key (optional) the name of the first key if you want to add to the array as key/val
 * @param val2Key (optional) the name of the second key if you want to add to the array as key/val
 * @returns {*}
 */
u.addToArrayIfValid = function (inArray, value, val1Key, val2Key) {
  var outArray = inArray;
  if (outArray === undefined)
    outArray = [];
  var varName = value;
  if (varName !== undefined && _.isString(varName)) {
    varName = varName.split("=");
    var varObject = varName[0].trim();
    if (val1Key !== undefined) {
      varObject = {};
      varObject[val1Key] = varName[0].trim();
    }
    if (varName.length > 1 && val2Key !== undefined) {
      varObject[val2Key] = varName[1].trim().split("/");
    }
    outArray.push(varObject);
    outArray = u.cleanUpArray(outArray);
  }
  if (_.isObject(value)) {
    outArray.push(value);
    outArray = u.cleanUpArray(outArray);
  }
  return outArray;
}


/**
 * Removes white space and lower cases some text to make it a useful link
 *
 * @param name
 * @returns {string}
 */
u.createLinkFromName = function (name) {
  if (_.isEmpty(name))
    return "";
  return removeWhiteSpace(name.toLowerCase());
}

/**
 * Remove whitespace from the text and replace with underscores "_"
 *
 * @param text
 * @returns {*}
 */
function removeWhiteSpace(text) {
  return text.replace(/\s+/g, '_');
}