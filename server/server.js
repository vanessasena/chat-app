const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const hbs = require('hbs');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

var users = new Users()

app.use(express.static(publicPath))
app.set('view engine', 'hbs');
app.set('views', publicPath);

hbs.registerHelper('option', function(value, label) {
    return new hbs.SafeString('<option value="' + value + '">' + label + "</option>");
});

app.get('/', (req, res) => {
  var rooms = users.getRoomList();
  res.render('index.hbs', {rooms})
})

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.')
    }
    var repeatedUser = users.getUserList(params.room).filter(name => name.toLowerCase() === params.name.toLowerCase())
    if (repeatedUser.length > 0) {
      return callback('User already exist in this room.')
    }
    params.room = params.room.toLowerCase()
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined.`))

    callback()
  })

  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id)
    if (user && isRealString(newMessage.text)) {
      io.to(user.room)
        .emit('newMessage', generateMessage(user.name, newMessage.text))
    }
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id)
    if (user) {
      io.to(user.room)
        .emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
