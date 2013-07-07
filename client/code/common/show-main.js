/**
 * Add click listener to the the show links
 */
$(window).on('click', '.show_link', function () {
  console.log("Show Click");
});

/**
 * Show name for the object
 * @param showsArray
 */
exports.appendShows = function(showsArray) {
  if (_.isArray(showsArray)) {
    _.each(showsArray,function(value, index){
      appendShow(value);
    });
  }
  if (_.isObject(showsArray)) {
    appendShow(showsArray);
  }
  $('#sidebar').fadeIn(200);
}

/**
 * Appending 
 * @param showObject
 */
exports.appendShow = function(showObject) {
  var render = {
    name: showObject.name,
    link: showObject.link
  }
  var htmlName = ss.tmpl['show-name'].render(render);
  var htmlNameLi = ss.tmpl['show-name-li'].render(render);
  $(htmlName).appendTo('#show_list').slideDown();
  $(htmlNameLi).appendTo('#show_list_nav');
}
