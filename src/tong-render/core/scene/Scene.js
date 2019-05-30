import { Scene } from "three"
let _container2D = null
// 2D container
Object.defineProperty(Scene.prototype,'container2D',{
    set(val){
        _container2D=val
    },
    get(){
        if(!_container2D) return null
        return _container2D
    }
})
// Scene.prototype.addChild = (child)=>{
    // _container2D && child && _container2D.add(child)
// }
// Scene.prototype.removeChild = (child)=>{
   // _container2D && child && _container2D.remove(child)
// }
export default Scene