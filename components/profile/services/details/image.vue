<template>
  <div :style="{ 'margin-top': '-40px' }">
    <v-img :lazy-src="image" :src="image" height="170px">
      <app-headerRate
        v-if="!showHeader"
        :bar="false"
        :color="serviceColor"
        :rated="false"
        :title="serviceTitle"
        full
      />
      <div 
        :class="`layer`" 
        :style="{ background: imgColor }"
      >
        <app-headerRate
          v-if="showHeader"
          :bar="false"
          :color="serviceColor"
          :rated="false"
          :title="serviceTitle"
          full
        />
      </div>
    </v-img>
  </div>
</template>

<script>
import OfferStatus from '~/constants/offers'
export default {
  name: 'ServiceImage',
  props: {
    service: { type: Object, default: () => {} },
    image: { type: String, default: '' }
  },
  data: () => ({
    status: OfferStatus
  }), 
  computed: {
    serviceTitle() {
      return this.service?.offer.service.title
    },
    serviceColor() {
      return this.service?.offer?.service?.color
    },
    imgColor() {
      if (
      this.service.status === this.status.EXPIRED.val 
      || 
      this.service.status === this.status.CANCELED.val
      ) {
        return '#B7B6BC';
      } else {
        return '';
      }
    },
    showHeader() {
      if (
      this.service.status === this.status.EXPIRED.val 
      || 
      this.service.status === this.status.CANCELED.val
      ) {
        return true;
      } else {
        return false;
      }
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
</style>