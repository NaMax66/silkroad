<template>
  <div class="container">
    <form class="col-lg-4" v-if="!authorized">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">Войти</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  data: () => ({
    authorized: false
  }),
  methods: {
    checkPass () {
      if (this.password === 'salam') {
        this.authorized = true
      }
    }
  }
}

</script>
