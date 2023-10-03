<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card backColor rounded-lg">
    <v-card-title>
      <span class="app-body-small-bold title--text">
        {{ $t('services.savings') }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-row justify="center" no-gutters>
        <profile-services-details-savings-elipse :max="max" :value="value" />
      </v-row>
      <v-row justify="center" no-gutters>
        <span class="text-center">
          <span class="app-body-small-bold">
            {{ $t('services.savingTextOne') }}
            {{ value | appCurrency }}
          </span>
          <span class="app-body-small">
            {{ $t('services.savingTextTwo') }}
            {{ service.original_price | appCurrency }}
            {{ $t('services.savingTextThree') }}
          </span>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ServiceSavings',
  props: {
    service: { type: Object, default: () => ({}) }
  },
  computed: {
    max() {
      return parseFloat(this.service.original_price).toFixed(2)
    },
    value() {
      let value = 0;
      const original = parseFloat(this.service.original_price);
      const discount = parseFloat(this.service.discount_value);
      if (this.service.discount_type === 1 ) {
        value = discount;
      } else if  (this.service.discount_type === 2 ) {
        value = original * discount / 100;  
      }
      return parseFloat(value).toFixed(2);
    },
  }
}
</script>
