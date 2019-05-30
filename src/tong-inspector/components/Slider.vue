<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="18"><el-slider :step='data.step' :min='data.min' :max='data.max' :size='data.size' v-model="data.value" show-input></el-slider></el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='Slider'
let defSize='mini'
let defMin=0
let defMax=100
let defStep=0.01
let defVal=0
export default {
    props:{
        data:{
            type:Object,
            default(){
                return{
                value:defVal,
                maginTop:defMaginTop,
                name:defName,
                size:defSize,
                min:defMin,
                max:defMax,
                step:defStep
                }
            }
        }
       
        
    },
    mounted(){
        this.data.step=this.data.step || (this.data.step===0?0:defStep)
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
        this.data.value=this.data.value || (this.data.value===0?0:defVal)
        this.data.min=this.data.min || (this.data.min===0?0:defMin)
        this.data.max=this.data.max || (this.data.max===0?0:defMax)
    }
}
</script>

<style>

</style>