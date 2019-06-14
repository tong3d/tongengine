<script>
/* eslint-disable no-duplicate-imports */
import * as THREE from 'three'
import Object3D from './3d/Object3D'
import Scene from '../core/scene/Scene'
export default {
  name: 'Scene',
  mixins: [Object3D],
  inject: ['global'],
  data () {
    let curObj = this.obj
    if (!curObj) {
      curObj = new Scene()
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  },
  mounted () {
    let scene = this.curObj
    this.global.scene = scene
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = scene
    }
  }
}
</script>
