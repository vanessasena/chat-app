
class Users {
  constructor () {
    this.users = []
    this.rooms = []
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room: room.toLowerCase()
    }
    var newRoom = {room: user.room}
    if (!this.rooms.filter(r => r.room === user.room)[0]){
      this.rooms.push(newRoom)
    }
    this.users.push(user)
    return user
  }

  removeUser (id) {
    var user = this.getUser(id)
    if (user) {
      var index = this.users.indexOf(user)
      this.users.splice(index, 1)
      if (!this.getUserList(user.room)[0]){
        var room = this.rooms.filter(r => r.room === user.room)[0]
        var index = this.rooms.indexOf(room)
        this.rooms.splice(index, 1)
      }
    }
    return user
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room.toLowerCase())
    return users.map((user) => user.name)
  }

  getRoomList () {
    return this.rooms
  }

}

module.exports = {Users}
