import Vue from 'vue'
import Vuex from 'vuex'
import priceExample from '@/priceExample'
const env = process.env.NODE_ENV

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    priceList: null,
    order: []
  },
  getters: {
    getPrice (state) {
      return state.priceList
    },
    getOrder (state) {
      return state.order
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
    },
    addToOrder (state, payload) {
      const el = state.order.find(el => el.id === payload.id)
      if (el) {
        el.amount += payload
      }
    }
  },
  actions: {
    initPrice ({ commit }) {
      commit('initPrice')
    },
    changePrice ({ commit }, price) {
      commit('changePrice', price)
    },
    addToOrder ({ commit }, amount) {
      commit('addToOrder', amount)
    }
  },
  modules: {
  }
})
