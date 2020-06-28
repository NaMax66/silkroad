import Vue from 'vue'
import Vuex from 'vuex'
import priceExample from '@/priceExample'
const env = process.env.NODE_ENV

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    priceList: 1
  },
  getters: {
    getPrice (state) {
      return state.priceList
    }
  },
  mutations: {
    initPrice (state) {
      let price = {}
      if (env === 'development') {
        price = priceExample
      }
      state.priceList = price
    },
    changePrice (state, payload) {
      state.priceList = payload
    }
  },
  actions: {
    initPrice ({ commit }) {
      commit('initPrice')
    },
    changePrice ({ commit }, price) {
      commit('changePrice', price)
    }
  },
  modules: {
  }
})
