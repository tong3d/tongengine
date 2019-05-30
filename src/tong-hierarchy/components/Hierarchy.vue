<template>
    <div>
        <tong-tree :trees="hierarchy"></tong-tree>
    </div>
</template>
<script>
export default {
    props:{
        hierarchy:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>

