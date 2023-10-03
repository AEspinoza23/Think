<template>
  <v-row no-gutters>
    <v-card
      :width="$vuetify.breakpoint.width" 
      color="backColor"
      class="rounded-lg shades-general mx-2 mb-4 mt-3"
    >
      <v-row no-gutters justify="center" class="mt-4">
        <v-col cols="auto">
          <v-img :src="$assets.error" max-width="153px"></v-img>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="my-7">
        <v-col cols="auto" class="app-heading-1-bold error--text">
          Error en el pago
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto" class="app-body-medium px-4">
          ¡Vaya! {{ $auth.$state.user.first_name }}  {{ $auth.$state.user.middle_name }}, 
          el pago N° {{ purchaseNumber }} con importe de {{ getPurchaseInfo.amount || 0 | appCurrency }} 
          no se ha podido realizar.
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto" class="app-body-medium px-4 mt-2">
          Error: {{ error }}
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mt-7 mb-4">
        <v-col cols="auto">
          <app-btn @click="$emit('retry')">
            Volver a intentar
          </app-btn>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mb-7 mt-4">
        <v-col cols="auto">
          <app-btn outlined :to="localePath('/menu')">
            Cancelar compra
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MakeSaleError',
  props: {
    error: { type: String, default: '' }
  },
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
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Error venta',
      isNotification: true,
      isBack: true
    }, true)
  }
}
</script>