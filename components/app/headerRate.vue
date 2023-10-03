<template>
  <div class="black--text">
    <div
      v-if="title"
      :class="`
        ${computedClass}-text
        app-body-small-bold 
        d-flex
        justify-center
        align-center
        px-2
      `"
      :style="{ color: computedColor }"
    >
      <div class="black--text mx-3">
        {{ title }}
      </div>
    </div>
    <v-sheet v-if="rated" :class="`${computedClass}-rate`" :color="computedColor" rounded />
    <div
      v-if="rated"
      :class="`
        ${computedClass}-rate-text
        app-body-small
        d-flex
        justify-center
        align-center
      `"
    >
      <v-rating
        :value="ratingAvg"
        background-color="black"
        color="black"
        dense
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half-full"
        half-increments
        hover
        readonly
        size="10"
      />
      {{ ratingCount }}
    </div>
    <v-sheet v-if="bar" :class="`${computedClass}-bar`" :color="computedColor" />
  </div>
</template>

<script>
export default {
  name: 'HeaderRate',
  props: {
    color: { type: String, default: 'broker' },
    title: { type: String, default: null },
    rate: { type: Number, default: 30 },
    ratingCount: { type: Number, default: 0 },
    ratingAvg: { type: Number, default: 0 },
    full: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    rated: { type: Boolean, default: true },
    bar: { type: Boolean, default: true }
  },
  computed: {
    computedClass() {
      if (this.full) {
        return 'headerFull'
      }
      return 'header'
    },
    computedColor() {
      if (this.disabled) {
        return 'expired'
      } else {
        return this.color
      }
    }
  }
}
</script>
