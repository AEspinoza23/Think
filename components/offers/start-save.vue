<template>
  <v-row class="start-save" no-gutters>
    <v-col cols="auto">
      <v-card
        v-if="!slug"
        :width="$vuetify.breakpoint.width"
        class="rounded-lg shades-small-card backColor"
        color="backColor"
        height="123"
        max-height="123"
      >
        <v-card-title class="py-2">
          <span class="app-heading-1">Empieza a ahorrar</span>
        </v-card-title>
        <v-card-text class="px-0">
          <offers-type-slider :fetch-types="fetchTypes" />
        </v-card-text>
      </v-card>
      <v-img v-else :lazy-src="img" :src="img" height="158px" :width="$vuetify.breakpoint.width">
        <div 
          :class="`layer`" 
          :style="{ background: service.color}"
        ></div>
        <div class="start-save--image--slider-background">
          <offers-type-slider :fetch-types="fetchTypes"/>
        </div>
        <div class="start-save--image--button">
          <v-btn color="#101D25" depressed>
            <span class="app-heading-1-bold white--text">
              {{ slug }}
            </span>
          </v-btn>
        </div>
        <div class="start-save--image--bar">
          <v-sheet :color="service.color" height="5px" width="100vw" />
        </div>
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StartSave',
  props: {
    img: { type: String, default: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
    fetchTypes: { type: Boolean, default: false },
    service: { type: Object, default: () => {} },
  },
  data() {
    return {}
  },
  computed: {
    slug() {
      return this.$route.params.slug
    }
  }
}
</script>

<style lang="scss">
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.start-save {
  &--text {
    text-decoration: none !important;
    color: inherit !important;
  }

  &--image {
    position: relative;

    &--slider-background::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 71px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      opacity: 0.2;
      background-color: white;
    }

    &--button {
      position: absolute;
      top: 60%;
      left: 5%;
    }

    &--bar {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
