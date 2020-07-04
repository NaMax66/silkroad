<template>
  <div class="container">
    <form class="col-lg-4" v-if="!authorized">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">Войти</button>
    </form>
    <v-table v-if="authorized" :columns="tableColumns" />
  </div>
</template>
<script>
import VTable from '@/components/VTable'
export default {
  name: 'Admin',
  components: {
    VTable
  },
  data: () => ({
    password: '',
    authorized: true,
    tableColumns: ['№', 'Название', 'Цена, шт', 'Мин. кол-во']
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
