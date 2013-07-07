console.log("Show Init");

loadShows();


function loadShows(){
  $('#sidebar').show();
  ss.event.on('showLoaded', appendShowName);
  ss.rpc('app.getShows');
}

/**
 * Show name for the object
 * @param showObject
 */
function appendShowName(showObject){
  var render = {
    name: showObject.name,
    link: showObject.link
  }
  var htmlName = ss.tmpl['show-name'].render(render);
  var htmlNameLi = ss.tmpl['show-name-li'].render(render);
  $(htmlName).appendTo('#show_list').slideDown();
  $(htmlNameLi).appendTo('#show_list_nav');
}