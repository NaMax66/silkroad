<template>
  <div id="app">
    <div id="nav" class="container">
      <router-link to="/">Главная</router-link> <span>|</span>
      <router-link to="/order">Заказать</router-link> <span>|</span>
      <router-link to="/admin">Админ</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 120rem;
}

#nav {
  padding: 3rem;
  &  a {
    font-weight: bold;
    color: #2c3e50;
  }
  & a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
