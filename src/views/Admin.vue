<template>
  <div class="container">
    <form class="col-lg-4">
      <div class="form-group">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button type="submit" class="btn btn-danger">Войти</button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Admin',
  data: () => ({
    authorized: false,
    password: 'salam'
  }),
  computed: {
    ...mapGetters(['getPrice'])
  },
  created () {
    this.initPrice()
  },
  methods: {
    ...mapMutations(['initPrice'])
  }
}

</script>
