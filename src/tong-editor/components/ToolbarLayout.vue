<template>
    <div class="toolbarLayout">
        <toolbar></toolbar>
    </div>
</template>
<script>
import Toolbar from "../../tong-toolbar/App";
export default {
    components:{
        Toolbar
    }
}
</script>
<style lang="stylus" scoped>
.toolbarLayout
    position absolute 
    left 300px
    right 300px
    border-bottom 1px solid #EEE
    z-index 2
</style>

