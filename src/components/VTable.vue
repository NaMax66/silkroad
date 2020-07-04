<template>
  <div>
    <div v-if="isFetching" class="text-center p-2">
      <div class="spinner-border" role="status">
        <span class="sr-only">Подождите...</span>
      </div>
    </div>
    <table class="table table-sm table-striped" v-if="columns.length && productList && !isFetching">
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
      <tr>
        <td>new</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.name" @input="handleInput">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.price" @input="handleInput">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.packageAmount" @input="handleInput">
        </td>
        <td><button class="btn btn-success btn-sm" @click="handleAdd">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'VTable',
  data: () => ({
    isFetching: false,
    productList: {},
    newProduct: {
      id: null,
      name: '',
      price: 0,
      packageAmount: 0
    }
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
  watch: {
    getNewPrice () {
      this.productList = this.getNewPrice
    }
  },
  async created () {
    this.isFetching = true
    await this.initPrice()
    this.isFetching = false
  },
  methods: {
    ...mapMutations(['initPrice', 'saveToLocal', 'addNewProduct']),
    handleInput () {
      this.saveToLocal(this.productList)
    },
    handleAdd () {
      const product = Object.assign({}, this.newProduct)
      this.newProduct = {
        id: null,
        name: '',
        price: 0,
        packageAmount: 0
      }
      this.addNewProduct(product)
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
