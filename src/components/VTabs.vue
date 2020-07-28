<template>
  <div class="nav nav-tabs">
    <li class="nav-item" v-for="tab in tabs" :key="tab.id" @click="secCurrentTab(tab)">
      <a class="nav-link" :class="{active: tab.id === currentTab.id}" href="#">{{tab.name}}</a>
    </li>
  </div>
</template>

<script>
export default {
  name: 'VTabs',
  data: () => ({
    currentTab: {}
  }),
  props: {
    tabs: {
      type: Array,
      default: () => ([]),
      required: true
    },
    defaultTabId: String
  },
  created () {
    if (this.defaultTabId) {
      this.currentTab = this.tabs.find(el => el.id === this.defaultTabId)
      this.$emit('changeTab', this.currentTab)
    }
  },
  methods: {
    secCurrentTab (tab) {
      this.currentTab = tab
      this.$emit('changeTab', tab)
    }
  }
}
</script>

<style scoped>

</style>
