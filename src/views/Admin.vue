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
      <v-admin-price-table v-if="currentTab.name === 'price'" @save="sendToServer"/>
      <v-admin-news-table v-if="currentTab.name === 'news'" @save="sendToServer" />
    </div>
  </div>
</template>
<script>
import VAdminPriceTable from '@/components/VAdminPriceTable'
import VAdminNewsTable from '@/components/VAdminNewsTable'
import VTabs from '@/components/VTabs'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Admin',
  components: {
    VAdminPriceTable,
    VAdminNewsTable,
    VTabs
  },
  data: () => ({
    password: '',
    currentTab: {},
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
    ...mapGetters(['getIsAdmin'])
  },
  methods: {
    ...mapActions(['setAdmin']),
    checkPass () {
      /* todo: add authorisation logic to server */
      if (this.password === 'salam') {
        this.setAdmin()
      }
    },
    sendToServer (data) {
      let eventName = ''
      const currentTabName = this.currentTab.name
      if (currentTabName === 'price') {
        eventName = 'updatePrice'
      }
      if (currentTabName === 'news') {
        eventName = 'updateNews'
      }
      this.isActionBtnActive = false
      this.$socket.emit(eventName, data, msg => {
        console.log(msg)
      })
    },
    changeControlTab (tab) {
      this.currentTab = tab
    }
  }
}

</script>
