const { Ps } = require('../dist')

const myapp = new Ps({
  width: '420mm',
  height: '297mm',
  resolution: 127
})

myapp.PlaceFile('C:\\Users\\KaivnD\\Desktop\\test\\ab.eps', 420, {
  link: true
})
