
class Users {
  constructor () {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {id, name, room}
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
    var users = this.users.filter((user) => user.room === room)
    return users.map((user) => user.name)
  }

}

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

module.exports = {Users}
