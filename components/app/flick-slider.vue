<template>
  <!--  <Flicking-->
  <!--    :options="{-->
  <!--      circular: false,-->
  <!--      align: 'prev',-->
  <!--      horizontal: true,-->
  <!--      easing: (x) => 1 - Math.pow(1 - x, 3)-->
  <!--    }"-->
  <!--  >-->
  <!--    <slot />-->
  <!--  </Flicking>-->
  <div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="i in 4" :key="i" class="black--text">Slide {{ i }}</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'TinySlider',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<!-- esto inhabilita los desplazamientos durante el touch en mobile -->
<!-- https://developers.google.com/web/updates/2017/01/scrolling-intervention -->
<style lang="scss">
.no-scroll-touch {
  -ms-touch-action: pan-y;
  touch-action: pan-y;
}
</style>
