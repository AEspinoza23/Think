<template>
  <div 
    v-if="activeStep < 3" 
    :style="activeStep === 1?       
    { body: { 'overflow': 'hidden' } } : {}"
  >
    <v-row no-gutters>
      <v-col cols="auto">
        <menu-sale-steps 
          :active="activeStep" 
          :style="activeStep === 1? 
            $isIOS? { position: 'fixed', top: '8%' , 'z-index': 1 } 
            : {position: 'fixed', top: '4%' , 'z-index': 1}
          : {}" 
        />
      </v-col>
    </v-row>
    <menu-sale-qr-scan 
      v-if="activeStep === 1" 
      @next="nextStep" 
    />
    <menu-sale-details 
      v-else-if="activeStep === 2" 
      @next="nextStep"
      @finish="finishPayment"
    />
  </div>
  <div v-else>
    <menu-sale-success v-if="success" />
    <menu-sale-error v-else :error="error" @retry="activeStep = 1" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MakeSale',
  layout: 'app',
  auth: true,
  data: () => ({
    activeStep: 1,
    success: false,
    error: ''
  }),
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    })
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
      changeDialogValue: 'app/changeDialogValue'
    }),
    nextStep() {
      this.activeStep++;
    },
    finishPayment(val) {
      this.success = val.success;
      if (!val.success) {
        this.error = val.data.details || val.data.sale_token || '';
      }
      this.activeStep++;
    }
  }
}
</script>