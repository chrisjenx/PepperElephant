// Server-side Code

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
//  req.use('session');

  return {

    getShows: function(){
      console.log("GetShows");
      return res({
        name:"Remote Show",
        link:"remote_show"
      });
    }

  };

};