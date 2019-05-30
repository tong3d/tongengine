import ToolbarApp from "./App"
const version= 0.1
const componentFiles=require.context('./components', false, /\.(js|vue)$/)
const Hierarchy={
    version:version,
    install(Vue){
        componentFiles.keys().forEach(key => {
            let name = 'Tong' + key.replace(/(\.\/|\.(js|vue))/g, '')
            let component = componentFiles(key).default || componentFiles(key)
            Vue.component(name, component)
          })
        Vue.component('TongToolbarApp', ToolbarApp)
    }
}

export default Hierarchy