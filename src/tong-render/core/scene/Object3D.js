import { Object3D } from "three"
//2D container background
Object.defineProperty(Object3D.prototype,'container2D',{
        value:[]
})
//add 2d child ele
Object3D.prototype.addChild=function(child){
    this.container2D.addChild(child)
}
//remove 2d child ele
Object3D.prototype.removeChild=function(child){
    this.container2D.removeChild(child)
}
export default Object3D