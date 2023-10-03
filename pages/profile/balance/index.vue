<template>
  <app-loading v-if="loading" class="pt-5" />
  <div v-else class="background">
    <!-- image -->
    <profile-balance-image :balance="balance" />
    <!-- savings -->
    <profile-balance-savings style="margin-top: -30px" :data="savings" />
    <!-- balance -->
    <profile-balance-info :balance="balance" class="mb-2 mt-2" />
    <!-- balance chart -->
    <dashboard-balance
      :balance="balance"
      :weekly="weekly"
      :monthly="monthly"
      :yearly="yearly"
    />
    <!-- Movement List -->
    <profile-balance-movements />
    <!-- Boton para solicitar saldo -->
    <v-row class="pb-6 pt-3" justify="center">
      <app-btn size="large" @click="request">
        <span v-if="$auth.$state.user.profile === 6">
          Solicitar abono
        </span>
        <span v-else>Solicitar saldo</span>
      </app-btn>
    </v-row>
    <menu-sale-no-services :dialog="dialog" @close="dialog = false" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProfileBalance',
  layout: 'app',
  data: () => ({
    loading: false,
    dialog: false
  }),
  computed: {
    ...mapGetters({
      userBalance: 'user/userBalance',
      userWeekBalance: 'user/userWeekBalance',
      userMonthBalance: 'user/userMonthBalance',
      userYearBalance: 'user/userYearBalance',
      savings: 'user/savings',
    }),
    balance() {
      return this.userBalance;
    },
    weekly() {
      return this.userWeekBalance;
    },
    monthly() {
      return this.userMonthBalance;
    },
    yearly() {
      return this.userYearBalance;
    },
    activeServices() {
      const services = this.$auth.$state.user.contracted_offers;
      let status = 0;
      services.forEach(element => {
        if (element.status === 1) {
          status = 1;
        }
      });
      return status === 1; 
    }
  },
  async mounted() {
    if (!this.balance) {
      this.loading = true;
    };
    await this.resetMovementList();
    await Promise.all([
      this.getUserSavings(),
      this.getUserBalance(),
      this.getUserWeekBalance(),
      this.getUserMonthBalance(),
      this.getUserYearBalance(),
      this.getMovementList()
    ])
    this.loading = false
    // SET HEADER CONFIG FOR PAGE AFFILIATES
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: this.$t('profile.title'),
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true);
  },
  methods: {
    ...mapMutations({
      resetMovementList: 'user/RESET_MOVEMENTS_LIST'
    }),
    ...mapActions({
      getUserBalance: 'user/getUserBalance',
      getUserWeekBalance: 'user/getUserWeekBalance',
      getUserMonthBalance: 'user/getUserMonthBalance',
      getUserYearBalance: 'user/getUserYearBalance',
      getMovementList: 'user/getMovementList',
      getUserSavings: 'user/getUserSavings'
    }),
    request() {
      if (this.$auth.$state.user.contracted_offers.length === 0 || !this.activeServices) {
        this.dialog = true;
      } else {
        this.$router.push(this.localePath('profile-balance-balance-request'));
      }
    }
  }
}
</script>
