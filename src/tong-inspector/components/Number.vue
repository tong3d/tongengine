<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="18"><el-input-number style="width:100%" controls-position="right" :size='data.size'  v-model="data.value" :step='data.step'  ></el-input-number></el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='Number'
let defStep=0.01
let defSize='mini'
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
                step:defStep,
                size:defSize
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
    }
}
</script>

<style>

</style>