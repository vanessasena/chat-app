
class Users {
  constructor () {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room: room.toLowerCase()
    }
    this.users.push(user)
    return user
  }

  removeUser (id) {
    var user = this.getUser(id)
    if (user) {
      var index = this.users.indexOf(user)
      this.users.splice(index, 1)
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

}

module.exports = {Users}
