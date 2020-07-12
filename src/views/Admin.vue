<template>
  <div class="container">
    <form class="col-lg-4" v-if="!getIsAdmin">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">Войти</button>
    </form>
    <v-table ref="table" v-if="getIsAdmin" :columns="tableColumns" @save="sendToServer"/>
  </div>
</template>
<script>
import VTable from '@/components/VTable'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Admin',
  components: {
    VTable
  },
  data: () => ({
    password: '',
    tableColumns: ['№', 'Название', 'Цена, шт', 'Мин. кол-во']
  }),
  computed: {
    ...mapGetters(['getNewPrice', 'getIsAdmin'])
  },
  methods: {
    ...mapActions(['setAdmin']),
    checkPass () {
      if (this.password === 'salam') {
        this.setAdmin()
      }
    },
    sendToServer () {
      this.$socket.emit('updatePrice', this.getNewPrice, msg => {
        console.log(msg)
      })
    }
  }
}

</script>
