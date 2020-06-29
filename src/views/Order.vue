<template>
  <div class="container">
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Название</th>
        <th scope="col">Цена, шт.</th>
        <th scope="col">Мин. кол-во</th>
        <th scope="col"></th>
        <th scope="col">Сумма</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in getPrice.list" :key="product.id">
        <th scope="row">{{ index }}</th>
        <td>{{product.name}}</td>
        <td>{{product.price | getNicePrice}}</td>
        <td>{{product.packageAmount}} шт.</td>
        <th scope="col">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('minus', product)">-</button>
            <button type="button" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount()}}</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('plus', product)">+</button>
          </div>
        </th>
        <td>{{getProductPrice(product)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getNicePrice } from '@/utils'
import { mapGetters, mapMutations } from 'vuex'

export default {
  filters: {
    getNicePrice (price) {
      return getNicePrice(price)
    }
  },
  computed: {
    ...mapGetters(['getPrice', 'getOrder'])
  },
  created () {
    this.initPrice()
  },
  methods: {
    ...mapMutations(['initPrice', 'addToOrder']),
    getProductPrice (product) {
      const productInOrder = this.getOrder.find(el => el.name === product.name)
      this.addToOrder(productInOrder)
      return getNicePrice(10)
    },
    getAmount () {
      return this.number
    },
    addAmount (operator, rate) {
      let total = rate
      if (operator === 'minus') {
        total *= -1
      }
      this.number += total
    }
  }
}
</script>

<style scoped>

</style>
