<template>
  
<div id="app1" :class="typeof taqs[0].main != 'undefined' && taqs[0].main.temp > 25 ? 'warm' : ''">
  <main>
      points : {{ points }} {{this.$store.state.points}} or {{pt}}
      <button @click="alfa">remove a point</button>
      {{taqs[0]}} 
      <div class="search-box"> 
        
        <tggl  @click="ch" class="toggle" />
         
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          @input="event => query = event.target.value"
          @keypress="fetchTaqs" 
          
        />
        {{taqs[1]}} {{this.$store.state. cities}}
        <input type="button"  @click="fetchTaqsMobile" value="search" class="searchMobile"/> 
        <div  v-for="Q in num" :key="Q" > {{this.$store.state. cities[Q]}}</div>
      </div>
     

      <div class="weather-wrap" v-if="typeof taqs[0].main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ taqs [0].name }}, {{ taqs[0].sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
       

        <div class="weather-box">
          
          <div class="temp">{{ Math.round(taqs[0].main.temp) }}°c 
            
          </div>
          <div class="weather"> {{taqsD}}</div>
        </div>
      </div>
    </main>
    </div>

</template>

<script>
  import tggl from './tggl.vue';
  import en  from '../lang/en.js';
  
  import ar  from '../lang/ar.js';


  import {  computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'app',
  mixins: [en,ar],

  
  
  components: {
    tggl,
  },
  data () {
    return {
      api_key: '61944fd995ad0a170d84afd1b7ec348c',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      cold : new URL('../assets/cold.jpg', import.meta.url).href,
      lang: 'ar',
      taqsD: '',
      taqsM:'',
      checked : false,
      
      num:[0,1,2,3],
      pt:8,
      temp:{}
    }
  },
  
  setup() {

    const store = useStore()
    var query =  computed(() => store.state.cities)
    const points = computed(() => store.state.points)
    const taqs = computed(() => store.state.taqs)
    const updatePoints = (p) => {
      store.commit('updatePoints', p)
    }
    const updateCities = (p) => {
      store.commit('updateCities', p)
    }
     const updateTaqs = (p) => {
      store.commit('updateTaqs',
         p,
      );
    }
    return { 
      points,
      taqs,
      query,
      updateTaqs,
      updateCities ,
      updatePoints
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

    alfa(){
        this.pt = this.points
    },
 
   
     
    fetchTaqs (e) {
      if (e.key == "Enter" || e == "Mobile") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&lang=${this.lang}&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    fetchTaqsMobile() {
       this.fetchTaqs("Mobile");
    },
    setResults (results) {
      this.taqs = results;
      this.taqsD = results.weather[0].description;
      this.taqsM = results.weather[0].main;
      this.temp = [1,2];
      this.updateTaqs(this.temp);
      this.updateCities(this.query); 
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


main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
.search-box {
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 80%;
  margin-right: 15px ;
  margin-left: 20px;
  padding: 15px;
  
  color: #313131;
  font-size: 20px;
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
  font-size: 48px;
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
 
}
</style>
