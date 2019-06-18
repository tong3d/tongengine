<template>
  <div >
    <tong-hierarchy :hierarchy='hierarchy'/>
  </div>
</template>

<script>
//import Inspector from './tong-inspector'

export default {
  props: {
    hierarchy: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
   
  },
 
  methods:{
    
  }
}

</script>

<style>

</style>
