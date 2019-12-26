import { Ps, arr } from '../dist'

const myapp = new Ps()

arr(myapp.Layers).forEach(layer => {
  alert(layer)
})
