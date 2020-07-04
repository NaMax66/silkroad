<template>
  <table class="table table-sm table-striped" v-if="columns.length">
    <thead>
    <tr>
      <th scope="col" v-for="(col, i) in columns" :key="i">
        {{col}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, index) in productList.list" :key="product.id">
      <td>{{index}}</td>
      <td>
        <input class="w-100 border-0 bg-transparent" type="text" v-model="product.name" @input="handleInput">
      </td>
      <td class="v-table_price">
        <input class="w-100 border-0 bg-transparent" type="text" v-model="product.price" @input="handleInput">
      </td>
      <td class="v-table_pack">
        <input class="w-100 border-0 bg-transparent" type="text" v-model="product.packageAmount" @input="handleInput">
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'VTable',
  data: () => ({
    productList: []
  }),
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['getNewPrice'])
  },
  created () {
    this.initPrice()
    this.productList = this.getNewPrice
  },
  methods: {
    ...mapMutations(['initPrice', 'saveToLocal']),
    handleInput () {
      this.saveToLocal(this.productList)
    }
  }
}
</script>

<style scoped>
.v-table_price,
.v-table_pack {
  width: 60px;
  @media (min-width: 500px) {
    width: 80px;
  }
  @media (min-width: 900px) {
    width: 160px;
  }
}
</style>
