<template>
  <div class="splash fill-height d-flex align-center justify-center">
    <div id="splash" class="splash--animation" />
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'Splash',
  data() {
    return {}
  },
  watch: {},
  mounted() {
    const animationData = require('~/assets/logoAnimation.json')
    const clonedeep = require('lodash.clonedeep')
    const animation = lottie.loadAnimation({
      container: document.getElementById('splash'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: clonedeep(animationData)
    })

    setTimeout(() => {
      this.$emit('finish', false)
    }, animation.getDuration() * 800)
  }
}
</script>
<style lang="scss">
.splash {
  background: #00bbbf;
  background: linear-gradient(89.87deg, #007073 5.54%, #80DDDF 107.76%);
  background: -webkit-linear-gradient(89.87deg, #007073 5.54%, #80DDDF 107.76%);
  background: -moz-linear-gradient(89.87deg, #007073 5.54%, #80DDDF 107.76%);
  height: 100vh;

  &--animation {
    width: 195.69px;
    height: 123.69px;
  }
}
</style>
