var socket = io()

function submitfunction() {
  let from = $('#user').val()
  let message = $('#m').val()
  if (message != '') {
    socket.emit('chatMessage', from, message)// can handle more than 1 item ...
  }
  // what language and selector is used below?
  // set the value to an empty string and
  // focus on the message box again
  // return false so the form cancels the submit before sending to the server
  $('#m').val('').focus()
  return false
}

// emit a new notifyUser event from the client.........
function notifyTyping() {
 var user = $('#user').val()
 socket.emit('notifyUser', user)
}


// Think: on getting a chatMessage event, do this (add an <li> to our msg list)

// how to react to a chatMessage event.................
socket.on('chatMessage', function (from, msg) {
 var me = $('#user').val()
 var align = (from === me) ? 'right' : 'left'
 var from = (from === me) ? '' : from
 $('#messages').append('<li style="text-align:' + align + '"><b style="color:teal">' + from + '</b> ' + msg + '</li>')
})

// how to react to a notifyUser event.................
socket.on('notifyUser', function (user) {
 var me = $('#user').val()
 if (user !== me) {
   $('#notifyUser').text(user + ' is typing ...')
 }
 // 10 seconds after typing stops, set the notify text to an empty string
 setTimeout(function () { $('#notifyUser').text('') }, 10000)
})

// when will this function get executed?
$(function () {
 var name = makeid()
 $('#user').val(name)
 // emit a chatMessage event from the System along with a message
 socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion')
})

// utility function to create a new random user name....
function makeid() {
 var text = ''
 var possible = 'abcdeghijklmnoprstuwxy'
 for (var i = 0; i < 5; i++) {
   text += possible.charAt(Math.floor(Math.random() * possible.length))
 }
 return text
}

