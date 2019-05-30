<script>
import { PerspectiveCamera } from 'three'
import Object3D from './Object3D'

export default {
  name: 'Camera',
  mixins: [Object3D],
  inject: ['global'],
  props: {
    type:{
      type:String,
      default(){
        return 'PerspectiveCamera'
      }
    }
  },
  data() {
    return {
      default:{
          aspect : this.global.rendererSize.width/this.global.rendererSize.height,
          fov : 75,
          far : 1000,
          near : 0.1
        }
    }
  },
  mounted () {
    this.global.camera = this.curObj
  }
}
</script>
