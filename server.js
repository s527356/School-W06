var express = require('express')  // require express
var app = express()  // create a request handler function
var server = require('http').createServer(app)  // use our app to create a server
var io = require('socket.io')(server) // pass in our http app server to get a Socket.io server
var path = require('path')

// include the static client-side files (.html, .css, .js) from the root path 
app.use(express.static(path.join(__dirname)))

// on a GET request to default page, serve up our index.html....
app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname, '../School-W06/assets', 'index.html'))
})

// on a connection event, act as follows (socket interacts with client)
io.on('connection', function (socket) {
 socket.on('chatMessage', function (from, msg) {  // on getting a chatMessage event
   io.emit('chatMessage', from, msg)  // emit it to all connected clients
 })
 socket.on('notifyUser', function (user) {  // on getting a notifyUser event
   io.emit('notifyUser', user)  // emit to all
 })
})

// Listen for an app request on port 8081
server.listen(8081, function () {
 console.log('listening on http://127.0.0.1:8081/')
})

