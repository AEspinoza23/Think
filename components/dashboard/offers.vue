<template>
  <div>
    <!--    <v-row class="my-1" no-gutters>-->
    <!--      <v-card :width="$vuetify.breakpoint.width" class="rounded-lg py-0 shades-general card">-->
    <!--        <offers-top-current-offer :title="$t('dashboard.selected')" />-->
    <!--      </v-card>-->
    <!--    </v-row>-->
    <v-row class="my-2" no-gutters>
      <v-card :width="$vuetify.breakpoint.width" class="rounded-lg py-0 shades-general backColor">
        <app-skeleton-offer v-if="loadingToday" class="pt-5" />
        <offers-top-current-offer 
          v-else-if="!loadingToday && offersToday.length" 
          :offers="offersToday" 
          :title="'Ofertas recomendadas para ti'"
        />
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TopOffers',
  data() {
    return {
      offersToday: [],
      loadingToday: false,
    }
  },
  async mounted() {
    this.loadingToday = true

    const resultToday = await this.offersListAction('current_offer_today');
    this.offersToday = resultToday.success ? resultToday.data : [];
    this.loadingToday = false;
  },
  methods: {
    ...mapActions({
      offersListAction: 'offers/getOffersList'
    })
  }
}
</script>

<style scoped></style>
