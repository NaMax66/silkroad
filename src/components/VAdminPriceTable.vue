<template>
  <div>
    <table class="table table-sm table-striped" v-if="productList">
      <thead>
      <tr>
        <th scope="col" class="border-top-0">{{$t('table.num')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.unitName')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.price')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.total')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="v-table_product" v-for="(product, index) in productList.list" :key="product.id">
        <td>{{index}}</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="product.name" @input="handleInput">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="product.price" @input="handleInput">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="product.packageAmount" @input="handleInput">
        </td>
        <td><button class="v-table_remove_btn btn btn-danger btn-sm" @click="removeItem(product.id)">&times;</button></td>
      </tr>
      <tr>
        <td>*</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.name" @input="handleInput">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="newProduct.price" @input="handleInput">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="newProduct.packageAmount" @input="handleInput">
        </td>
        <td><button class="btn btn-success btn-sm" @click="handleAdd">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'VAdminPriceTable',
  data: () => ({
    productList: {},
    newProduct: {
      id: null,
      name: '',
      price: 0,
      packageAmount: 0
    }
  }),
  computed: {
    ...mapGetters(['getPrice'])
  },
  created () {
    this.$socket.emit('getPrice', null, (data) => {
      this.setPrice(data)
      this.setList()
    })
  },
  methods: {
    ...mapMutations(['setPrice']),
    setList () {
      this.productList = this.getPrice
    },
    removeItem (id) {
      this.productList.list = this.productList.list.filter(el => el.id !== id)
      this.$emit('save', this.productList)
    },
    handleInput () {
      this.$emit('save', this.productList)
    },
    handleAdd () {
      this.newProduct.price = +this.newProduct.price
      this.newProduct.packageAmount = +this.newProduct.packageAmount
      this.newProduct.id = uuidv4()
      const product = Object.assign({}, this.newProduct)
      this.newProduct = {
        id: null,
        name: '',
        price: 0,
        packageAmount: 0
      }
      this.productList.list.push(product)
      this.$emit('save', this.productList)
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
  .v-table_remove_btn {
    visibility: hidden;
  }
  .v-table_product {
    &:hover {
      & .v-table_remove_btn {
        visibility: visible;
      }
    }
  }
</style>
