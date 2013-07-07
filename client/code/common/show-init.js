var main = require('/show-main');

/**
 * Add click listener to the the show links
 */
$(window).on('click', '.show_link', function () {
  console.log("Show Click");
//  ss.rpc('show.loadShow',main.loadShow)
});

// Get the shows from the server
ss.rpc('show.getShows', main.appendShows);