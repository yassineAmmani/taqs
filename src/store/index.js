import { createStore } from 'vuex'

const store = createStore({
  state: {
    points: 5,
    p: 25,
    taqsD: '',
    taqsM:'',
    query: 'agadir',
    cities: ['','taza','meknes','fes'],
    taqs: {0: '1', 1:'2'

    },
   
  },
  mutations: {
    updatePoints(state, payload) {
      state.points = state.points + payload
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
    }
  }
})

// export the store
export default store