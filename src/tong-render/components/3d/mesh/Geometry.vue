<script>
import DisplayObject from '../../DisplayObject'
import * as THREE from 'three'

export default {
  name: 'Geometry',
  mixins: [DisplayObject],
  inject: ['meshVm'],
  props: {
    args: { type: Array, default: () => [1,1,1] },
    type: { type: String, default: 'Geometry' }
  },

  data () {
    let mod = `${this.type}`
    let curObj = new THREE[mod](...this.args)
    return { curObj }
  },
  methods:{
    onAddObj(){
      this.meshVm.curObj.geometry = this.curObj
    },
    onRemoveObj(){
      this.meshVm.curObj.geometry = null
    }
  }
}
</script>
