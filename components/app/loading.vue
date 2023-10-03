<template>
  <v-row class="d-flex justify-center">
    <v-col class="pa-5" cols="auto">
      <client-only>
        <vue-lottie :options="defaultOptions" :height="40" :width="40" />
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import loader from '~/assets/icons/lottie_icons/loader.json'
export default {
  props: {
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  data: () => ({
    defaultOptions: { animationData: loader, loop: true },
    animationSpeed: 1
  })
}
</script>

<style lang="scss">
$progress-circular-rotate-dash: 1.4s ease-in-out infinite !default;
</style>
