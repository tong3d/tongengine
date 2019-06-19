<template>
  <div >
    <tong-inspector :inspectors="inspectors"/>
  </div>
</template>
<script>
export default {
  props: {
    inspectors: {
      type: Object,
      default() {
        return this.$store.state.inspector.data
      }
    }
  },
  methods:{
    addComponent(){
      this.inspectors.components.push({
        title:'组件4',
        icon:'iconfont tong-iconshexiangji',
        active:false,
        childs:[
          {
            type:'tong-slider',
            name:'Slider',
            value:true
          },
          {
            type:'tong-number',
            name:'文字',
            value:20
          }
        ]
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
>>>.labelInfo
  margin-left 6px
  margin-top 4px
  font-size 12px
</style>

