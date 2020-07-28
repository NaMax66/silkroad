<template>
  <div class="container">
    <div class="d-flex flex-wrap">
      <div class="card" v-for="news in getNews" :key="news.id">
        <div class="card-body">
          <h5 class="card-title">{{news.title}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{news.subTitle}}</h6>
          <p class="card-text">{{news.text}}</p>
          <a v-if="news.link" :href="news.link" class="card-link">{{news.linkTxt}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
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
  .card {
    flex-basis: calc(50% - 20px);
    margin: 10px;
    @media (max-width: 800px) {
      flex-basis: calc(100% - 20px);
    }
  }
</style>
