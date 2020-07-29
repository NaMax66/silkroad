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
    <tbody>
    <tr class="v-table_product" v-for="(news, index) in newsList" :key="news.id">
      <td>{{index}}</td>
      <td>
        <input class="w-100 bg-transparent" type="text" v-model="news.title" @input="handleInput">
      </td>
      <td class="v-table_price">
        <input class="w-100 bg-transparent" type="text" v-model="news.subTitle" @input="handleInput">
      </td>
      <td class="v-table_pack v-admin-table_text">
        <textarea class="w-100 bg-transparent" type="text" v-model="news.text" @input="handleInput"></textarea>
      </td>
      <td class="v-table_pack">
        <input class="w-100 bg-transparent" type="text" v-model="news.link" @input="handleInput">
      </td>
      <td class="v-table_pack">
        <input class="w-100 bg-transparent" type="text" v-model="news.linkTxt" @input="handleInput">
      </td>
      <td><button class="v-table_remove_btn btn btn-danger btn-sm" @click="removeItem(news.id)">&times;</button></td>
    </tr>
    <tr>
      <td>*</td>
      <td>
        <input class="w-100 bg-transparent" type="text" v-model="newNews.title" @input="handleInput">
      </td>
      <td class="v-table_price">
        <input class="w-100 bg-transparent" type="text" v-model="newNews.subTitle" @input="handleInput">
      </td>
      <td class="v-table_pack v-admin-table_text">
        <textarea class="w-100 bg-transparent" type="text" v-model="newNews.text" @input="handleInput"></textarea>
      </td>
      <td class="v-table_pack">
        <input class="w-100 bg-transparent" type="text" v-model="newNews.link" @input="handleInput">
      </td>
      <td class="v-table_pack">
        <input class="w-100 bg-transparent" type="text" v-model="newNews.linkTxt" @input="handleInput">
      </td>
      <td><button class="btn btn-success btn-sm" @click="handleAdd">+</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'VAdminNewsTable',
  data: () => ({
    newsList: null,
    newNews: {
      id: null,
      title: '',
      subTitle: '',
      text: '',
      link: '',
      linkTxt: ''
    }
  }),
  computed: {
    ...mapGetters(['getNews'])
  },
  methods: {
    ...mapMutations(['setNews']),
    setList () {
      this.newsList = this.getNews
    },
    handleInput () {
      this.$emit('save', this.newsList)
    },
    removeItem (id) {
      this.newsList = this.newsList.filter(el => el.id !== id)
      this.$emit('save', this.newsList)
    },
    handleAdd () {
      this.newNews.id = uuidv4()
      const news = Object.assign({}, this.newNews)
      this.newsList.push(news)
      this.newNews = {
        id: null,
        title: '',
        subTitle: '',
        text: '',
        link: '',
        linkTxt: ''
      }
      this.$emit('save', this.newsList)
    }
  },
  created () {
    this.$socket.emit('getNews', null, (data) => {
      this.setNews(data)
      this.setList()
    })
  }
}
</script>

<style scoped>
  input {
    border: 1px solid #999;
  }
  .v-admin-table_text {
    width: 25%;
    min-width: 150px;
  }
</style>
