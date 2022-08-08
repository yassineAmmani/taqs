<template>
    <div class="container">
  <div class="column" >
    <mainCity  />
  </div> 
  
  <div class="column" >
    <mainCity  />
  </div>
  
  <div class="column" >
    <mainCity  />
  </div>
</div>
</template>
<script>
import mainCity from './mainCity.vue';
export default {
     components: {
    mainCity,
  },
    
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
}

.column {
  flex: 1;
  max-width: 33%;
}


</style>