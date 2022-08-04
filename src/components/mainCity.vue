<template>
  <div class="main">
    <h1>{{ msg }} </h1>
    <h1>api: {{apiKey}}</h1>
    <h1>good </h1>
 
  </div>

  <div class="search-box" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <input type="text"
    class="search-bat"
    placeholder="type her ..."
    v-model="search"
   @keypress="fetchWeather"
    >
  </div>

  <div class="wrap" v-if="typeof weather.main != 'undefined'">
      <div class="location-box">
        <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="date"></div>
      </div>

      <div class="weather-box">
        <div class="temp">
        </div>
        <div class="weather"></div>
      </div>

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
             imgUrl : new URL('../assets/lo.png', import.meta.url).href,
             logoUrl : new URL('../assets/logo.png', import.meta.url).href,
             baseUrl : new URL('https://api.openweathermap.org/data/2.5/'),
             search: '',
             weather: {}
        }
  },
    methods: {
    fetchWeather (e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setResults (results) {
      this.weather = results;
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
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
