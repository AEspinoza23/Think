<template>
<!-- eslint-disable vue/no-v-html -->
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card backColor pa-5">
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <span class="app-body-medium-bold">
          {{ company? company.name : '' }}
        </span>
      </v-col>
      <v-col cols="auto">
        <vue-js-countdown :deadline="endDate">
          <template #default="{ days, hours, minutes }">
            <span :class="`${expiredColor(hours)} app-body-small-bold mr-1`">
              {{ timeLeft(days, hours, minutes) }}
            </span>
          </template>
        </vue-js-countdown>
      </v-col>
      <v-col cols="auto">
        <offers-share
          :offer-id="service.offer.id"
          :image="image"
        />
      </v-col>
      <!-- <div class="title--text">
        {{ $t('services.think') }}
      </div> -->
    </v-row>
    <v-row no-gutters class="app-heading-1-bold title--text">
      <v-col cols="auto">
        {{ service.offer.title }}
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="app-display-2-bold title--text mt-1"
      justify="space-between"
    >
      <v-col cols="auto">
        {{ totalPrice | appCurrency }}
      </v-col>
      <v-col cols="auto">
        <span v-if="service.offer.discount_value || service.offer.discount_value != 0">
          <span 
            v-if="service.offer.discount_type === 1"  
            class="title--text midOpacity app-body-large"
          >
            {{ service.offer.discount_value | appCurrency }} descuento
          </span>
          <span 
            v-if="service.offer.discount_type === 2"  
            class="title--text midOpacity app-body-large"
          >
            -{{ parseFloat(service.offer.discount_value).toFixed(2) }}% descuento
          </span>
        </span>
      </v-col>
    </v-row>
    <!-- <v-row 
      v-else-if="service.offer.discount_type === 2" 
      class="app-display-2-bold title--text mt-5"
    >
      {{ parseInt(service.offer.discount_value) }}%
    </v-row> -->
    <v-row>
      <profile-services-details-info-panels :service="service" />
    </v-row>
    <v-row v-if="!seeMore" class="app-body-medium title--text mt-5 px-5">
      <span class="text-truncate" :inner-html.prop="service.offer.details | shortenWord(69)"></span>
    </v-row>
    <v-row v-else class="app-body-medium title--text mt-5 px-5">
      <span v-html="service.offer.details"></span>
    </v-row>
    <v-row 
      v-if="!seeMore && morebtn" 
      class="mt-5"
    >
      <app-btn 
        class="text-decoration-underline" 
        color="primary" 
        text
        @click="seeMore = !seeMore"
      >
        {{ $t('services.seeMore') }}
      </app-btn>
    </v-row>
    <v-row v-if="seeMore" class="mt-5">
      <app-btn 
        class="text-decoration-underline" 
        color="primary" 
        text
        @click="seeMore = !seeMore"
      >
        {{ $t('services.seeLess') }}
      </app-btn>
    </v-row>
    <v-row v-if="service.status === status.CANCELED.val" class="mt-5" justify="center">
      <app-btn :to="localePath('offers-hire')" size="medium">
        {{ $t('services.hireAgain') }}
      </app-btn>
    </v-row>
  </v-card>
</template>

<script>
import VueJsCountdown from '~/components/vuejs-countdown'
import OfferStatus from '~/constants/offers'
export default {
  name: 'ServiceInfo',
  components: { VueJsCountdown },
  props: {
    service: { type: Object, default: () => {} },
    company: { type: Object, default: () => {} },
    disabled: { type: Boolean, default: false },
    image: { type: String, default: '' }
  },
  data: () => ({
    status: OfferStatus,
    seeMore: true
  }), 
  computed: {
    morebtn() {
      if (this.service) {
        const description = this.service.offer.details
        if (this.service.offer.details) {
          return description.length > 100;
        } else {
          return false;
        };
      } else {
        return false;
      }
    },
    endDate() {
      if (this.service) {
        return this.service.contract_end_date;
      } else {
        return new Date();
      }
    },
    totalPrice() {
      let value = 0;
      const original = parseFloat(this.service.offer.original_price);
      const discount = parseFloat(this.service.offer.discount_value);
       if (this.service.offer.discount_type === 1 ) {
        value = original - discount;
      } else if  (this.service.offer.discount_type === 2 ) {
        value = original * discount / 100;
        value = original - value; 
      }
      return value
    }
  },
  methods: {
    //     Si <6h, rojo
    //   Si <12h, naranja
    // Si >12h, verde

    expiredColor(time) {
      if (time <= 6) {
        return 'red--text'
      } else if (time <= 12) {
        return 'orange--text'
      } else if (time > 12) {
        return 'green--text'
      } else {
        return ''
      }
    },
    timeLeft(days, hours, minutes) {
      if (hours <= 24) {
        return `${hours}h${minutes}min`
      } else if (days < 365) {
        return `${days}d`
      } else {
        return ''
      }
    }
  }
}
</script>
