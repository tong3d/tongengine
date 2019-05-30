<template>
    <div>
        <img :src="item.url || url">
		<div class="label">{{ item.label }}</div>
    </div>
</template>
<script>
import AssetsType from "../js/AssetsType";
export default {
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            url:AssetsType.Folder.url
        }
    }
}
</script>
<style>

</style>

