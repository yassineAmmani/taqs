import { createStore } from 'vuex'

const store = createStore({
  state: {
    points: 5,
    p: 25,
    taqsD: '',
    taqsM:'',
    cities: ['','taza','meknes','fes'],
    taqs: {0: '1', 1:'2'

    },
   
  },
  mutations: {
    updatePoints(state, payload) {
      state.points = state.points + payload
    },
    updateCities(state,payload){
        state.cities =  [payload,'taza','meknes','fes']
    },
    updateTaqs(state,payload){
        state.taqs[0] = payload[0]  
        state.taqs[1] = payload[1]
    }
  }
})

// export the store
export default store