import Vue from 'vue'
import Vuex from 'vuex'
import { validatePrice } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    priceList: null,
    order: [],
    newOrders: null,
    isAdmin: false,
    news: null
  },
  getters: {
    getPrice (state) {
      return state.priceList
    },
    getNews (state) {
      return state.news
    },
    getOrder (state) {
      state.order.forEach(el => {
        el.totalSum = el.amount * el.price
      })
      return state.order
    },
    getTotalOrderSum (state) {
      return state.order.length ? state.order.reduce((acc, el) => {
        acc += +el.amount * +el.price
        return acc
      }, 0) : 0
    },
    getNewOrders (state) {
      return state.newOrders
    },
    getIsAdmin (state) {
      return state.isAdmin
    }
  },
  mutations: {
    SOCKET_newOrderFromServer (state, message) {
      state.newOrders = message
    },
    SOCKET_initialPrice (state, message) {
      message = validatePrice(message)
      state.priceList = message
    },
    SOCKET_newsFromServer (state, message) {
      state.news = message
    },
    setAdmin (state) {
      state.isAdmin = true
    },
    setPrice (state, payload) {
      payload = validatePrice(payload)
      state.priceList = payload
    },
    setNews (state, payload) {
      state.news = payload
    },
    addToOrder (state, payload) {
      const el = state.order.find(el => el.id === payload.id)
      if (el) {
        let extraAmount = el.packageAmount
        if (payload.operator === 'minus') {
          extraAmount *= -1
        }
        el.amount += extraAmount
        if (el.amount <= 0) state.order = state.order.filter(item => item.id !== el.id)
      } else {
        if (payload.operator === 'minus') return
        const newEl = Object.assign({}, state.priceList.list.find(el => el.id === payload.id))
        newEl.amount = newEl.packageAmount
        state.order.push(newEl)
      }
    },
    clearOrder (state) {
      state.order = []
    }
  },
  actions: {
    setAdmin ({ commit }) {
      commit('setAdmin')
    },
    setNews ({ commit }, payload) {
      commit('setNews', payload)
    },
    setPrice ({ commit }, price) {
      commit('setPrice', price)
    },
    addToOrder ({ commit }, payload) {
      commit('addToOrder', payload)
    },
    clearOrder ({ commit }) {
      commit('clearOrder')
    }
  },
  modules: {
  }
})
