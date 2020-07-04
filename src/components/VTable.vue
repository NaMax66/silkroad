<template>
  <table v-if="columns.length">
    <thead>
      <tr>
        <th scope="col" v-for="(col, i) in columns" :key="i">
          {{col}}
        </th>
        <th>Сохранить</th>
      </tr>
    </thead>
    <tbody>
      <tr>

      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'VTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    products: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
