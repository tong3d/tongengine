<template>
  <div class="toolbar_container">
    <tong-toolbar :toolbars="toolbars"/>
  </div>
</template>
<script>
export default {
  props: {
    toolbars: {
      type: Object,
      default() {
        return this.$store.state.toolbar.data
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.toolbar_container
  background-color #fff
</style>

