import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { validatePrice } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    priceList: null,
    newPriceList: null,
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
    getNewPrice (state) {
      if (!state.priceList) {
        return
      }
      let list = {}
      if (state.newPriceList) {
        list = state.newPriceList
      } else {
        /* make a list copy for the admin */
        list = JSON.parse(JSON.stringify(state.priceList))
      }
      return list
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
    },
    saveToLocal (state, payload) {
      state.newPriceList = payload
    },
    addNewProduct (state, payload) {
      payload.id = uuidv4()
      if (!state.newPriceList) {
        state.newPriceList.list = []
      }
      state.newPriceList.list.push(payload)
    },
    removeItemById (state, id) {
      state.newPriceList.list = state.newPriceList.list.filter(el => el.id !== id)
    }
  },
  actions: {
    changePrice ({ commit }, price) {
      commit('changePrice', price)
    },
    addToOrder ({ commit }, payload) {
      commit('addToOrder', payload)
    },
    clearOrder ({ commit }) {
      commit('clearOrder')
    },
    saveToLocal ({ commit }, payload) {
      commit('saveToLocal', payload)
    },
    addNewProduct ({ commit }, payload) {
      commit('addNewProduct', payload)
    },
    removeItemById ({ commit }, id) {
      commit('removeItemById', id)
    },
    setAdmin ({ commit }) {
      commit('setAdmin')
    }
  },
  modules: {
  }
})
