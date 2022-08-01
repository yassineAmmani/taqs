<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
    <h1>api: {{apiKey}}</h1>
   
  </div>

</template>

<script>
export default {
  name: 'mainCity',
  props: {
    msg: String,
    apiKey: String
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
