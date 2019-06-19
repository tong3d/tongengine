<template>
  <div class="render_app">
    <renderer>
      <!-- <dat-gui :setup="uiSetup" :model="ui"></dat-gui> -->
      <scene>
        <camera></camera>
        <!-- <orbit-controls :config="{position:{x:0,y:100,z:100},rotation:{ x: 2, y: 0, z: 3 }}">
        </orbit-controls> -->
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
        return {}
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
