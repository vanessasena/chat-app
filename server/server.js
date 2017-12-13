const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')


const publicPath = path.join(__dirname, '../public')
var port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')


  socket.on('createMessage', (newMessage) => {
    socket.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: 1234
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
