<template>
  <div class="container">
    <form class="col-lg-4" v-if="!getIsAdmin">
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль">
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">Войти</button>
    </form>
    <v-table v-if="getIsAdmin" :columns="tableColumns" />

    <button  v-if="getIsAdmin" class="btn btn-success mt-2" @click="sendToServer">Сохранить список на сервере</button>
  </div>
</template>
<script>
import VTable from '@/components/VTable'
import { changePrice } from '@/actions'
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
  async created () {
    await this.initPrice()
  },
  methods: {
    ...mapActions(['initPrice', 'setAdmin']),
    checkPass () {
      if (this.password === 'salam') {
        this.setAdmin()
      }
    },
    sendToServer () {
      changePrice(this.getNewPrice)
    }
  }
}

</script>
