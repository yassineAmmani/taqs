<template>
  <p>hello</p>
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
p{
  background-color: blueviolet;
  
}
.container {
  display: flex;
  flex-direction: row;
 
  height: 75vw;
  max-height: 550px;
}

.column {
  overflow-y: hidden;
  flex: 1;
  
  max-height: 100%;
}

@media screen and (max-width: 575.98px) {
  .container{
    height: 100vw;
    max-height: 800px;
  }
}


</style>