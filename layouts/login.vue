<template>
  <v-app>
    <v-main class="login-layout">
      <v-container
        fluid
        :class="$isIOS ? 'pt-10' : ''"
        class="login-layout d-flex align-center justify-center"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <app-common />
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  head() {
    return this.$nuxtI18nHead()
  }
}
</script>
<style lang="scss">
.login-layout {
  background: linear-gradient(89.87deg, #007073 5.54%, #80dddf 107.76%) !important;
  overflow: hidden;
  height: 100%;
}
</style>
