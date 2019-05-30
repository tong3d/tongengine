<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="18"><el-input :size='data.size' v-model="data.value"  type='string' ></el-input></el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='String'
let defSize='mini'
let defVal=''
export default {
    props:{
        data:{
            type:Object,
            default(){
                return{
                maginTop:defMaginTop,
                name:defName,
                size:defSize,
                value:defVal
                }
            }
        }
    },
    mounted(){
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
        this.data.value=this.data.value || defVal
    }
}
</script>

<style>

</style>