<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'Base',
  inject: {
    _baseUrl: { name: '_baseUrl', default: null },
    global: { name:'global', default: null},
  },
  props: {
    baseUrl: {
      type: String,
      default () { return this._baseUrl }
    }
  },
  provide () {
    return {
      _baseUrl: this.baseUrl
    }
  },
  data () {
    let game2d =this.global.game2d
    let renderer3d =this.global.renderer3d
    this.awake && game2d.lifeCycle.awakes.push(this.awake)
    this.start && game2d.lifeCycle.starts.push(this.start)
    this.update && game2d.lifeCycle.updates.push(this.update)
    return { game2d , renderer3d }
  },
  methods: {
    dispatchEvent (name, detail, options = {}) {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
      let e = new CustomEvent(name, {
        detail,
        bubbles: true,
        cancelable: true,
        ...options
      })
      return this.$el.dispatchEvent(e)
    }
  }
}
</script>