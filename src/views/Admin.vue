<template>
  <div class="container">
    <form class="col-lg-4" v-if="!authorized">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">Войти</button>
    </form>
    <table v-if="authorized" class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Название</th>
        <th scope="col">Цена, шт.</th>
        <th scope="col">В упак</th>
        <th scope="col">Цена, упак</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in getPrice.list" :key="product.id">
        <th scope="row">{{ index }}</th>
        <td>{{product.name}}</td>
        <td>{{product.price | getNicePrice}}</td>
        <td>{{product.packageAmount}} шт.</td>
        <td>{{getPackagePrice(product.price, product.packageAmount)}}</td>
        <th scope="col">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('minus', product.rate)">-</button>
            <button type="button" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount()}}</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('plus', product.rate)">+</button>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getNicePrice } from '@/utils'
export default {
  name: 'Admin',
  data: () => ({
    authorized: true,
    number: 0
  }),
  filters: {
    getNicePrice (price) {
      return getNicePrice(price)
    }
  },
  computed: {
    ...mapGetters(['getPrice'])
  },
  created () {
    this.initPrice()
  },
  methods: {
    ...mapMutations(['initPrice', 'addToOrder']),
    checkPass () {
      if (this.password === 'salam') {
        this.authorized = true
      }
    },
    getPackagePrice (price, amount) {
      return getNicePrice(price * amount)
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
