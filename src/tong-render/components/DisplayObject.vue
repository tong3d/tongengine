<template>
  <div><slot></slot></div>
</template>

<script>
import Utils from '../core/utils'
import Base from './Base'
export default {
  name: 'DisplayObject',
  mixins: [Base],
  inject: {
    parentObj: { name: 'parentObj', default: null },
    parentNode: {name: 'parentNode', default: null}
  },
  props: {
    type: {
      type:String,
      default(){
          return 'DisplayObject'
      }
    },
    // is assign curObj value in data() function 
    isImmediate:{
      type:Boolean,
      default(){
        return true
      }
    },
    obj: Object,
    config:{
        type:Object,
        default(){
            return {}
        }
    }
  },
  watch: {
    obj (obj) {
        this.curObj = obj
    },
    curObj (obj, oldObj) {
        if(!obj){
          this.$emit('update:obj', this.curObj)
          return
        }
        this.onUnsetObj(oldObj)
        this.isApplyConfig && this.onApplyConfig()
        this.isAttachEve && this.onAttachEve()
        this.onAddObj()
        this.$emit('update:obj', this.curObj)
    }
  },
  provide () {
    return {
      parentObj: this.curObj,
      parentNode: this
    }
  },
  data() {
    return {
      default:{},
      //string eve name array
      listeners:[],
      //is open config watch
      isApplyConfig:true,
      //is attach eve
      isAttachEve:true,
      //When some properties are defined through getters and setters, watch will make an error
      //needs watch raw data,as example: pixijs width:_width
      exceptObjWatchs:{}
    }
  },
  created(){
   this.isApplyConfig && this.onApplyConfig()
  },
  
  beforeDestroy () {
    this.onUnsetObj(this.curObj)
  },
  methods: {
    // attach the events
    onAttachEve(){

    },
    //add obj to the scene
    onAddObj(){
      
    },
    onRemoveObj(){

    },
    onApplyConfig(){
      if(!this.curObj) return
      for(let key in this.$attrs){
        if(!(key in this.config) && key in this.curObj){
          this.$set(this.config,key,this.$attrs[key])
        }
      }
      //默认值赋予config
      for(let key in this.default){
          if(!(key in this.config)){
            this.$set(this.config,key,this.default[key])
          }else{
            if(this.default[key] instanceof Object){
              for(let k in this.default[key]){
                // key exist but value is null/undefined
                if(!this.config[key]){
                  this.$set(this.config,key,this.default[key])
                }
                //k not exist in curr config key
                else if(!(k in this.config[key])){
                  this.$set(this.config[key],k,this.default[key][k])
                }
              }
            }
          }
      }
      if(this.config.name!==this.config.type && this.config.name===this.default.name){
          this.curObj.name=this.config.name=this.config.type
      }
      this.setObj(this.curObj)
    },
    applyWatchVal (key,val,data){
        if(val instanceof Object){
            let propertyNames = Utils.getAllPropertyNames(val)
            for(let i in propertyNames){
                let k= propertyNames[i]
                if(typeof data[key][k]!=="undefined"){
                    data[key][k]=val[k]
                }
            }
        }else{
            data[key]=val
        }
    },
    addObjWatcher (key,name){
        let unWatchCurObj=this.$watch(name,(val)=>{
            this.applyWatchVal(key,val,this.config)
        },{deep:true})
        
    },
    addConfigWatcher (key,name){
        let unWatchConfig=this.$watch(name,(val)=>{
            this.applyWatchVal(key,val,this.curObj)
        },{ deep: true })
        
    },
    setObj (obj) {
        if(!obj) return
        //对congig的所有值进行watch
        for(let key in this.config){
            if(!(key in obj)){
              continue
            }
            if(this.config[key] instanceof Object){
                Object.assign(obj[key], this.config[key])
            }else{
                obj[key] = this.config[key]
            }
            let filterRes=null
            for(let i=0;i<this._watchers.length;i++){
              let item=this._watchers[i]
              if(item.expression===`curObj.${key}`){
                filterRes = item
                break
              }
            }
            if (!filterRes){
                this.addConfigWatcher(key,`config.${key}`)
                if(this.exceptObjWatchs.hasOwnProperty(key)){
                  this.addObjWatcher(key,`curObj.${this.exceptObjWatchs[key]}`)
                  return
                }
                this.addObjWatcher(key,`curObj.${key}`)
            }
        }
        
    },
    onUnsetObj(){
      this.onRemoveObj()
      this.$emit('update:obj', null)
    }
  },
  mounted(){
    if(!this.curObj) return
    this.isAttachEve && this.onAttachEve()
    this.onAddObj()
    this.$emit('update:obj', this.curObj)
  }
}
</script>
