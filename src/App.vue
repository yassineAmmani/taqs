<template>
 
  <mainCity msg="this is the main city taqs components " :apiKey=key />
  
</template>

<script>
import mainCity from './components/mainCity.vue'

export default {
  name: 'App',
  components: {
    mainCity,
  },
  data() {
    return {
      logoUrl : new URL('./assets/logo.png', import.meta.url).href,
      cold : new URL('./assets/cold.jpg', import.meta.url).href,
      key : '61944fd995ad0a170d84afd1b7ec348c'
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
  
}
.logo{
  width: 200px;
  height: 100%;
}
</style>
