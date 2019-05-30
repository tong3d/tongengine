<script>
import Base from '../../Base'
import MTLLoader from '../../../core/loaders/MTLLoader'
import OBJLoader from '../../../core/loaders/OBJLoader'

export default {
  name: 'MObjMtl',
  mixins: [Base],
  inject: ['meshVm'],
  props: {
    process: Function,
    mtlUrl: String,
    objUrl: String
  },

  created () {
    let { baseUrl, objUrl, mtlUrl } = this
    let mtlLoader = new MTLLoader()
    if (baseUrl) {
      mtlLoader.setBaseUrl(baseUrl)
      mtlLoader.setPath(baseUrl)
    }
    mtlLoader.load(mtlUrl, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      if (baseUrl) {
        objLoader.setPath(baseUrl)
      }
      objLoader.load(objUrl, (group) => {
        let body = group
        if (this.process) {
          body = this.process(group)
        }
        this.meshVm.curObj.add( body)
      })
    })
  }
}
</script>
