<template>
  <renderer>
    <!-- <dat-gui :setup="uiSetup" :model="ui"></dat-gui> -->
    <scene hello="hello">
      <orbit-controls :config="{position:{x:0,y:100,z:100},rotation:{ x: 2, y: 0, z: 3 }}">
        <camera></camera>
      </orbit-controls>
      <object-ui></object-ui>
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
      
      <light  :position="{ x: 50, y: 50, z: 50 }"></light>
      <light  :config="{position:{ x: -50, y: -50, z: -50 }}"></light>
      <ocean :position="{x:0,y:-100,z:0}" :rotation="{x:0,y:0,z:0}"></ocean>
      <SF03 :position="{ y: 0 }" :scale="{x:2,y:2,z:2}"></SF03>
    </scene>
  </renderer>
</template>
<script>
import * as gui from './gui'
import cube from './Cube'
import Ocean from './Ocean'
import SF03 from './SF03'
export default {
  components: {
    cube,
    Ocean,
    SF03
  },

  data () {
    let uiSetup = gui.setupPanel
    let ui = gui.getModel()
    return {
      textures: [
        'cobblestone', 'diamond', 'redwool'
      ],
      ui,
      uiSetup,
    }
  },

  created () {
    // hack: loop animation via vue key prop
    setInterval(() => {
      this.ui.sysKey += 1
    }, 15000)
  }
}
</script>

<style>
body { margin: 0; overflow: hidden; }
</style>
