<script>
import DisplayObject from '../../DisplayObject'
import Base from '../../Base'
import * as THREE from 'three'

export default {
  name: 'Material',
  mixins: [DisplayObject],
  inject: ['meshVm'],
  props: {
    type: { type: String, default: 'MeshStandardMaterial' },
  },
  data () {
    let defaultVal = {
      side:THREE.FrontSide, 
      color:{r:1,g:1,b:1}
    }
    let curObj = this.obj
    if (!curObj) {
       curObj = new THREE[this.type]()
    }
    return { curObj,default:defaultVal }
  },
  provide () {
    return { material: this.curObj }
  },
  mounted () {
    this.meshVm.curObj.material = this.curObj
  },
  beforeDestroy () {
    this.meshVm.curObj.material = null
  },
  unsetObj (obj) {
    this.meshVm.curObj.material = null
  }
}
</script>
