import Vue from 'vue'
import Vuex from 'vuex'
import priceExample from '@/priceExample'
const env = process.env.NODE_ENV

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    price: null
  },
  getters: {
    getPrice (state) {
      return state.price
    }
  },
  mutations: {
    initPrice (state, payload) {
      state.price = payload
    },
    changePrice (state, payload) {
      state.price = payload
    }
  },
  actions: {
    initPrice ({ commit }) {
      let price = {}
      if (env === 'development') {
        price = priceExample
      }
      commit('initPrice', price)
    },
    changePrice ({ commit }, price) {
      commit('changePrice', price)
    }
  },
  modules: {
  }
})
