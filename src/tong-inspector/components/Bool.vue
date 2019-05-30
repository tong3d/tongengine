<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row >
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="6"><el-switch :size='data.size' v-model="data.value" :active-color="data.activeColor" :inactive-color="data.inActiveColor"></el-switch></el-col>
        </el-row>
    </div>
</template>

<script>
let defVal=false
let defActiveColor='#13ce66'
let defInActiveColor='#ff4949'
let defName='Checkbox'
let defSize='mini'
let defMaginTop=4
export default {
    props:{
        data:{
            type:Object,
            default(){
                return{
                value:defVal,
                activeColor:defActiveColor,
                inActiveColor:defInActiveColor,
                name:defName,
                size:defSize,
                maginTop:defMaginTop
                }
            }
        }
    },
    mounted(){
        this.data.value=this.data.value || this.defVal
        this.data.activeColor=this.data.activeColor || defActiveColor
        this.data.inActiveColor=this.data.inActiveColor || defInActiveColor
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
    }
}
</script>

<style>

</style>