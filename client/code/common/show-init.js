console.log("Show Init");

// Get the shows from the server
ss.rpc('show.getShows', appendShows);

/**
 * Show name for the object
 * @param showsArray
 */
function appendShows(showsArray) {
  if (_.isArray(showsArray)) {
    appendShow(showsArray[0]);
  }
  if (_.isObject(showsArray)) {
    appendShow(showsArray);
  }
  $('#sidebar').show();
}

function appendShow(showObject) {
  var render = {
    name: showObject.name,
    link: showObject.link
  }
  var htmlName = ss.tmpl['show-name'].render(render);
  var htmlNameLi = ss.tmpl['show-name-li'].render(render);
  $(htmlName).appendTo('#show_list').slideDown();
  $(htmlNameLi).appendTo('#show_list_nav');
}