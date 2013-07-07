// Server-side Code
var _ = require("lodash");

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function (req, res, ss) {
  //Get the show data
  var showData = ss.data['shows'];
  var showsNameAndLinksArray = showsToNameAndLinkArray(showData);

  return {
    //Get the shows data
    getShows: function () {
      return res(showsNameAndLinksArray);
    },
    //Load the show data
    loadShow: function (link) {
      console.log(link);
      return res(true);
    }
  };
}


/**
 * turns the complex show object into a smaller name/link object to load quicker
 *
 * @param showMap
 * @returns {Array}
 */
function showsToNameAndLinkArray(showMap) {
  var showArr = [];
  var showNaL;
  _.forEach(showMap, function (value, key) {
    showNaL = {
      name: key,
      link: value['link'],
      year: value['year']
    };
    showArr.push(showNaL);
  });
  return showArr;
}