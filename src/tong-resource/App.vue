<template>
  <div >
    <tong-resource :resources='resources'/>
  </div>
</template>
<script>
export default {
  props: {
    resources: {
      type: Object,
      default() {
        return this.$store.state.resource.data
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
