#!/usr/bin/env node

var http = require('http');
var static_server = require('node-static');

var port = normalizePort(process.env.PORT || '3000');
var file_server = new static_server.Server('.', {cache: 0});

http.createServer(function (request, response) {
    console.log(request.url);
    request.addListener('end', function () {
      if (request.url.startsWith('/node_modules') || request.url.startsWith('/dist') || request.url.startsWith('/app')) {
        file_server.serve(request, response);
      } else {
        file_server.serveFile('/index.html', 200, {}, request, response);
      }
    }).resume();
}).listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}