const version= 0.1
const componentFiles= require.context('./components', true, /\.(js|vue)$/)
const directiveFiles= require.context('./directives', true, /\.(js|vue)$/)
//const jsFiles=require.context('./js',true,/\.(js)$/)

const Tools={
    version:version,
    install(Vue){
        componentFiles.keys().forEach(key => {
            let keys=key.split('/')
            let newKey=keys[keys.length-1]
            let name = 'Tong' + newKey.replace(/(\.\/|\.(js|vue))/g, '')
            let component = componentFiles(key).default || componentFiles(key)
            Vue.component(name, component)
          })
          directiveFiles.keys().forEach(key => {
            let directive = directiveFiles(key).default || directiveFiles(key)
            for (let key in directive) {
                console.log(key, directive[key])
                Vue.directive(key, directive[key])
            }
          })
       
    }

}

export default Tools