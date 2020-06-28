<template>
  <div class="container">
    <form class="col-lg-4" v-if="!authorized">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click="checkPass" class="btn btn-danger">Войти</button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Admin',
  data: () => ({
    authorized: false
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
    }
  }
}

</script>
