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
    <div v-if="getIsAdmin">
      <v-tabs :tabs="controlTabs" default-tab-id="1" @changeTab="changeControlTab" />
      <v-admin-price-table ref="table" @save="sendToServer" @dataChanged="isActionBtnActive = true"/>
      <button :class="{'btn-danger': isActionBtnActive, 'btn-light': !isActionBtnActive}" class="btn fixed-bottom mb-2 ml-2" @click="sendToServer">{{$t('save')}}</button>
    </div>
  </div>
</template>
<script>
import VAdminPriceTable from '@/components/VAdminPriceTable'
import VTabs from '@/components/VTabs'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Admin',
  components: {
    VAdminPriceTable,
    VTabs
  },
  data: () => ({
    password: '',
    isActionBtnActive: false,
    currentTab: null,
    controlTabs: [
      {
        id: '1',
        name: 'price'
      },
      {
        id: '2',
        name: 'news'
      }
    ]
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
    },
    changeControlTab (tab) {
      this.currentTab = tab
    }
  }
}

</script>
