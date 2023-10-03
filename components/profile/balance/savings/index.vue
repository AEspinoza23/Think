<template>
  <v-row justify="center" class="mb-2">
    <v-card :width="$vuetify.breakpoint.width" class="shades-small-card rounded-lg backColor">
      <v-card-title class="blur-normal">
        <span class="app-heading-1-bold title--text">
          {{ $t('profile.saving') }}
        </span>
      </v-card-title>
      <v-card-text class="blur-normal">
        <v-row justify="center" no-gutters>
          <profile-services-details-savings-elipse 
            :max="data.total_amount"
            :value="data.savings_amount"
          />
        </v-row>
        <v-row justify="center" no-gutters class="mt-3">
          <span class="text-center title--text">
            <span class="app-body-small">
              {{ $t('profile.savingTextOne') }}
            </span>
            <span class="app-body-small-bold">
              {{ $t('profile.savingTextTwo') }}
              {{ percentaje }}%
              
            </span>
            <span class="app-body-small">
              {{ $t('profile.savingTextThree') }}
              100%
              {{ $t('profile.savingTextFour') }}
            </span>
          </span>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'Savings',
  props: {
    data :{ type: Object, default: () => {} }
  },
  computed: {
    percentaje() {
      let percentaje = 0;
      if (this.data.savings_amount > 0 && this.data.total_amount > 0) {
        percentaje = parseInt(this.data.savings_amount * 100 / this.data.total_amount);
      }
      return percentaje;
    }
  }
}
</script>