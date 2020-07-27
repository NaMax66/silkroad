<template>
  <div id="app">
    <div id="nav" class="mb-5">
      <div class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!-- todo убрать главную, сделать news -->
            <router-link class="nav-link" to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/order">Заказать</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Админ</router-link>
          </li>
          <li class="nav-item" v-if="getIsAdmin">
            <router-link class="nav-link" to="/new_orders">Новые заказы</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getIsAdmin'])
  }
}
</script>
<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  &  a {
    font-weight: bold;
    color: #2c3e50;
  }
  & a.router-link-exact-active {
    color: #dc3545;
  }
}
</style>
