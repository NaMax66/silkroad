import Vue from 'vue'
import Vuex from 'vuex'
// import priceExample from '@/priceExample'
import { getPrice } from '@/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    priceList: null,
    newPriceList: null,
    order: []
  },
  getters: {
    getPrice (state) {
      return state.priceList
    },
    getNewPrice (state) {
      if (!state.priceList) {
        return
      }
      let list = {}
      if (state.newPriceList) {
        list = state.newPriceList
      } else {
        /* делаем копию нового заказа из того, что есть на сервере. */
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
        acc += el.amount * el.price
        return acc
      }, 0) : 0
    }
  },
  mutations: {
    async initPrice (state, payload) {
      state.priceList = payload
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
      state.newPriceList.list.push(payload)
    }
  },
  actions: {
    async initPrice ({ commit }) {
      const price = await getPrice()
      commit('initPrice', price)
    },
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
    }
  },
  modules: {
  }
})
