<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyX}}</el-col>
            <el-col :span="3"><el-input :size='data.size' v-model="data.valueX" :step='data.step' type='number' ></el-input></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyY}}</el-col>
            <el-col :span="3"><el-input :size='data.size' v-model="data.valueY" :step='data.step'  type='number' ></el-input></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyZ}}</el-col>
            <el-col :span="3"><el-input :size='data.size' v-model="data.valueZ" :step='data.step'  type='number' ></el-input></el-col>
            <el-col :span="1"><br></el-col>
            <el-col :span="1">{{data.keyW}}</el-col>
            <el-col :span="3"><el-input :size='data.size' v-model="data.valueW" :step='data.step'  type='number' ></el-input></el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='Textarea'
let defSize='mini'
let defValX=0
let defValY=0
let defValZ=0
let defValW=1
let defKeyX='x'
let defKeyY='y'
let defKeyZ='z'
let defKeyW='w'
let defStep=0.01
export default {
    props:{
        data:{
            type:Object,
            default(){
               return{ 
                maginTop:defMaginTop,
                name:defName,
                size:defSize,
                valueX:defValX,
                valueY:defValY,
                valueZ:defValZ,
                valueW:defValW,
                keyX:defKeyX,
                keyY:defKeyY,
                keyZ:defKeyZ,
                keyW:defKeyW,
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
        this.data.valueZ=this.data.valueZ || (this.data.valueZ===0?0:defValZ)
        this.data.valueW=this.data.valueW || (this.data.valueW===0?0:defValW)
        this.data.keyX=this.data.keyX || defKeyX
        this.data.keyY=this.data.keyY || defKeyY
        this.data.keyZ=this.data.keyZ || defKeyZ
        this.data.keyW=this.data.keyW || defKeyW
        this.data.step=this.data.step || (this.data.step===0?0:defStep)
    }
}
</script>

<style>

</style>