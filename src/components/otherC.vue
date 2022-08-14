<template>
<div class="container">
    <div v-for='n in num' :key='n' class="column" >
         <div id="app1" :class="typeof taqs[n].main != 'undefined' && taqs[n].main.temp >25  ? 'warm' : ''">
  <main>
      <div class="search-box">      
        <label class="search-bar">{{ taqs[n].name }}</label>
      </div>
      <div class="weather-wrap" v-if="typeof taqs[n].main != 'undefined'">
        <div class="weather-box">
          <div class="temp">
            <label > {{ Math.round( taqs[n].main.temp) }}°c </label> 
          </div>
          <div class="weather"> <label ></label>{{ taqs[n].weather[0].description }}</div>
        </div>
      </div>
    </main>
    </div>

    </div>
</div>


</template>

<script>
  import {  computed } from 'vue'
  import { useStore } from 'vuex'

  import en  from '../lang/en.js';
  import ar  from '../lang/ar.js';

 

export default {
  name: 'app',
  mixins: [en,ar],

  data () {
    return {
      api_key: '61944fd995ad0a170d84afd1b7ec348c',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      cold : new URL('../assets/cold.jpg', import.meta.url).href,
      lang: 'ar',
      taqsD: '',
      taqsM:'',
      checked : false,
      query: '',

      q:'tokyo',
      cityNum:0,
      i:0,
      num:[2,3,4],
      Tq: {},
      temp:{}
    }
  },
  
  setup() {

    const store = useStore()
    var query3 =  computed(() => store.state.query)
    const cities = computed(() => store.state.cities)
    const taqs = computed(() => store.state.taqs)
   const taqs2 = computed(() => store.state.taqs2)

    const updateQuery = (p) => {
      store.commit('updateQuery', p)
    }
    const updateCities = (p) => {
      store.commit('updateCities', p)
    }
     const updateTaqs = (p) => {
      store.commit('updateTaqs', p,)
    }
    const updateTaqs2 = (p) => {
      store.commit('updateTaqs', p,)
    }
    return { 
      query3,
      cities,
      taqs,
      taqs2,
      updateQuery,
      updateCities,
      updateTaqs,
      updateTaqs2,
    }
  },

  methods: {
   ch(){
      if (this.lang=='en'){
        this.lang ='ar';
      }
      else  {
        this.lang = 'en';
      }
    },

    fetchTaqsMobile() {
            this.fetchTaqs("Mobile")  
    },
    fetchTaqs (e) { 
      let a =this.i;
      this.cityNum = 0;
      for(a = this.i; a<4 ;a++){
           setTimeout( ()=>{
              if (e.key == "Enter" || e == "Mobile") {
                  fetch(`${this.url_base}weather?q=${this.$store.state.cities[this.cityNum]}&units=metric&lang=${this.lang}&APPID=${this.api_key}`)
                    .then(res => {
                      return res.json();
                    }).then(this.setResults);
                    this.cityNum = this.cityNum + 1;     
                  }
           },
            this.delay(a)
          )
      }

      
    },
    delay(a){
        if (a == 0) {
          return 0
        }else {
          return a*1000
        }

    },

    setResults (results) {
      
      this.taqs = results;
      
      this.taqsD = results.weather[0].description;
      this.taqsM = results.weather[0].main;
       this.$store.state.taqs[this.cityNum] = results; 
       
      if(this.cityNum == 0){
        this.updateCities(this.$store.state.query); 
      }
    },
   
    dateBuilder () {
      let d = new Date();
      let months = this[this.lang]['months'];
      let days = this[this.lang]['days'];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year} `;
    }

  }
}
</script>


<style scoped>



#app1 {
  background-image: url('../assets/cold.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  ;
}
#app1.warm {
 background-image: url('../assets/warm.jpg');
}

.container {
  display: flex;
  flex-direction: row;
 
  height: 50vw;
  max-height: 300px;
}
.column {
  overflow-y: hidden;
  overflow-x: hidden;
  flex: 1;
  
  max-height: 100%;
}
@media screen and (max-width: 575.98px) {
  .container{
    height: 100vw;
    max-height: 800px;
  }
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
.search-box {
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.search-box .search-bar {
  display: block;
  width: 80%;
  padding: 15px;
  
  color: #313131;
  font-size: 28px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .searchMobile{
  color: #313131;
  margin: 5px;
  cursor: pointer;
  font-size: 17px;
  background-color: rgba(200, 170, 228, 0.6);
  border: none;
 
  border-radius: 2px 6px 2px 6px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: calc(2vw + 2vh + 2vmin);;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  color: #FFF;
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

@media (max-width: 575.98px) {
 .search-box .search-bar {
   margin: 0px;

 }

 .location-box .location {
  
  font-size: 22px;


}
.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather{
  font-size: 10px;
}
 
}
</style>