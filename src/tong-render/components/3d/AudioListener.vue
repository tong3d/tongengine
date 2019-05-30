<template>
  <Object3D :obj="listener" :position="config.position"></Object3D>
</template>

<script>
import { AudioListener } from 'three'
import Object3D from './Object3D'

export default {
  name: 'AudioListener',
  mixins: [Object3D],
  components: { Object3D },
  inject: ['global'],
  props: {
    type:{
      type:String,
      default(){
        return 'AudioListener'
      }
    }
  },
  data () {
    let listener = new AudioListener()
    this.global.audioListener = listener // fixme
    return { listener }
  }
}
</script>
