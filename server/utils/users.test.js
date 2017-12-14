const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
  var users = {}

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Peter',
      room: 'Room 1'
    },
    {
      id: '2',
      name: 'Mary',
      room: 'Room 2'
    },{
      id: '3',
      name: 'John',
      room: 'Room 1'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'Vanessa',
      room: 'Room 1'
    }
    var resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toMatchObject([user])
  })

  it('should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId)
    expect(user).toMatchObject({
      id: '1',
      name: 'Peter',
      room: 'Room 1'
    })
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', () => {
    var userId = '55'
    var user = users.removeUser(userId)
    expect(user).toBe(undefined)
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    var userId = '2'
    var userName = 'Mary'
    var user = users.getUser(userId)
    expect(user.id).toBe(userId)
    expect(user.name).toBe(userName)
  })

  it('should not find user', () => {
    var user = users.getUser('55')
    expect(user).toBe(undefined)
  })

  it('should return names for room 2', () => {
    var userList = users.getUserList('Room 2')
    expect(userList).toMatchObject(['Mary'])
  })

  it('should return names for room 1', () => {
    var userList = users.getUserList('Room 1')
    expect(userList).toMatchObject(['Peter', 'John'])
  })
})
