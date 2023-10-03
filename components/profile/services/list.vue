<template>
  <v-card
    :width="$vuetify.breakpoint.width"
    class="mt-3 mb-3 pt-3 rounded-lg py-0 backColor shades-small-card"
  >
    <!-- Free study banner -->
    <profile-services-banner class="mt-3" />
    <!-- <v-card-title>
      <span class="app-heading-1 title--text">{{ $t('dashboard.services') }}</span>
    </v-card-title> -->
    <v-card-text v-if="loading">
      <v-skeleton-loader type="list-item-avatar"  class="mt-2"/>
      <v-skeleton-loader type="list-item-avatar"  class="mt-2"/>
    </v-card-text>
    <v-card-text v-else class="backColor">
      <div v-if="hired === 0">
        <profile-services-hired 
          v-if="contractedServices.length > 0"
          :services="contractedServices"
          :services-types="servicesTypes" 
        />
        <dashboard-services-notHired v-else />
      </div>
      <div v-else>
        <profile-services-forHire 
          :services="contractedServices"
          :services-types="servicesTypes"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileServices',
  props: {
    title: { type: Boolean, default: false }
  },
  data: () => ({
    loading: false,
    hired: 0 // 0 = hired, 1 = toHire
  }),
  computed: {
    ...mapGetters({
      userServices: 'user/userServices',
      servicesList: 'services/servicesList',
      servicesListNext: 'services/servicesListNext'
    }),
    contractedServices() {
      return this.userServices.results
    },
    contractedServicesNext() {
      return this.userServices.next
    },
    servicesTypes() {
      return this.servicesList.results
    },
    next() {
      return this.servicesListNext
    }
  },
  async mounted() {
    if (this.contractedServices.length === 0) {
      this.loading = true
    }
    await this.getServicesList();
    await this.listUserOffers();
    /* if (this.contractedServicesNext) {
      await this.listUserOffers();
    } */
    this.loading = false
  },
  methods: {
    ...mapActions({
      listUserOffers: 'user/listUserOffers',
      getServicesList: 'services/getServicesList'
    }),
    textColor(number) {
      if (number === this.hired) {
        return 'white'
      }
    },
    goTo() {
      this.$router.push(this.localePath('/menu/referral-code'))
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  .v-item--active {
    background-color: #00bbbf;
  }
}
</style>
