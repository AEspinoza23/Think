<template>
  <div>
    <!-- profile -->
    <app-loading v-if="loading" class="pt-5" />
    <profile-affiliates-details-affiliate v-else :referral="referralInfo" />

    <!-- Services -->
    <app-loading v-if="loading" class="pt-5" />
    <profile-affiliates-details-services 
      v-else
      :services="services"
      :types="servicesTypes"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Affiliates',
  layout: 'app',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      referral: 'user/referral',
      servicesList: 'services/servicesList',
      servicesListNext: 'services/servicesListNext'
    }),
    referralInfo() {
      return this.referral
    },
    services() {
      return this.referral.contracted_offers
    },
    servicesTypes() {
      return this.servicesList.results;
    },
    fullName() {
      let fullname = this.referralInfo.first_name;
      if (this.referralInfo.middle_name !== null && this.referralInfo.middle_name !== undefined) {
        fullname = fullname + ' ' + this.referralInfo.middle_name;
      }
      if (this.referralInfo.last_name !== null && this.referralInfo.last_name !== undefined) {
        fullname = fullname + ' ' + this.referralInfo.last_name;
      }
      return fullname
    },
    next() {
      return this.servicesListNext
    }
  },
  async mounted() {
    this.loading = true;
    const id = this.$route.params.slug;
    await this.getServicesList()
    await this.getReferral(id)
    this.loading = false
    // SET HEADER CONFIG FOR PAGE affiliates
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: this.fullName,
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
  },
  methods: {
    ...mapActions({
      getReferral: 'user/getReferral',
      getServicesList: 'services/getServicesList'
    })
  }
}
</script>
