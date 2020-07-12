<template>
  <div class="container" v-if="getIsAdmin">
    <div class="mt-3 border-bottom" v-for="item in getNewOrders" :key="item.id">
      <div class="d-flex">
        <h5 class="pr-3">Имя: {{item.name}}</h5>
        <h5>Телефон: {{item.phone}}</h5>
      </div>
      <p class="mb-3 mt-3">Комментарий: {{item.comment}}</p>
      <table class="mt-2 table table-sm table-striped" v-if="getNewOrders">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Название</th>
          <th scope="col">Цена, шт.</th>
          <th scope="col">В заказе, шт</th>
          <th scope="col">Сумма</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in item.newOrder" :key="product.id">
          <td>{{index}}</td>
          <td>{{product.name}}</td>
          <td>{{product.price | getNicePrice}}</td>
          <td>{{product.amount}}</td>
          <td>{{product.totalSum | getNicePrice}}</td>
        </tr>
        <tr>
          <td colspan="2"><button class="btn btn-danger btn-sm" @click="removeOrder(item.id)">&times;</button></td>
          <td colspan="2" class="text-right">Итого на сумму:</td>
          <td>{{item.total | getNicePrice}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNicePrice } from '@/utils'

export default {
  name: 'VNewOrders',
  computed: {
    ...mapGetters(['getNewOrders', 'getIsAdmin'])
  },
  filters: {
    getNicePrice (price) {
      return getNicePrice(price)
    }
  },
  created () {
    this.$socket.emit('getNewOrders')
  },
  methods: {
    removeOrder (id) {
      this.$socket.emit('removeOrder', id, (msg) => {
        if (msg === 'ok') {
          console.log('Заказ удален')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
