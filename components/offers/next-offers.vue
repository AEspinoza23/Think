<template>
  <div>
    <v-row>
      <v-col class="pb-0">
        <v-card
          :width="$vuetify.breakpoint.width"
          class="rounded-lg py-0 shades-small-card backColor"
        >
          <v-card-title>
            <span class="app-heading-1-bold">
              {{ title }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-row justify="space-between" no-gutters>
              <v-col cols="auto">
                <v-tabs v-model="tab" class="app-tabs rounded-lg" color="backColor" hide-slider>
                  <v-tab v-for="item in items" :key="item" class="text-capitalize px-0">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-col cols="auto">
                <offers-filter @applyFilter="applyFilters" />
              </v-col>
            </v-row>
            <v-row>
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                  <v-row class="backColor px-3" justify="space-between" no-gutters>
                    <v-col
                      v-for="(offerItem, index) in offers"
                      :key="index"
                      cols="auto"
                      lg="auto"
                      class="mb-2 px-md-2"
                    >
                      <app-cardOffer
                        :color="offerItem.service.color"
                        :description="offerItem.short_details"
                        :discount="offerItem.discount_value"
                        :discount-type="offerItem.discount_type"
                        :end-date="offerItem.end_date"
                        :price="offerItem.original_price"
                        :rating-avg="offerItem.rating_avg"
                        :rating-count="offerItem.rating_count"
                        :service-title="offerItem.service.name"
                        :start-date="offerItem.start_date"
                        :subtitle="offerItem.title"
                        :title="offerItem.company.name"
                        :offer="offerItem"
                        small
                        @setOffer="setOffer(offerItem)"
                      />
                    </v-col>
                    <v-col v-if="!loading" v-intersect.quiet="onIntersect" cols="4">
                    </v-col>
                    <v-col v-if="loading" cols="4">
                      <v-skeleton-loader
                        height="325"
                        width="170"
                        type="card-avatar, list-item-three-line"
                      ></v-skeleton-loader>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import OffersFilter from '~/components/offers/filter'

export default {
  name: 'NextOffers',
  components: { OffersFilter },
  props: {
    title: {
      type: String,
      default: ''
    },
    isCurrentOffer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tab: 0,
      itemsCurrent: ['Hoy', 'Semana', 'Mes'],
      itemsNext: ['Mañana', 'Prox Sem', 'Prox Mes'],
      items: [],
      loading: false,
      offers: [],
      filters: [],
      next: null
    }
  },
  watch: {
    tab() {
      this.changeOffers()
    }
  },
  mounted() {
    this.filters = [];
    this.items = this.isCurrentOffer ? this.itemsCurrent : this.itemsNext
    this.changeOffers()
  },
  methods: {
    ...mapActions({
      listOffersAction: 'offers/getOffersList',
      getMoreOffers: 'offers/getMoreOffers'
    }),
    async changeOffers() {
      this.loading = true
      const service = this.filters.join();
      // TO CREATE NEW FILTERS THAT INCLUDES SERVICE FILTER AND CURRENT FILTER
      const filterToSend = this.filters.length ? 
      `length=10&page=1&by_service=${service}&${this.createFilter()}` : 
      `length=10&page=1&${this.createFilter()}`;
      const result = await this.listOffersAction(filterToSend);
      this.offers = result.success ? result.data : [];
      this.next = result.success ? result.next : null;
      this.loading = false
    },
    async fetchMore() {
      if (this.next && !this.loading) {
        const result = await this.getMoreOffers(this.next);
        this.offers = result.success ? [...this.offers, ...result.data] : [...this.offers];
        this.next = result.success ? result.next : null;
      }
    },
    onIntersect (entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
      this.fetchMore();
    },
    createFilter() {
      if (this.isCurrentOffer) {
        switch (this.tab) {
          case 0:
            return 'current_offer_today'
          case 1:
            return 'current_offer_week'
          case 2:
            return 'current_offer_month'
        }
      } else {
        switch (this.tab) {
          case 0:
            return 'next_offer_tomorrow'
          case 1:
            return 'next_offer_week'
          case 2:
            return 'next_offer_month'
        }
      }
    },
    async setOffer(offer) {
      await this.$router.push(
        this.localePath({
          name: 'offer-slug',
          params: {
            slug: offer.id
          }
        })
      )
    },
    applyFilters(item) {
      this.filters = item;
      this.changeOffers();
    }
  }
}
</script>

<style scoped></style>
