<template>
  <div 
    :class="isUp? 'closeUp' : 'open'" 
    class="d-flex align-end justify-center beggining"
  >
    <v-row no-gutters>
      <v-img
        :src="isDark? $assets.intersectDark : $assets.intersect"
        width="570"
      >
        <div class="mt-7 app-heading-1-regular">
          <div class="d-flex justify-center" @click="classChange">
            <v-avatar size="88">
              <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
              <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
            </v-avatar>
          </div>
          <div class="d-flex justify-center mt-3">
            {{ $t('dashboard.hello') }},
            <span class="app-heading-1-bold">&nbsp; {{ name }}</span>
          </div>
          <div class="d-flex justify-center">
            {{ $t('dashboard.welcome') }}
          </div>
          <v-row no-gutters justify="center" class="mt-4">
          <div class="iconbox pointer" @click="goTo('/profile')">
            <v-icon color="primary" size="25">
              {{ $icons.profile }}
            </v-icon>
          </div>
          <div class="iconbox pointer mx-1" @click="goTo('/profile/services')">
            <v-icon color="primary" size="25">
              {{ $icons.services }}
            </v-icon>
          </div>
          <div class="iconbox pointer" @click="goTo('/menu/referral-code')">
            <v-icon color="primary" size="25">
              {{ $icons.share }}
            </v-icon>
          </div>
          <div class="iconbox pointer mx-1" @click="goTo('/profile/balance')">
            <v-icon color="primary" size="25">
              {{ $icons.balance }}
            </v-icon>
          </div>
          <div class="iconbox pointer notificationsAnimation">
            <app-notifications />
          </div>
          </v-row>
        </div>
        <div class="d-flex justify-center pointer">
        <v-icon v-if="!isUp" size="30" class="mt-3" @click="classChange">
          mdi-chevron-down
        </v-icon>
        <v-icon v-if="isUp" size="30" class="mt-3" @click="classChange">
          mdi-chevron-up
        </v-icon>
        </div>
      </v-img>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardSubmenu',
  data: () => ({
    isUp: false,
    name: '',
    imageSrc: null
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },
  mounted() {
    if (this.$auth.$state.user.profile === 6) {
      this.name = this.$auth.$state.user.commerce.store_name || this.$auth.$state.user.commerce.social_reason;
    } else {
      this.name = this.$auth.$state.user.first_name
    }
    this.imageSrc = this.$auth.$state.user.avatar?.image_xs
    
  },
  methods: {
    goTo(route) {
      this.$router.push(this.localePath(route))
    },
    openLink() {
      window.open('https://www.travel.piensanetwork.com/', '_blank');
    },
    classChange() {
      this.isUp = !this.isUp;
      this.isUp? this.$emit('show') : setTimeout(() => {this.$emit('show')}, "1500");
    }
  }
}
</script>

<style>
  .beggining {
    margin-top: -300px;
    animation: up 2s ease-in-out 0s 1 alternate;
  }
  .closeUp {
    margin-top: -700px;
    transition: margin 2s;
  }
  .open {
    margin-top: -300px;
    transition: margin 2s;
  }
  @keyframes up {
    0%   {margin-top: 100px;}
    100% {margin-top: -300px;}
  }
</style>