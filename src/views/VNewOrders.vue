<template>
  <div>
    <table class="table table-sm table-striped" v-if="getNewOrders">
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
      <tr >
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VNewOrders',
  computed: {
    ...mapGetters(['getNewOrders'])
  },
  created () {
    this.$socket.emit('getNewOrders')
  }
}
</script>

<style scoped>

</style>
