import { Ps, arr } from '../dist'
import { path } from '../dist/utils'

const myapp = new Ps()

arr(myapp.Layers).forEach(layer => alert(layer))
