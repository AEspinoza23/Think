<template>
  <v-row no-gutters>
    <v-card
      :width="$vuetify.breakpoint.width" 
      color="backColor"
      class="rounded-lg shades-general mx-2 mb-4"
    >
      <v-row no-gutters justify="center" class="my-5">
        <v-col cols="auto" class="app-body-large-bold">
          Aquí tienes tu código QR para realizar la venta.
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="white py-3 mx-5">
        <v-col cols="auto">
          <qr-code :text="codeText"></qr-code>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="my-4">
        <v-col cols="auto">
          <app-btn @click="$emit('prev')">
            Volver
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MakeSaleDetails',
  computed: {
    ...mapGetters({
      newPurchase: 'user/getNewPurchase'
    }),
    codeText() {
      const info = {
        sale_token: this.newPurchase.sale_token
      };
      const text = JSON.stringify(info);
      return text;
    }
  }
}
</script>