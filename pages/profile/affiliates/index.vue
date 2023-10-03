<template>
  <div>
    <!-- Share -->
    <v-card 
      :width="$vuetify.breakpoint.width"
      class="rounded-lg backColor shades-general mt-3 mb-3 pa-2"
    >
      <profile-affiliates-banner />
    </v-card>

    <!-- Affiliate List -->
    <app-loading v-if="loading" class="pt-5" />
    <profile-affiliates-list v-else :affiliates="affiliates" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileAffiliates',
  layout: 'app',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    affiliates() {
      return this.user.referrals
    }
  },
  async mounted() {
    // SET HEADER CONFIG FOR PAGE AFFILIATES
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: this.$t('affiliates.title'),
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
    this.loading = true;
    const id = this.$auth.$state.user.id;
    await this.getUser(id)    
    this.loading = false
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser'
    })
  }
}
</script>
