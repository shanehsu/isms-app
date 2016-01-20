#!/usr/bin/env node

var http = require('http');
var static_server = require('node-static');

var port = normalizePort(process.env.PORT || '3000');
var file_server = new static_server.Server('.');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file_server.serve(request, response);
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