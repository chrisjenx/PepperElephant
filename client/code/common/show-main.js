var content = require("/content");

/**
 * Load the show into the content screen.
 * @param showObject
 */
exports.loadShow = function(showObject){
  console.log("Show Data");
  console.log(showObject);
  content.replaceContentWithObject('show-main', showObject);
}

/**
 * Show name for the object
 * @param showsArray
 */
exports.appendShows = function (showsArray) {
  if (_.isArray(showsArray)) {
    _.each(showsArray, function (value, index) {
      exports.appendShow(value);
    });
  }else if (_.isObject(showsArray)) {
    exports.appendShow(showsArray);
  }
  $('#sidebar').removeClass('hidden');
}

/**
 * Appending
 * @param showObject
 */
exports.appendShow = function (showObject) {
  var htmlName = ss.tmpl['show-name'].render(showObject);
  var htmlNameLi = ss.tmpl['show-name-li'].render(showObject);
  $(htmlName).appendTo('#show_list').slideDown();
  $(htmlNameLi).appendTo('#show_list_nav');
}
