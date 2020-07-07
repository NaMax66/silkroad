<template>
  <div class="container" v-if="getIsAdmin">
    <div class="mt-3" v-for="item in getNewOrders" :key="item.id">
      <h5>Имя: {{item.name}}</h5>
      <h5>Телефон: {{item.phone}}</h5>
      <h5>Сумма заказа: {{item.total}}</h5>
      <p>Комментарий: {{item.comment}}</p>
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
        <tr v-for="product in item.newOrder" :key="product.id">
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.amount}}</td>
          <td>{{product.amount}}</td>
          <td>{{product.totalSum}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VNewOrders',
  computed: {
    ...mapGetters(['getNewOrders', 'getIsAdmin'])
  },
  created () {
    this.$socket.emit('getNewOrders')
  }
}
</script>

<style scoped>

</style>
