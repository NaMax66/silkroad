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
        <th scope="col">В упак, шт</th>
        <th scope="col">Цена упак</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in getPrice.list" :key="product.id">
        <th scope="row">{{index}}</th>
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.packageAmount}}</td>
        <td>{{getPackagePrice(product.price, product.packageAmount)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Admin',
  data: () => ({
    authorized: true
  }),
  computed: {
    ...mapGetters(['getPrice'])
  },
  created () {
    this.initPrice()
  },
  methods: {
    ...mapMutations(['initPrice']),
    checkPass () {
      if (this.password === 'salam') {
        this.authorized = true
      }
    },
    getPackagePrice (price, amount) {
      return price * amount
    }
  }
}

</script>
