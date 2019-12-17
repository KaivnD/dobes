const { Ps } = require('../dist')

const ps = new Ps()

ps.on('test-done', () => {
  alert('1000 layer added')
})

ps.EventTest()
