<template>
    <div>
        <div :style="{'margin':data.maginTop+'px'}"></div>
        <el-row>
            <el-col :span="4" :size='data.size'><div class="labelInfo">{{data.name}}</div></el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="18">
                <el-select style="width:100%" :size='data.size' v-model="data.value" filterable placeholder="请选择">
                    <el-option
                    v-for="item in data.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
let defMaginTop=4
let defName='Enum'
let defSize='mini'
let defVals=''
let defOptions=[]
export default {
    props:{
        data:{
            type:Object,
            default(){
                return{
                maginTop:defMaginTop,
                name:defName,
                size:defSize,
                value:defVals,
                options:defOptions
                }
            }
        }
    },
    mounted(){
        this.data.options=this.data.options || defOptions
        this.data.value=this.data.value || defVals
        this.data.name=this.data.name || defName
        this.data.size=this.data.size || defSize
        this.data.maginTop=this.data.maginTop || (this.data.maginTop===0?0:defMaginTop)
    }
}
</script>

<style>

</style>