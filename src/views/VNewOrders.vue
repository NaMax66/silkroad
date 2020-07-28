<template>
  <div class="container" v-if="getIsAdmin">
    <div class="mt-3 border-bottom" v-for="item in getNewOrders" :key="item.id">
      <div class="d-flex">
        <h5 class="pr-3 text-danger">{{$t('clientName')}}: {{item.name}}</h5>
        <h5 class="pr-3">{{$t('phone')}}: {{item.phone}}</h5>
      </div>
      <p class="mb-1 mt-3">{{$t('comment')}}: {{item.comment}}</p>
      <h6 class="mb-3 text-danger">{{$t('time')}}: {{item.time}}</h6>
      <table class="mt-2 table table-sm table-striped" v-if="getNewOrders">
        <thead>
        <tr>
          <th scope="col">{{$t('table.num')}}</th>
          <th scope="col">{{$t('table.unitName')}}</th>
          <th scope="col">{{$t('table.price')}}</th>
          <th scope="col">{{$t('table.inOrder')}}</th>
          <th scope="col">{{$t('table.total')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in item.newOrder" :key="product.id">
          <td>{{index}}</td>
          <td>{{product.name}}</td>
          <td>{{getNicePrice(product.price)}}</td>
          <td>{{product.amount}}</td>
          <td>{{getNicePrice(product.totalSum)}}</td>
        </tr>
        <tr>
          <td colspan="2"><button class="btn btn-danger btn-sm" @click="removeOrder(item.id)">&times;</button></td>
          <td colspan="2" class="text-right">{{$t('table.superTotal')}}</td>
          <td>{{getNicePrice(item.total)}}</td>
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
  created () {
    this.$socket.emit('getNewOrders')
  },
  methods: {
    getNicePrice (price) {
      return getNicePrice(price, this.$t('currency'))
    },
    removeOrder (id) {
      this.$socket.emit('removeOrder', id, (msg) => {
        console.log(msg)
      })
    }
  }
}
</script>

<style scoped>

</style>
