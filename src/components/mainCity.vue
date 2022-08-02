<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
    <h1>api: {{apiKey}}</h1>
    <h1>good je</h1>
    <img src="../assets/lo.png" alt="logo error" >

   <img alt="home" :src="imgUrl" class="home">
  </div>

</template>

<script>
export default {
  name: 'mainCity',
  props: {
    msg: String,
    apiKey: String
  },
  data(){
         return{ 
             imgUrl : new URL('../assets/lo.png', import.meta.url).href
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 25px;
  font-weight: 600;
  margin: 40px 0 0;
}

</style>
