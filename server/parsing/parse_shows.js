//Consts
var K_NAME = "name",
    K_YEAR = "year",
    K_SONGS = "songs",
    K_BANDS = "bands",
    K_BAND_MEMBERS = "band_members",
    K_CREW = "crew",
    K_MAIN_COM = "main_committee",
    K_COM_MEM = "committee_members",
    K_HOSP_HELP = "hospice_helpers",
    K_INSTR = "instruments";

// Imports
var _ = require('lodash');
var colors = require('colors');
var fs = require('fs');
var csv = require('csv');
var u = require('./utils');

/**
 * Alias for the exports
 * @type {*}
 */
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
 * Returns the show map that has been parsed in, this can be quite large!
 * 
 * @returns {*}
 * Show object:
 * <code>
 *   {
 *    "name" = {
 *      name:"",
 *      link:"",
 *      year:"",
 *      bands:["",""]
 *      songs:[{
 *        name:"",
 *        bands:["",""]
 *      }],
 *      people:[{}]
 *    }
 *  }
 * </code>
 */
sp.getShows = function () {
  if (!_.isObject(showsJSONMap)) {
    return {};
  }
  return showsJSONMap;
}

/**
 *
 * @type {Object}
 * Show object
 * "name" = {
 *  name:"",
 *  link:"",
 *  year:"",
 *  bands:["",""]
 *  songs:[{
 *    name:"",
 *    bands:["",""]
 *  }],
 *  people:[{}]
 * }
 */
var showsJSONMap = {};
/**
 *
 * @type {Array}
 * Band Members Object
 * {
 *  name:"",
 *  bands:[],
 *  instruments:[],
 *  songs:[] //Gets post processed
 * }
 */
var peopleJSONMap = [];


// -------
// Private
// -------

/**
 * Set up the CSV object and start parsing.
 *
 * This is event based so this is async
 */
function startParsing() {
  csv()
      .from.stream(fs.createReadStream(INPUT), u.input_config)
//      .to.path(OUTPUT)
      .transform(transform)
      .on('record', onRecord)
      .on('end', onEnd)
      .on('error', onError);
}

/**
 * Transforms the rows for the CSV parser, this is called before
 * onRecord
 * @param row
 * @param index
 * @returns {*}
 */
function transform(row, index) {
  if (index <= 2) return null;
  if (u.isRowBlank(row)) {
    return null;
  }
  return u.trimNulls(row);
}

/**
 * For each row in the csv file
 * @param row
 * @param index
 */
function onRecord(row, index) {
//  console.log('#' + index + ' ' + JSON.stringify(row));
//  console.log("Row[%d] %j".cyan, index, row);
  parseRow(row);
}

function onEnd(count) {
  postProcessShows(showsJSONMap);
  console.log("Shows Map: \n%s", JSON.stringify(showsJSONMap, null, 4));
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
  populateShowCrew(showObject, row);
  populateShowMainCommittee(showObject, row);
  populateShowCommitteeMembers(showObject, row);
  populateShowHospiceMembers(showObject, row);
  populateBandMember(showObject, row);
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
  showObject[K_NAME] = row['SHOW'];
//  showObject[K_LINK] = row
}

/**
 * Populates the show year to the show object
 * @param showObject
 * @param row
 */
function populateShowYear(showObject, row) {
  showObject[K_YEAR] = row['YEAR'];
}

/**
 * Appends songs to the show object
 *
 * Generates a show object like:
 * {
 *    name:"",
 *    bands:["",""]
 * }
 *
 * @param showObject
 * @param row
 */
function populateShowSongs(showObject, row) {
  showObject[K_SONGS] =
      u.addToArrayIfValid(showObject[K_SONGS], row['SONGS'], "name", "band");
}

/**
 * Add bands to the show object
 * @param showObject
 * @param row
 */
function populateShowBands(showObject, row) {
  showObject[K_BANDS] =
      u.addToArrayIfValid(showObject[K_BANDS], row['BAND']);
}

function populateBandMember(showObject, row) {
  var name = row['BAND_MEMBERS'];
  if (name === undefined) return;

  var memberObj = {};
  memberObj['name'] = name;

  var bands = row['BAND'];
  if (bands !== undefined) {
    bands = bands.trim().split('/');
    memberObj['bands'] = bands;
  }

  var inst = row['INSTRUMENTS'];
  if (inst !== undefined) {
    inst = inst.trim().split('/');
    memberObj['instruments'] = inst;
  }
  showObject[K_BAND_MEMBERS] =
      u.addToArrayIfValid(showObject[K_BAND_MEMBERS], memberObj);
}

/**
 * Populate crew and position to show object
 * @param showObject
 * @param row
 */
function populateShowCrew(showObject, row) {
  showObject[K_CREW] =
      u.addToArrayIfValid(showObject[K_CREW], row['CREW'], "name", "position");
}

/**
 * Populate the show main committee
 * @param showObject
 * @param row
 */
function populateShowMainCommittee(showObject, row) {
  showObject[K_MAIN_COM] =
      u.addToArrayIfValid(showObject[K_MAIN_COM], row['MAIN_COMMITTEE']);
}

/**
 * Populate the show committee members
 * @param showObject
 * @param row
 */
function populateShowCommitteeMembers(showObject, row) {
  showObject[K_COM_MEM] =
      u.addToArrayIfValid(showObject[K_COM_MEM], row['COMMITTEE_MEMBERS']);
}

/**
 * Populate the hospice members
 * @param showObject
 * @param row
 */
function populateShowHospiceMembers(showObject, row) {
  showObject[K_HOSP_HELP] =
      u.addToArrayIfValid(showObject[K_HOSP_HELP], row['HOSPICE_HELPERS']);
}

/**
 * Will match more data to make it easier when showing to the user.
 * @param showMap
 */
function postProcessShows(showMap) {
  console.log("PostProcess Shows".red);
  for (k in showMap) {
    var songArr = showMap[k][K_SONGS];
    var bandMembers = showMap[k][K_BAND_MEMBERS];
    addSongsToBandMembers(songArr, bandMembers);
  }
}

/**
 * Try and add songs to band members
 * @param songArr - [{ * name:"",band:[] }]
 * @param bandMemberArr
 * [{
 *  name:"",
 *  bands:[],
 *  instruments:[],
 *  songs:[] //Gets post processed
 * }]
 *
 * //TODO improve with lodash
 */
function addSongsToBandMembers(songArr, bandMemberArr) {
  for (var i in bandMemberArr) {
    var name = bandMemberArr[i]['name'];
    var bands = bandMemberArr[i]['bands'];
    if (bands === undefined) continue;
//    console.log("%j,%j", name, bands);

    for (var i2 in songArr) {
      var songName = songArr[i2]['name'];
      var songBand = songArr[i2]["band"];
      if (songBand === undefined) continue;
//      console.log("%j,%j", songName, songBand);
      for (var i3 in songBand) {
        var songBandName = songBand[i3];
        if (_.contains(bands, songBandName) || name == songBandName) {
          var bandMemberSongs = bandMemberArr[i]["songs"];
          if (bandMemberSongs === undefined) bandMemberSongs = [];
          bandMemberSongs.push(songName);
          bandMemberArr[i]["songs"] = bandMemberSongs;
        }
      }
    }
  }
}