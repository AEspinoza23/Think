<template>
  <v-row no-gutters>
    <v-card
      class="pa-0 ma-0 rounded-lg shades-general"
      :width="$vuetify.breakpoint.width" 
      :height="$vuetify.breakpoint.height"
      color="backColor"
    >
      <app-loading v-if="loading" :style="{ 'margin-top': '60%'}"></app-loading>
      <client-only>
        <qrcode-stream v-if="!loading" :track="paintBoundingBox" @decode="onDecode" @init="onInit">
        </qrcode-stream>
      </client-only>
    </v-card>
    <menu-sale-no-services :dialog="dialog" @close="dialog = false" />
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'MakeSaleScan',
  data: () => ({
    loading: false,
    dialog: false
  }),
  computed: {
    activeServices() {
      const services = this.$auth.$state.user.contracted_offers;
      let status = 0;
      services.forEach(element => {
        if (element.status === 1) {
          status = 1
        }
      });
      return status === 1; 
    }
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Realizar compra',
      isNotification: true,
      isBack: true
    }, true)
  },
  methods: {
    ...mapActions({
      readPurchase: 'user/readPurchase'
    }),
    async onDecode (result) {
      if (this.$auth.$state.user.contracted_offers.length === 0 || !this.activeServices) {
        this.dialog = true;
      } else {
        const getInfo = JSON.parse(result);
        this.loading = true;
        const { success, data } = await this.readPurchase(getInfo);
        this.loading = false;
        if (success) {
          this.$emit('next');
        } else {
          this.$flash({
            message: data.detail,
            color: 'error',
            type: 'error'
          })
        }
      }
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    paintBoundingBox (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox: { x, y, width, height } } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },
  }
}
</script>