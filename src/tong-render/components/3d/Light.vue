<script>
import * as THREE from 'three'
import Object3D from './Object3D'

export default {
  name: 'Light',
  mixins: [Object3D],

  props: {
    type:{
      type:String,
      default(){
        return 'DirectionalLight'
      }
    }
  },
  data(){
    return {
      default:{
          color:{r:1,g:1,b:1},
          intensity:1
        }
    }
  }
  
}
</script>
