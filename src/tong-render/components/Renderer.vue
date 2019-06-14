<template>
  <div class="render_parent">
    <slot></slot>
    <div class="render_container" ref="container"></div>
  </div>
</template>
<script>
/* global requestAnimationFrame */
import { WebGLRenderer } from 'three'
import Game  from '../core/phaser/Game.js'
import  PhaserComps from '../core/ui/phasercomps'
export default {
  name: 'Renderer',
  provide () {
    return {
      parentObj: null, // avoid "injection not found" warning
      _baseUrl: null,
      global: this.global
    }
  },
  props: {
    size: {
      type: Object, // { width, height }
      default() {
       return { width: 0,
                height: 0
              }
      }
    },
    backgroundColor: {
      type:Number,
      default:0x000000
    },
  },
  data () {
    let that=this
    let parameters = {antialias: true}
    this.canvas && (arameters.canvas = this.canvas)
    let renderer3d = new WebGLRenderer( parameters )
    let config = {
        width: this.size.width,
        height: this.size.height,
        type: Phaser.WEBGL,
        backgroundColor: this.backgroundColor,
        canvas: renderer3d.domElement,
        context: renderer3d.context,
        scene: {
            preload: awake,
            create: start,
            update: update
        },
        plugins: {
          global: [
            PhaserComps.Plugin.DefaultCfg
          ]
      }
    }
    // game preload 
    function awake() {
      that.global.scene && !that.global.scene.container2D && (that.global.scene.container2D = this)
      that.game2d.lifeCycle.awakes.forEach(awakeFunc => {
        awakeFunc({scene2D:that.global.scene.container2D, global:that.global})
      })
    }
    // prepared and game start
    function start() {
      let externView = this.add.extern()
      externView.render = (prenderer, pcamera, pcalcMatrix) =>
      {
          renderer3d.state.reset()
          renderer3d.render(that.global.scene, that.global.camera)
      }
      renderer3d.autoClear = false
      that.game2d.lifeCycle.starts.forEach(startFunc => {
        startFunc({scene2D:that.global.scene.container2D, global: that.global})
      })
    }
    // game update
    function update(time,delta) {
      that.game2d.lifeCycle.updates.forEach(updateFunc => {
        updateFunc({time,delta, scene2D: that.global.scene.container2D, global:that.global})
      })
    }
    let game2d = new Game(config)
    let global = {}
    global.rendererSize = this.size
    global.rendererDom = renderer3d.domElement
    global.game2d = game2d
    global.renderer3d = renderer3d
    return { game2d, renderer3d, global }
  },
  methods: {
    setSize(width, height) {
      this.renderer3d.setSize(width, height)
    }
  },
  mounted () {
    this.$refs['container'].appendChild(this.global.rendererDom)
  }
}
</script>
<style lang="stylus" scoped>
.render_parent
  width 100%
  height 100%
.render_container
  width 100%
  height 100%
</style>

