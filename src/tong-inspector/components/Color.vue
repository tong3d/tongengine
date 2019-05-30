<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="18"><el-color-picker width='100%' :size='data.size' v-model="data.value" show-alpha ></el-color-picker></el-col>
        </el-row>
    </div>
</template>

<script>
let defVal='#409EFF'
let defMaginTop=4
let defName='Color'
let defSize='mini'
export default {
    props:{
        data:{
            type:Object,
            default(){
                return{
                value:defVal,
                maginTop:defMaginTop,
                name:defName,
                size:defSize
                }
            }
        }
    },
    mounted(){
        this.data.value=this.data.value || defVal
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
    }
}
</script>

<style>

</style>