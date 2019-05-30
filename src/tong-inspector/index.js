import InspectorApp from "./App"
const version= 0.1
const componentFiles=require.context('./components', false, /\.(js|vue)$/)
const jsFiles=require.context('./js',true,/\.(js)$/)
const Inspector={
    version:version,
    install(Vue){
        componentFiles.keys().forEach(key => {
            let name = 'Tong' + key.replace(/(\.\/|\.(js|vue))/g, '')
            let component = componentFiles(key).default || componentFiles(key)
            Vue.component(name, component)
          })
        Vue.component('TongInspectorApp', InspectorApp)
    }
}

 jsFiles.keys().forEach(key=>{
            let name = key.replace(/(\.\/|\.(js))/g, '')
            Inspector[name]=jsFiles(key).default || jsFiles(key)
        })

export default Inspector