const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'vanessa'
    var text = 'This is a message'

    var res = generateMessage(from, text)
    expect(res).toMatchObject({from, text})
    expect(typeof res.createdAt).toBe('number')
  })
})
