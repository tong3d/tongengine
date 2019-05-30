<!--数据格式
inspectors:
      {
        bottomButton:{
          maginTop:8,
          name:'Hello',
          callback:eve=>{
            this.addComponent()
          }
        },
        datas:[{
        title:'组件1',
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
            name:'文字',
            value:20
          }
        ]
      }]}
 -->
<template>
    <el-collapse v-model='actives'>
        <el-collapse-item v-for="component in inspectors.components" :key="component.uuid" :name="component.uuid" >
            <template slot="title">
                <i :class='component.icon' class="titleIcon"></i>
                <div v-show='component.icon && component.icon.trim()!==""' style="margin-left:4px"> </div>
                {{component.title}} 
            </template>
            <component  v-for="(child, idx) in component.childs" :data="child"  :key="idx" :is="child.type" ></component>
        </el-collapse-item>
        <div v-if="inspectors.bottomButton">
            <div :style="{'margin-top':(inspectors.bottomButton.maginTop===undefined?4:inspectors.bottomButton.maginTop)+'px'}"></div>
            <el-row >
                <el-button class="addComps" :span="20" @click="inspectors.bottomButton.callback===undefined?()=>{}:inspectors.bottomButton.callback($event)">{{inspectors.bottomButton.name}}</el-button>
            </el-row>
        </div>
    </el-collapse>
</template>

<script>
import Utils from "../js/utils/Utils"
export default {
    props:{
        inspectors:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
       return { 
           actives:[]
       }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.actives.splice(0)
            for(let i=0;i<this.inspectors.components.length;i++){
                if(!this.inspectors.components[i].isInit ){
                    this.inspectors.components[i].isInit=true
                    this.inspectors.components[i].uuid=Utils.generateUUID()
                }
                if(this.inspectors.components[i].active){
                        this.actives.push(this.inspectors.components[i].uuid)
                }
            }
        },
    },
    watch:{
        'inspectors.components':{
            handler:function(vals, old){
               // console.log(vals,old)
                for(let i=0;i<vals.length;i++){
                    if(!vals[i].isInit){
                        this.inspectors.components[i].isInit=true
                        this.inspectors.components[i].uuid=Utils.generateUUID()
                        if(this.inspectors.components[i].active){
                            this.actives.push(this.inspectors.components[i].uuid)
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang='stylus'>
input
    &::-webkit-inner-spin-button
        position: absolute;
        right: 0px
.addComps
    margin-left 5%
    width 90%
.titleIcon
    margin-left 4px
</style>