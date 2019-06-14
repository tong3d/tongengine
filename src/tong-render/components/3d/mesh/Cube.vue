<template>
  <mesh name="Cube">
    <geometry type="BoxGeometry"></geometry>
    <material>
      <texture :url="`static/textures/${texture}.png`"></texture>
    </material>
  </mesh>
</template>
<script>
import Object3D from '../Object3D'
export default {
  name: 'cube',
  mixins: [Object3D],
  props: { size: Number, texture: String }
}
</script>
