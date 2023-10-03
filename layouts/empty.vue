<template>
  <v-app :style="style">
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Theme from '~/constants/theme'
export default {
  middleware: ['authenticate'],
  data() {
    return {
      themeItems: Theme
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    style() {
      if (this.$vuetify.theme.dark) {
        return { background: '#16222C' }
      } else {
        return { background: '#FFF' }
      }
    }
  },
  beforeMount() {
    // eslint-disable-next-line import/no-named-as-default-member
    Vue.nextTick(function () {
      Vue.prototype.$isIOS = navigator
        ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        : ''
    })
  },
  mounted() {
    if (this.$auth.loggedIn) {
      const themeValue = this.themeItems.find(
        (item) => item.value === this.$auth.$state.user.theme
      ).value
      this.changeAppTheme(themeValue === 2 || themeValue === 3)
      setTimeout(() => {
        this.$vuetify.theme.dark = themeValue === 2 || themeValue === 3
      }, 50)
    }
  },
}
</script>

<style lang="scss" scoped></style>
