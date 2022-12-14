import { createStore } from 'vuex'

const store = createStore({
  state: {
    points: 5,
    p: 25,
    taqsD: '',
    taqsM:'',
    lang: 'ar',
    query: 'agadir',
    cities: ['','taza','meknes','fes'],
    taqs: {0: '1',
           1: '2',
           2: '3',
           3: '4',
           4:'5'
          },
    taqs2: {},
  },
  mutations: {
    updatePoints(state, payload) {
      state.points = state.points + payload
    },
    updateLang(state,payload){
      state.lang = payload
    },
    updateQuery(state,payload){
      state.query=  payload
    },
    updateCities(state,payload){
        state.cities =  [payload,'taza','meknes','fes']
    },
    
    updateTaqs(state,payload){
        state.taqs[0] = payload  
        state.taqs[1] = payload
        state.taqs[2] = payload
        state.taqs[3] = payload
    },
    updateTaqs2(state,payload){
      state.taqs[0] = payload  
      state.taqs[1] = payload
  }
  }
})

// export the store
export default store