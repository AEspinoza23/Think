<template>
  <div style="display: contents">
    <app-flash />
    <!--    <app-confirm />-->
    <!--    <app-cookies v-if="isCookies" />-->
  </div>
</template>

<script>
export default {
  name: 'AppCommon',
  props: {
    isCookies: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
