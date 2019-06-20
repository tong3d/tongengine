<template>
  <div class="render_app">
    <renderer>
      <scene>
        <orbit-controls :config="{position: {x: 0, y: 100, z: 100}, rotation: { x: 2, y: 0, z: 3 }}">
          <camera></camera>
        </orbit-controls>
        <text2d></text2d>
        <!-- <object-ui></object-ui> -->
        <!-- <texture2d baseUrl='static/ui/img/bomb1.png'></texture2d>
        <text2d></text2d>
        <bitmap-text2d :fontSize="30"></bitmap-text2d> -->
        <!-- <ui-button></ui-button> -->
        <!-- <ui-window>
          <ui-button><ui-label></ui-label></ui-button>
          <ui-slider></ui-slider>
          <ui-checkbox></ui-checkbox>
          <ui-radio></ui-radio>
          <ui-input></ui-input>
        </ui-window>
        <ui-button></ui-button> -->
        <!-- <mesh name="Cube">
          <geometry type="BoxGeometry"></geometry>
          <material>
            <texture :url="`static/textures/diamond.png`"></texture>
          </material>
        </mesh> -->
      </scene>
    </renderer>
  </div>
</template>
<script>
export default {
  props: {
    renders: {
      type: Object,
      default() {
        return this.$store.state.render.data
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.render_app
  width 100%
  height 100%
</style>
