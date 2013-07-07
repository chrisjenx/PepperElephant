// Server-side Code

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  return {

    getShows: function(){
      console.log("GetShows");
      ss.publish.all("showLoaded", {
        name:"Remote Show",
        link:"remote_show"
      });
    }

//    sendMessage: function(message) {
//      if (message && message.length > 0) {         // Check for blank messages
//        ss.publish.all('newMessage', message);     // Broadcast the message to everyone
//        return res(true);                          // Confirm it was sent to the originating client
//      } else {
//        return res(false);
//      }
//    }

  };

};