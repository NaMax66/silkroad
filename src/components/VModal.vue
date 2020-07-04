<template>
  <div :class="{modalBackground: isModalShown}">
    <div class="modal" :class="{'d-block' : isModalShown}" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  props: {
    isModalShown: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
