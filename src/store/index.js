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
      /* получаем общую сумму по каждому товару и записываем в объект */
      state.order.forEach(el => {
        el.totalSum = el.amount * el.price
      })
      return state.order
    },
    getTotalOrderSum (state) {
      return state.order.length ? state.order.reduce((acc, el) => {
        acc += el.amount * el.price
        return acc
      }, 0) : 0
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
        let extraAmount = el.packageAmount
        if (payload.operator === 'minus') {
          extraAmount *= -1
        }
        el.amount += extraAmount
        /* если кол-во ноль - удаляем из заказа */
        if (el.amount <= 0) state.order = state.order.filter(item => item.id !== el.id)
      } else {
        /* если нет элемента в заказах и нажали минус - ничего не делаем */
        if (payload.operator === 'minus') return
        /* если не находим элемент в заказах - берем его из прайса */
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
    initPrice ({ commit }) {
      commit('initPrice')
    },
    changePrice ({ commit }, price) {
      commit('changePrice', price)
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
