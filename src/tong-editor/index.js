const version= 0.1
const componentFiles=require.context('./components', false, /\.(js|vue)$/)
const TongEditor={
    version:version,
    install(Vue){
        componentFiles.keys().forEach(key => {
            let name = 'Tong' + key.replace(/(\.\/|\.(js|vue))/g, '')
            let component = componentFiles(key).default || componentFiles(key)
            Vue.component(name, component)
          })
    }
}

export default TongEditor