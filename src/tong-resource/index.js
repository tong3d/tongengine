import ResourceApp from "./App"
const version= 0.1
const componentFiles=require.context('./components', false, /\.(js|vue)$/)
const jsFiles=require.context('./js',true,/\.(js)$/)

const Resource={
    version:version,
    install(Vue){
        componentFiles.keys().forEach(key => {
            let name = 'Tong' + key.replace(/(\.\/|\.(js|vue))/g, '')
            let component = componentFiles(key).default || componentFiles(key)
            Vue.component(name, component)
            if(name==='TongText'){
                Vue.component('TongTxt', component)
            }
          })
        Vue.component('TongResourceApp', ResourceApp)
    }

}

 jsFiles.keys().forEach(key=>{
            let name = key.replace(/(\.\/|\.(js))/g, '')
            Resource[name]=jsFiles(key).default || jsFiles(key)
        })

export default Resource