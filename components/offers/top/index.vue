<template>
  <v-row>
    <v-col class="pt-0">
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 shades-small-card"
        color="backColor"
      >
        <offers-top-current-offer
          v-if="offersToday.length > 0"
          :offers="offersToday"
          :title="'Las Ofertas más TOP de hoy'"
          :loading="loadingToday"
          @fetch="fetchToday"
        />
      </v-card>
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 my-2 shades-small-card"
        color="backColor"
      >
        <offers-top-current-offer
          v-if="offersWeek.length > 0"
          :offers="offersWeek"
          :title="'Las Ofertas más TOP de la semana'"
          :loading="loadingWeek"
          @fetch="fetchWeek"
        />
      </v-card>
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 shades-small-card"
        color="backColor"
      >
        <offers-top-current-offer
          v-if="offersMonth.length > 1"
          :offers="offersMonth"
          :title="'Las Ofertas más TOP del mes'"
          :loading="loadingMonth"
          @fetch="fetchMonth"
        />
      </v-card>
      <v-card
        v-if="!$auth.loggedIn"
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 my-2 shades-small-card"
        color="backColor"
      >
        <v-card-actions>
          <v-row class="my-0">
            <v-col class="d-flex justify-center py-0" cols="12">
              <span class="app-heading-1">¡No te pierdas nada! </span>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
              <v-btn :to="localePath('/register')" color="button-primary">
                <span class="app-body-large-bold white--text"> Regístrate </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TopOffers',
  props: {
    isCategory: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      offersToday: [],
      offersWeek: [],
      offersMonth: [],
      todayNext: null,
      weekNext: null,
      monthNext: null,
      loadingToday: false,
      loadingWeek: false,
      loadingMonth: false
    }
  },
  async mounted() {
    this.loadingToday = true;
    this.loadingWeek = true;
    this.loadingMonth = true;

    const resultToday = await this.offersListAction({top_today: true, length: 10, page: 1});
    this.offersToday = resultToday.success ? resultToday.data : [];
    this.todayNext = resultToday.success ? resultToday.next : null;
    this.loadingToday = false;
    const resultWeek = await this.offersListAction({top_week: true, length: 10, page: 1});
    this.offersWeek = resultWeek.success ? resultWeek.data : [];
    this.weekNext = resultWeek.success ? resultWeek.next : null;
    this.loadingWeek = false;
    const resultMonth = await this.offersListAction({top_month: true, length: 10, page: 1});
    this.offersMonth = resultMonth.success ? resultMonth.data : [];
    this.monthNext = resultMonth.success ? resultMonth.next : [];
    this.loadingMonth = false;
  },
  methods: {
    ...mapActions({
      offersListAction: 'offers/getOffersList',
      getMoreOffers: 'offers/getMoreOffers',
    }),
    async fetchToday() {
      if (this.todayNext && !this.loadingToday) {
        this.loadingToday = true;
        const result = await this.getMoreOffers(this.todayNext);
        this.offersToday = result.success ? [...this.offersToday, ...result.data] : [...this.offersToday];
        this.todayNext = result.success ? result.next : null;
        this.loadingToday = false;
      }
    },
    async fetchWeek() {
      if (this.weekNext && !this.loadingWeek) {
        this.loadingWeek = true;
        const result = await this.getMoreOffers(this.weekNext);
        this.offersWeek = result.success ? [...this.offersWeek, ...result.data] : [...this.offersWeek];
        this.weekNext = result.success ? result.next : null;
        this.loadingWeek = false;
      }
    },
    async fetchMonth() {
      if (this.monthNext && !this.loadingMonth) {
        this.loadingMonth = true;
        const result = await this.getMoreOffers(this.monthNext);
        this.offersMonth = result.success ? [...this.offersMonth, ...result.data] : [...this.offersMonth];
        this.monthNext = result.success ? result.next : null;
        this.loadingMonth = false;
      }
    }
  }
}
</script>

<style scoped></style>
