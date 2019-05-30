<script>
import Object3D from '../Object3D'
import * as THREE from 'three'
export default {
  name: 'Mesh',
  mixins: [Object3D],
  props: {
    type: { type: String, default: 'Mesh' }
  },

  provide () {
    return { meshVm: this }
  }
}
</script>
