const { Ps } = require('../dist')

const ps = new Ps()

const layer = ps.FindLayer('图层1')

ps.SelectAllInLayer(layer)
