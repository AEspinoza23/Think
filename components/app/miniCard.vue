<template>
  <v-card width="162" height="156" color="card" class="cardStyle mt-5">
    <v-img width="142" height="124" :src="img" class="imgStyle" />
    <v-card-title class="textStyle">
      <span class="app-body-large-bold">{{ title }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'MiniCard',
  props: {
    title: { type: String, default: 'Seguro Hogar' },
    img: { type: String, default: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' }
  }
}
</script>

<style lang="scss" scoped>
.cardStyle {
  border-radius: 10px !important;
}

.imgStyle {
  border-radius: 10px !important;
  left: 10px;
  bottom: 18px;
}

.textStyle {
  position: absolute;
  bottom: 0;
  left: 14px;
}
</style>
