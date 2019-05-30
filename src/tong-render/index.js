import RenderApp from "./App"
const version= 0.1
let vueComs = {}
let TongEngine = { version }
let vueContext = require.context('./', true, /\.vue$/)
vueContext.keys().forEach(path => {
  let com = vueContext(path).default
  vueComs[com.name] = com
  TongEngine[com.name] = com
})

let loaderContext = require.context('./core/loaders', false, /\.js$/)
loaderContext.keys().forEach(path => {
  let com = loaderContext(path).default
  // fix: uglify would kill the function name
  let name = path.match(/([^/]+)\.js$/)[1]
  TongEngine[name] = com
})

TongEngine.install = Vue => {
  Object.keys(vueComs).forEach(k => {
    // fix: name 'object3d' is required,
    // or it would be parsed to 'object-3-d' somewhere else
    let rk
    if (k === 'Object3D') rk = 'object3d'
    if (rk) Vue.component(rk, vueComs[k])
    Vue.component(k, vueComs[k])
  })
  Vue.component('TongRenderApp', RenderApp)
}
export default TongEngine
