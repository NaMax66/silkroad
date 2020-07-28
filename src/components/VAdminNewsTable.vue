<template>
  <table class="table table-sm table-striped" v-if="productList">
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
export default {
  name: 'VAdminNewsTable'
}
</script>

<style scoped>

</style>
