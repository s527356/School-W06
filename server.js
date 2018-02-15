var express = require('express')
var app = express() // function handler
//var http = require('http').createServer(app)  // http server

// Initialize app with route / (the root) "on getting a request to /, do the following"
app.get('/', function (req, res) {
  res.write('This is where we will show our chat client.\n')
  res.write('We need an element to hold messages.\n')
  res.write('We need an element to hold notification (that others are typing).\n')
  res.write('We need an element to hold the message input form.\n')
  res.end()
})

// Listen for an application request on port 8081
// use http listen, so we can provide a callback when listening begins
// use the callback to tell the user where to point their browser
app.listen(8081, function () {
  console.log('listening on http://127.0.0.1:8081/')
})
