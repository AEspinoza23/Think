<template>
  <v-row no-gutters>
    <v-card
      :width="$vuetify.breakpoint.width"
      color="backColor"
      class="mx-2 rounded-lg shades-general mb-6"
    >
      <v-row no-gutters justify="center">
        <v-col cols="auto" class="app-body-small text-center my-4">
          Revisa que todo está correcto para aceptar el pago. 
        </v-col>
        <v-col cols="auto" class="app-body-small text-center">
          El saldo se descontará de tu cuenta Piensa.
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mt-5 mb-1">
        <v-col cols="auto">
          <v-avatar rounded="lg" size="100">
            <v-img 
              v-if="getPurchaseInfo.commerce.avatar" 
              :lazy-src="getPurchaseInfo.commerce.avatar.image_xs" 
              :src="getPurchaseInfo.commerce.avatar.image_400" 
              alt="Imagen comercio" 
            />
            <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto" class="app-body-large-bold">
          {{ getPurchaseInfo.commerce.store_name || getPurchaseInfo.commerce.social_reason }}
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto" class="app-body-large-bold">
          {{ getPurchaseInfo.commerce.commerce_type.name }}
        </v-col>
      </v-row>
      <v-divider class="mt-10"></v-divider>
      <v-row no-gutters justify="space-between" class="mb-7 mt-5 mx-4">
        <v-col cols="auto">
          <div class="app-body-large">Concepto</div>
          <div class="app-body-large-bold">{{ getPurchaseInfo.description }}</div>
          <div class="app-body-large-bold">Ref. {{ purchaseNumber }}</div>
        </v-col>
        <v-col cols="auto" class="d-flex align-end app-body-large">
          {{ getPurchaseInfo.amount | appCurrency }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters justify="space-between" class="mt-7 mb-10 mx-4">
        <v-col cols="auto" class="app-body-large-bold">
          Total
        </v-col>
        <v-col cols="auto" class="app-body-large">
          {{ getPurchaseInfo.amount | appCurrency }}
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="my-5">
        <v-col cols="auto" class="app-body-large-bold">
          <app-btn :loading="loading" size="medium" @click="sendPayment">
            Pagar
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MakeSaleDetails',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      getPurchaseInfo: "user/getPurchaseInfo"
    }),
    purchaseNumber() {
      let width = 7
      if (this.getPurchaseInfo.id !== undefined) {
        const number = this.getPurchaseInfo.id
        width -= number.toString().length
        if (width > 0) {
          return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number
        }
        return number + '' // siempre devuelve tipo cadena
      }
      return '0000000'
    },
  },
  methods: {
    ...mapActions({
      payWithBalance: "user/payWithBalance"
    }),
    async sendPayment() {
      this.loading = true;
      // eslint-disable-next-line camelcase
      const sale_token = this.getPurchaseInfo.sale_token;
      const response = await this.payWithBalance({sale_token});
      this.$emit('finish', response);
      this.loading = false;
    }
  }
}
</script>