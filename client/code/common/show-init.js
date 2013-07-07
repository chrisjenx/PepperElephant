console.log("Show Init");

var main = require('/show-main');

// Get the shows from the server
ss.rpc('show.getShows', appendShows);