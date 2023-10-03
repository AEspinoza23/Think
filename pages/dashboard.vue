<template>
  <div v-if="$auth.loggedIn" class="background">

    <!-- Menu -->
    <dashboard-menu />
    
    <!-- Menu -->
    <dashboard-submenu @show="show = !show" />

    <div v-show="show" :style="{'margin-top': '-300px'}">
      <!-- Services -->
      <dashboard-services-card />
  
      <!-- Study -->
      <dashboard-study />
  
      <!-- Affiliate -->
      <dashboard-affiliate />
  
      <!-- Balance -->
      <dashboard-balance
        :balance="userBalance"
        :loading="loading"
        :weekly="weekly"
        :monthly="monthly"
        :yearly="yearly"
      />
  
      <!-- Grow -->
      <dashboard-grow />
  
      <!-- Offers -->
      <dashboard-offers />
  
      <!-- Upload Documents -->
      <dashboard-upload />
  
      <!-- Recommends -->
      <dashboard-recommends />
    </div>

    <!-- Promo dialogs -->
    <dashboard-promo
      :dialog="promo"
      @close="statePromo"
    />
    <dashboard-saveToday 
      :dialog="promoTwo"
      @close="statePromoTwo"
    />
    <dashboard-promoFranchise
      :dialog="promoThree"
      @close="statePromoThree"
    />
    <dashboard-promoFranchiseTwo
      :dialog="promoFour"
      @close="statePromoFour"
    />
    <!-- MENU DIALOG-->
    <offers-menu />
  </div>
  <div v-else>
    <!-- Greeting -->
    <dashboard-noLogin-discounts />

    <!-- Greeting -->
    <dashboard-noLogin-services />
    
    <!-- Greeting -->
    <dashboard-noLogin-study />

    <!-- Greeting -->
    <dashboard-noLogin-referral />

    <!-- Greeting -->
    <dashboard-noLogin-commerces />

    <!-- MENU DIALOG-->
    <offers-menu />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'app',
  data: () => ({
    loading: false,
    promoNumber: 0,
    show: false
  }),
  computed: {
    ...mapGetters({
      userBalance: 'user/userBalance',
      userWeekBalance: 'user/userWeekBalance',
      userMonthBalance: 'user/userMonthBalance',
      userYearBalance: 'user/userYearBalance',
      promo: 'app/promo',
      promoTwo: 'app/promoTwo',
      promoThree: 'app/promoThree',
      promoFour: 'app/promoFour',
    }),
    weekly() {
      return this.userWeekBalance
    },
    monthly() {
      return this.userMonthBalance
    },
    yearly() {
      return this.userYearBalance
    },
  },
  async mounted() {
    await this.fetchGpsPosition();
    if(this.$auth.loggedIn) {
      // SET HEADER CONFIG FOR PAGE DASHBOARD
      this.$headerConfig(
        {
          isBack: false,
          isTitle: false,
          isNotification: true,
          isMenu: true,
          isFilter: false,
          isOptions: false
        },
        true
      );
      // PROMO CONFIG
      setTimeout(() => {
        this.promoNumber = this.getRandomInt(4);
        switch (this.promoNumber) {
          case 0:
            this.statePromo();
            break;
          case 1:
            this.statePromoTwo();
            break;
          case 2:
            this.statePromoThree();
            break;
          case 3:
            this.statePromoFour();
            break;
          
          default:
            break;
        }
      }, "3000");
      this.loading = true;
      await this.getUserWeekBalance();
      await this.getUserBalance();
      this.loading = false;
      Promise.all([
        this.getUserMonthBalance(),
        this.getUserYearBalance(),
      ])
    } else {
      this.$headerConfig(
        {
          isBack: false,
          isTitle: false,
          isNotification: false,
          isMenu: true,
          isFilter: false,
          isOptions: false
        },
        false
      );
    }
  },
  methods: {
    ...mapActions({
      getUserBalance: 'user/getUserBalance',
      getUserWeekBalance: 'user/getUserWeekBalance',
      getUserMonthBalance: 'user/getUserMonthBalance',
      getUserYearBalance: 'user/getUserYearBalance',
    }),
    ...mapMutations({
      statePromo: 'app/PROMO',
      statePromoTwo: 'app/PROMO_TWO',
      statePromoThree: 'app/PROMO_THREE',
      statePromoFour: 'app/PROMO_FOUR',
      changeLocation: 'user/SET_LOCATION'
    }),
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    async fetchGpsPosition() {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.changeLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error(error);
          this.$flash({
            message: 'No hemos podido establecer su ubicación'
          });
        }
      );
    },
  },
}
</script>
