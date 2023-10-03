<template>
  <v-app>
    <v-main>
      <v-container class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <app-common />
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticate'],
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Components',
          to: '/components'
        }
      ]
    }
  },
  head() {
    return this.$nuxtI18nHead()
  }
}
</script>
<style lang="scss"></style>
