<template>
  <div >
    <tong-inspector :inspectors="inspectors"/>
  </div>
</template>

<script>
//import Inspector from './tong-inspector'

export default {
  components: {
   
  },
  data(){
    return {
      inspectors:
      {
        bottomButton:{
          maginTop:8,
          name:this.$t('Add Component'),
          callback:()=>{
            this.addComponent()
          }
        },
      components:[
      {
        title:'Entity',
        active:true,
        icon:'iconfont tong-icontransform',
        childs:[
          {
            maginTop:4,
            type:'tong-bool',
            name:'布尔值',
            value:true
          },
          {
            type:'tong-number',
            name:'数字',
            value:20
          },
          {
            type:'tong-string',
            name:'字符串',
            value:'这是字符串'
          },
          {
            type:'tong-color',
            name:'颜色',
            value:'red'
          },
          {
            type:'tong-enum',
            name:'枚举',
            value:'请选择'
          },
          {
            type:'tong-slider',
            name:'拖动条',
            value:30
          },
          
          {
            type:'tong-textarea',
            name:'多行文本',
            value:'hello world hahahah'
          },
          {
            type:'tong-vector2',
            name:'2维向量',
            valueX:30,
            valueY:10
          },
          {
            type:'tong-vector3',
            name:'3维向量',
            valueX:30,
            valueY:30,
            valueZ:10,
          },
          {
            type:'tong-vector4',
            name:'4维向量',
            valueX:30,
            valueY:30,
            valueZ:10,
            valueW:10,
          },
        ]
      }]}
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

