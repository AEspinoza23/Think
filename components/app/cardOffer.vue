<template>
  <v-card
    :min-width="small ? '162' : '200'"
    :max-width="small ? '162' : '200'"
    color="card"
    class="rounded-lg shades-services"
    height="380"
    :style="{
      'border': '1px solid #00BBBF !important',
      'border-top': '2px solid #00BBBF !important',
    }"
  >
    <v-row no-gutters justify="center">
      <v-card class="rounded-lg rounded-b-0" elevation="0">
        <v-img lazy-loading :lazy-src="imageSrc" :src="imageSrc" :style="computedImg">
          <app-headerRate
            :color="color"
            :disabled="disabled"
            :rating-avg="ratingAvg"
            :rating-count="ratingCount"
            :rated="true"
            :small="small"
            :title="serviceTitle"
          />
        </v-img>
      </v-card>
    </v-row>
    <v-row justify="start" class="mt-3 pl-2">
      <v-col class="py-0">
        <span class="app-body-medium-bold title--text">
          {{ title }}
        </span>
      </v-col>
    </v-row>
    <v-row v-if="discount || discount != 0" justify="start" class="mt-3 pl-2">
      <v-col cols="auto" class="pa-0 ml-3">
        <span class="app-display-2-bold "> 
          {{ totalPrice | appCurrency }}
        </span>
      </v-col>
      <v-col cols="auto" class="pa-0 ml-1">
        <span class="app-body-small-bold secondary--text text-decoration-line-through"> 
          {{ price | appCurrency }}
        </span>
      </v-col>
    </v-row>
    <v-row v-else justify="start" class="mt-3 pl-2">
      <v-col class="py-0">
        <span class="app-display-2-bold "> 
          {{ price | appCurrency }}
        </span>
      </v-col>
    </v-row>
    <v-row class="mt-3 pl-2" no-gutters>
      <v-col class="py-0" cols="auto">
        <vue-js-countdown :deadline="endDateReturn">
          <template #default="{ days, hours, minutes }">
            <span :class="`${expiredColor(hours, days)} app-body-small-bold mr-1`">
              {{ timeLeft(days, hours, minutes) }}
            </span>
          </template>
        </vue-js-countdown>
      </v-col>
      <v-col v-if="discountType === 1" cols="auto" class="pa-0 ml-1">
        <span class="app-body-small-bold secondary--text"> 
          ¡ Ahorras {{ totalDiscount | appCurrency }}!
        </span>
      </v-col>
      <v-col v-if="discountType === 2" cols="auto" class="pa-0 ml-1">
        <span class="app-body-small-bold secondary--text"> 
          ¡ Ahorras un {{ parseFloat(discount).toFixed(2) }}%!
        </span>
      </v-col>
    </v-row>
    <v-row class="pl-2" no-gutters>
      <v-col class="pb-2">
        <div 
          class="app-body-large-bold"
          :style="{'word-break': 'normal'}"
        >
          {{ subtitle }}
        </div>
      </v-col>
    </v-row>
    <v-row class="pl-2" no-gutters>
      <v-col class="py-0 pr-3" cols="auto">
        <div
          class="app-body-small pb-0"
          :style="{'word-break': 'normal'}"
        >
          {{ description | shortenWord(small ? 40 : 45) }}
        </div>
      </v-col>
    </v-row>
    <v-row
      class="pb-3 mt-4"
      no-gutters 
      justify="center"
    >
      <v-col cols="auto">
        <app-btn :disabled="disabled" size="x-small" @click="$emit('contact')">
          <span class="app-body-medium-bold"> !Contratar ya¡ </span>
        </app-btn>
      </v-col>
      <v-col cols="auto" class="my-2">
        <app-btn :disabled="disabled" outlined size="x-small" @click="$emit('study')">
          <span class="app-body-small-bold"> Solicitar estudio </span>
        </app-btn>
      </v-col>
      <v-col cols="auto">
        <app-btn :disabled="disabled" text size="x-small" @click="$emit('setOffer')">
          <span class="app-body-medium-bold"> Ver más </span>
        </app-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import VueJsCountdown from '~/components/vuejs-countdown'

export default {
  name: 'CardOffer',
  components: { VueJsCountdown },

  props: {
    price: { type: [Number, String], default: 0 },
    discount: { type: [Number, String], default: null },
    description: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    img: { type: String, default: '' },
    color: { type: String, default: 'broker' },
    serviceTitle: { type: String, default: 'broker' },
    small: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    future: { type: Boolean, default: false },
    discountType: { type: Number, default: 1 },
    startDate: {
      type: [String, Date],
      default: () => {
        return new Date()
      }
    },
    endDate: {
      type: [String, Date],
      default: () => {
        return new Date()
      }
    },
    ratingCount: { type: Number, default: 1 },
    ratingAvg: { type: Number, default: 1 },
    offer: { type: Object, default: () => {}}
  },
  computed: {
    totalPrice() {
      let value = 0;
      const original = parseFloat(this.price);
      const discount = parseFloat(this.discount);
       if (this.discountType === 1 ) {
        value = original - discount;
      } else if  (this.discountType === 2 ) {
        value = original * discount / 100;
        value = original - value; 
      }
      return value
    },
    totalDiscount() {
      let value = 0;
      const original = parseFloat(this.price);
      const discount = parseFloat(this.discount);
       if (this.discountType === 1 ) {
        value = discount;
      } else if  (this.discountType === 2 ) {
        value = original * discount / 100;
      }
      return value
    },
    endDateReturn() {
      return this.endDate;
    },
    computedImg() {
      if (this.small) {
        if (this.disabled) {
          return {
            'min-width': '159px',
            'min-height': '83px',
            'max-width': '159px',
            'max-height': '83px',
            'margin-top': '-1px',
            filter: 'grayscale(100%)'
          }
        }
        return {
          'min-width': '160px',
          'min-height': '84px',
          'max-width': '160px',
          'max-height': '84px',
          'margin-top': '-1px'
        }
      } else {
        if (this.disabled) {
          return {
            'min-width': '198px',
            'min-height': '92px',
            'max-width': '198px',
            'max-height': '92px',
            'margin-top': '-1px',
            filter: 'grayscale(100%)'
          }
        }
        return {
          'min-width': '198px',
          'min-height': '92px',
          'max-width': '198px',
          'max-height': '92px',
          'margin-top': '-1px'
        }
      }
    },
    computedColor() {
      if (this.disabled) {
        return 'expired--text'
      } else {
        return ''
      }
    },
    computedColorCustom() {
      if (this.disabled) {
        return 'expired--text'
      } else {
        return 'customText--text'
      }
    },
    imageSrc() {
      if (this.offer) {
        if (this.offer.image) {
          return this.offer.image.image_400
        } else if (this.offer) {
          if (this.offer.service_category) {
            if (this.offer.service_category.image) {
              if (this.offer.service_category.image.image_400 !== null) {
                return this.offer.service_category.image.image_400  
              } else {
                return this.offer.service_category.image.svg  
              }
            } else {
              return ''
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    expiredColor(hours, days) {
      if (days > 0) {
        return 'green--text';
      } else if (hours <= 6) {
        return 'red--text'
      } else if (hours < 12) {
        return 'orange--text'
      } else if (hours >= 12) {
        return 'green--text'
      } else {
        return ''
      }
    },
    timeLeft(days, hours, minutes) {
      if (days > 365) {
        return `${days}d`
      } else if (days === 0 && hours <= 24) {
        return `${hours}h${minutes}min`
      } else if (days < 365) {
        return `${days}d`
      } else {
        return ''
      }
    },
  }
}
</script>
