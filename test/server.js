/*
 * Simple connect server for phantom.js
 * Adapted from Modernizr
 */

var connect = require('connect'), 
  http = require('http'), 
  fs   = require('fs'), 
  app = connect()
      .use(connect.static(__dirname + '/../'));

http.createServer(app).listen(3000, function(){
  console.log("go to http://localhost:3000/test/index.html :)");
});
