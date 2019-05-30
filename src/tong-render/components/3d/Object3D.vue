<script>
import DisplayObject from '../DisplayObject'
import * as THREE from 'three'
import { type } from 'os';

export default {
  name: 'Object3D',
  mixins: [DisplayObject],
  props: {
    type: { type: String, default: 'Object3D' }
  },
  provide () {
    return { uiVm: null }
  },
  data () {
    let defaultVal={
      name: this.type,
      visible: true,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1 , y: 1 , z: 1 }
    } 
    let curObj = this.obj
    if (!curObj && this.isImmediate) {
      curObj = new THREE[this.type]()
    }
    return { 
      curObj, 
      default:defaultVal
    }
  },
  methods:{
    onAddObj(){
      if (this.parentObj) {
        this.parentObj.add(this.curObj)
      }
    },
    onRemoveObj(){
      if (this.parentObj) {
        this.parentObj.remove(this.curObj)
      }
    }
  }
  
}
</script>
