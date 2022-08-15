<template>
<div id="app1" :class="typeof taqs[1].main != 'undefined' && taqs[1].main.temp >25  ? 'warm' : ''">
  <main>
      <div class="search-box"> 
        
        <tggl  @click="ch" class="toggle" /> 
         
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          @input="event => {this.$store.state.query = event.target.value
                            this.$store.state.cities[0] = event.target.value
                            }"
          @keypress="fetchTaqs" 
          
        />
        <input type="button"  @click="fetchTaqsMobile" value="search" class="searchMobile"/> 
        
      </div>
     

      <div class="weather-wrap" v-if="typeof taqs[1].main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ taqs[1].name }}, {{ taqs[1].sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
       

        <div class="weather-box">
          
          <div class="temp">{{ Math.round(taqs[1].main.temp) }}°c 
            
          </div>
          <div class="weather"> {{ taqs[1].weather[0].description }}</div>
        </div>
      </div>
    </main>
    </div>

</template>

<script>
  import {  computed } from 'vue'
  import { useStore } from 'vuex'

  import tggl from './tggl.vue';

  import en  from '../lang/en.js';
  import ar  from '../lang/ar.js';

 

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
    const lang = computed( () => store.state.lang)
    var query3 =  computed(() => store.state.query)
    const cities = computed(() => store.state.cities)
    const taqs = computed(() => store.state.taqs)
   const taqs2 = computed(() => store.state.taqs2)


    const updateLang = (p) => {
      store.commit('updateLang', p)
    }
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
      lang,
      query3,
      cities,
      taqs,
      taqs2,
      updateLang,
      updateQuery,
      updateCities,
      updateTaqs,
      updateTaqs2,
    }
  },

  methods: {
   ch(){
      if (this.$store.state.lang=='en'){
        this.updateLang('ar');
      }
      else  {
        this.updateLang('en');
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
      this.taqs[this.cityNum].name= this.taqs[this.cityNum].name.replace(/إقليم/g,"");
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
      main{
        min-height: 45vh;
        max-height: 80vh;
      }

      .search-box {
        width: 100%;
        align-items: center;
        margin-bottom: 30px;
      }
    .search-box .search-bar {
      font-size: 28px;
      margin: 20px;
    }
    .location-box .location {
      font-size: 32px;
      font-weight: 550;
    }
    .location-box .date {
      font-size: 26px;
    }
    .weather-box .temp {
      font-size: calc(2vw + 2vh + 5vmin);;
    }
    .weather-box .weather {
      font-size: 36px;
      font-weight: 600;
    }
 
}
</style>