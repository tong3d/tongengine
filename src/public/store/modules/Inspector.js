const state = {
    data: {
        bottomButton:{
          maginTop:8,
          name:'Add Component',
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
const getters = {
    inspectors(state) {
        return state.data
    }
}
const actions = {

}
const mutations = {
    
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}