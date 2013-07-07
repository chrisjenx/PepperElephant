var content = require("/content");

/**
 * Load the show into the content screen.
 * @param showObject
 */
exports.loadShow = function(showObject){
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
  }
  if (_.isObject(showsArray)) {
    exports.appendShow(showsArray);
  }
  $('#sidebar').removeClass('hidden');
}

/**
 * Appending
 * @param showObject
 */
exports.appendShow = function (showObject) {
  var render = {
    name: showObject.name,
    link: showObject.link
  }
  var htmlName = ss.tmpl['show-name'].render(render);
  var htmlNameLi = ss.tmpl['show-name-li'].render(render);
  $(htmlName).appendTo('#show_list').slideDown();
  $(htmlNameLi).appendTo('#show_list_nav');
}
