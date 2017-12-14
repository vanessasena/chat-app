const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Vanessa'
    var text = 'This is a message'

    var res = generateMessage(from, text)
    expect(res).toMatchObject({from, text})
    expect(typeof res.createdAt).toBe('number')
  })
})

describe('generateLocationMessage', () => {
  it('should genarate correct location object', () => {
    var from = 'Peter'
    var latitude = 10
    var longitude = 45
    var url = 'https://www.google.com/maps?q=10,45'
    var message = generateLocationMessage(from, latitude, longitude)
    expect(message).toMatchObject({from, url})
    expect(typeof message.createdAt).toBe('number')
  })
})
