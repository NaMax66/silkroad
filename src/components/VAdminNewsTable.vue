<template>
  <table class="table table-sm table-striped" v-if="getNews">
    <thead>
    <tr>
      <th scope="col" class="border-top-0">{{$t('table.num')}}</th>
      <th scope="col" class="border-top-0">{{$t('table.title')}}</th>
      <th scope="col" class="border-top-0">{{$t('table.subTitle')}}</th>
      <th scope="col" class="border-top-0">{{$t('table.text')}}</th>
      <th scope="col" class="border-top-0">{{$t('table.link')}}</th>
      <th scope="col" class="border-top-0">{{$t('table.linkTxt')}}</th>
    </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'VAdminNewsTable',
  computed: {
    ...mapGetters(['getNews'])
  },
  methods: {
    ...mapMutations(['setNews'])
  },
  created () {
    this.$socket.emit('getNews', null, (data) => {
      this.setNews(data)
    })
  }
}
</script>

<style scoped>

</style>
