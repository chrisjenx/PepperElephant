/**
 * Loads the welcome screen
 */
exports.loadHome = function () {
  console.log(ss.tmpl);
  var html = ss.tmpl['content-welcome'].render();
  $("#main_content").hide().html(html).fadeIn(200);
}