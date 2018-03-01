var config = window.clientconfig
console.log('config', config)

var app = feathers()
var socket = io()
app.configure(feathers.socketio(socket))

var Messages = app.service('messages')

var trigger = document.createElement('button')
trigger.textContent = 'trigger!'
trigger.onclick = (ev) => {
  var text = 'Hey!'
  Messages.create({ text })
}
document.body.appendChild(trigger)

function addMessageToList (message) {
  var messageItem = document.createElement('li')
  messageItem.textContent = message.text
  messageList.appendChild(messageItem)
}

Messages.find()
  .then(messages => {
    messages.forEach(addMessageToList)
  })

var messageList = document.createElement('ul')
Messages.on('created', function (message) {
  addMessageToList(message)
})
document.body.appendChild(messageList)
