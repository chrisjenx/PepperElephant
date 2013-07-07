var main = require('/show-main');

/**
 * Add click listener to the the show links
 */
$(window).on('click', '.show_link', function () {
  var link = $(this).attr("href");
//  console.log("Show Click: " + link);
  ss.rpc('show.loadShow',link, main.loadShow)
});

// Get the shows from the server
ss.rpc('show.getShows', main.appendShows);