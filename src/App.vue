<template>
  <img alt="Vue logo" class="logo" src="./assets/logo.png">
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
  margin-top: 60px;
}
.logo{
  width: 200px;
  height: 100%;
}
</style>
