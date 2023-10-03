<template>
  <div>
    <v-row no-gutters>
      <v-col cols="auto">
        <menu-sale-qr-code-steps 
          :active="activeStep" 
        />
      </v-col>
    </v-row>
    <menu-sale-amount v-if="activeStep === 1" @next="nextStep"/>
    <menu-sale-qr-code v-else-if="activeStep === 2" @next="nextStep"  @prev="prevStep"/>
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
    success: false
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
      title: 'Realizar Venta',
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
    prevStep() {
      this.activeStep--;
    }
  }
}
</script>
<style scoped>
.click {
  cursor: pointer;
}
</style>
