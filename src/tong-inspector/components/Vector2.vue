<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyX}}</el-col>
            <el-col :span="8"><el-input :size='data.size' v-model="data.valueX" :step='data.step' type='number' ></el-input></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyY}}</el-col>
            <el-col :span="8"><el-input :size='data.size' v-model="data.valueY" :step='data.step'  type='number' ></el-input></el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='Textarea'
let defSize='mini'
let defValX=0
let defValY=0
let defKeyX='x'
let defKeyY='y'
let defStep=0.01
export default {
    props:{
        data:{
            type:Object,
            default(){
                return {
                maginTop:defMaginTop,
                name:defName,
                size:defSize,
                valueX:defValX,
                valueY:defValY,
                keyX:defKeyX,
                keyY:defKeyY,
                step:defStep
                }
            }
        }
    },
    mounted(){
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
        this.data.valueX=this.data.valueX || (this.data.valueX===0?0:defValX)
        this.data.valueY=this.data.valueY || (this.data.valueY===0?0:defValY)
        this.data.keyX=this.data.keyX || defKeyX
        this.data.keyY=this.data.keyY || defKeyY
        this.data.step=this.data.step || (this.data.step===0?0:defStep)
    }
}
</script>

<style>

</style>