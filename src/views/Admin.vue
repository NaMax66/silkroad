<template>
  <div class="container mb-5">
    <form class="col-lg-4" v-if="!getIsAdmin">
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          :placeholder="$t('admin.passwordPlaceholder')"
        >
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">{{$t('admin.enter')}}</button>
    </form>
    <v-table ref="table" v-if="getIsAdmin" @save="sendToServer" @dataChanged="isActionBtnActive = true"/>
    <button v-if="getIsAdmin" :class="{'btn-danger': isActionBtnActive, 'btn-light': !isActionBtnActive}" class="btn fixed-bottom mb-2 ml-2" @click="sendToServer">{{$t('save')}}</button>
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
    isActionBtnActive: false
  }),
  computed: {
    ...mapGetters(['getNewPrice', 'getIsAdmin'])
  },
  beforeDestroy () {
    this.sendToServer()
  },
  methods: {
    ...mapActions(['setAdmin']),
    checkPass () {
      // todo хранить пароль на сервере. Добавлять пользователя в список админов и отправлять сообщения о новых заказах только ему
      if (this.password === 'salam') {
        this.setAdmin()
      }
    },
    sendToServer () {
      this.isActionBtnActive = false
      this.$socket.emit('updatePrice', this.getNewPrice, msg => {
        console.log(msg)
      })
    }
  }
}

</script>
