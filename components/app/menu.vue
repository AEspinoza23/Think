<template>
  <v-app-bar 
    v-if="isOffer && loggedIn"
    :height="$isIOS ? '110px' : '94px'"
    class="menu" 
    v-bind="$attrs"
  >
    <v-row no-gutters :style="{'line-height': '15px'}">
      <v-col cols="12">
        <v-row no-gutters class="degraded py-2 white--text rounded-lg rounded-b-0">
          <v-col cols="12" class="text-center pa-0">
            <span class="app-body-small-bold">Solicita un estudio gratis</span>
            <span class="app-body-small">sin compromiso o</span>
          </v-col>
          <v-col cols="12" class="text-center pa-0">
            <span class="app-body-small-bold">contrata ahora en un clic</span>
            <span class="app-body-small">con tu consultor.</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around mt-2">
            <app-btn outlined color="white" @click="study">
              Estudio gratis
            </app-btn>
            <app-btn class="button-primary white--text" @click="openLink">
              <v-icon class="icon--xs ma-0 pa-0">
                {{ $iconsSvg.whatsapp }}
              </v-icon>
              Contratar Ahora
            </app-btn>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col cols="12" class="d-flex justify-space-around mt-6 mb-16">
        <v-row class="mx-0 mb-3" justify="space-between" no-gutters>
          <v-col v-ripple class="pointer" @click="play(1)">
            <nuxt-link :to="localePath('')" class="menu__remove-decoration">
              <v-row justify="center">
                <v-col class="py-0" cols="auto">
                  <client-only>
                    <vue-lottie
                      :options="defaultOptions"
                      :height="24"
                      :width="24"
                      @animCreated="handleAnimation($event, '1')"
                    />
                  </client-only>
                </v-col>
              </v-row>
              <v-row :style="textStyle(1)" class="app-label title--text" justify="center">
                <v-col class="pt-1 pb-0" cols="auto">
                  <span> Dashboard </span>
                </v-col>
              </v-row>
            </nuxt-link>
          </v-col>
          <v-col v-ripple class="pointer" @click="play(2)">
            <nuxt-link :to="localePath('offers')" class="menu__remove-decoration">
              <v-row justify="center">
                <v-col class="py-0" cols="auto">
                  <client-only>
                    <vue-lottie
                      :options="defaultOptions2"
                      :height="24"
                      :width="24"
                      @animCreated="handleAnimation($event, '2')"
                    />
                  </client-only>
                </v-col>
              </v-row>
              <v-row :style="textStyle(2)" class="app-label d-flex justify-center title--text">
                <v-col class="pt-1 pb-0" cols="auto">
                  <span> Ofertas </span>
                </v-col>
              </v-row>
            </nuxt-link>
          </v-col>
          <v-col v-ripple class="pointer" @click="play(3)">
            <nuxt-link :to="localePath('profile')" class="menu__remove-decoration">
              <v-row justify="center">
                <v-col class="py-0" cols="auto">
                  <client-only>
                    <vue-lottie
                      :options="defaultOptions3"
                      :height="24"
                      :width="24"
                      @animCreated="handleAnimation($event, '3')"
                    />
                  </client-only>
                </v-col>
              </v-row>
              <v-row :style="textStyle(3)" class="app-label d-flex justify-center title--text">
                <v-col class="pt-1 pb-0" cols="auto">
                  <span> Perfil </span>
                </v-col>
              </v-row>
            </nuxt-link>
          </v-col>
          <v-col v-ripple class="pointer" @click="play(4)">
            <nuxt-link :to="localePath('/menu')" class="menu__remove-decoration">
              <v-row justify="center">
                <v-col class="py-0" cols="auto">
                  <client-only>
                    <vue-lottie
                      :options="defaultOptions4"
                      :height="24"
                      :width="24"
                      @animCreated="handleAnimation($event, '4')"
                    />
                  </client-only>
                </v-col>
              </v-row>
              <v-row :style="textStyle(4)" class="app-label d-flex justify-center title--text">
                <v-col class="pt-1 pb-0" cols="auto">
                  <span> Menu </span>
                </v-col>
              </v-row>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col> -->
    </v-row>
  </v-app-bar>
  <v-app-bar 
    v-else-if="isOffer && !loggedIn"
    :height="$isIOS ? '60' : '50'"
    class="menu"
    color="backColor"
    v-bind="$attrs"
  >
    <v-row no-gutters :style="{'line-height': '15px'}">
      <v-col cols="12" class="d-flex justify-space-around py-3 mb-3 backColor">
        <app-btn class="mr-1" outlined @click="study">
          Estudio gratis
        </app-btn>
        <v-btn class="button-primary white--text" @click="register">
          Regístrate para acceder
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboard from '~/assets/icons/lottie_icons/dashboard.json'
import dashboardDark from '~/assets/icons/lottie_icons/dashboard_dark.json'
import offers from '~/assets/icons/lottie_icons/offers.json'
import offersDark from '~/assets/icons/lottie_icons/offers_dark.json'
import profile from '~/assets/icons/lottie_icons/profile.json'
import profileDark from '~/assets/icons/lottie_icons/profile_dark.json'
import menu from '~/assets/icons/lottie_icons/menu.json'
import menuDark from '~/assets/icons/lottie_icons/menu_dark.json'
/* import profileChristmas from '~/assets/icons/lottie_icons/profile_christmas.json';
import profileChristmasDark from '~/assets/icons/lottie_icons/profile_christmas_dark.json'; */
export default {
  name: 'Menu',
  data: () => ({
    active: 1,
    defaultOptions: { animationData: '', loop: false },
    defaultOptions2: { animationData: '', loop: false },
    defaultOptions3: { animationData: '', loop: false },
    defaultOptions4: { animationData: '', loop: false },
    animationSpeed: 1,
    anim: []
  }),
  computed: {
    ...mapGetters({
      offer: 'offers/offer'
    }),
    isDark() {
      return this.$vuetify.theme.dark;
    },
    dashboard() {
      return this.isDark? dashboardDark : dashboard;
    },
    offers() {
      return this.isDark? offersDark: offers;
    },
    profile() {
      return this.isDark? profileDark : profile;
    },
    menu() {
      return this.isDark? menuDark : menu;
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
    isOffer() {
      return this.$route.name.includes('offer-');
    },
    slug() {
      return this.$route.params.slug
    },
    url() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/offer/${this.slug}`;
      }
      return `https://app.piensanetwork.com/es/offer/${this.slug}`;
    },
    referralCode() {
      if (this.$route.query.referral_code) {
        return this.$route.query.referral_code
      }
      return ''
    }
  },
  beforeMount() {
    this.defaultOptions.animationData = this.dashboard;
    this.defaultOptions2.animationData = this.offers;
    this.defaultOptions3.animationData = this.profile;
    this.defaultOptions4.animationData = this.menu;
  },
  mounted() {
    this.setActive()
  },
  methods: {
    handleAnimation(anim, type) {
      try {
        this.anim[type] = anim
      } catch (error) {
        console.log(error)
      }
    },
    play(type) {
      this.anim[type].stop()
      this.anim[type].play()
      this.changeActive(type)
    },
    setActive() {
      let active = 0
      if (this.$route.name.includes('dashboard')) {
        active = 1
      } else if (this.$route.name.includes('offers')) {
        active = 2
      } else if (this.$route.name.includes('profile')) {
        active = 3
      } else if (this.$route.name.includes('menu')) {
        active = 4
      }
      this.changeActive(active)
    },
    menuColor(active) {
      if (this.active === active) {
        return 'primary'
      } else {
        return ''
      }
    },
    textStyle(active) {
      if (this.active === active) {
        return { fontWeight: 'bold' }
      } else {
        return {}
      }
    },
    changeActive(active) {
      this.active = active
      if (active === 1) {
        this.$router.push(this.localePath('dashboard'))
      } else if (active === 2) {
        this.$router.push(this.localePath('offers'))
      } else if (active === 3) {
        this.$router.push(this.localePath('profile'))
      } else if (active === 4) {
        this.$router.push(this.localePath('menu'))
      }
    },
    study() {
      this.$router.push(
        this.localePath({
          name: 'offers-study',
          query: { offer: true }
        })
      )
    },
    openLink() {
      let link
      if (this.$auth.$state.user.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta%20${this.offer.title}%20${this.url}`
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${this.offer.title}%20${this.url}`
        }
        window.open(link, '_blank')
      } else if (
        this.$auth.$state.user.consultant?.phone_code &&
        this.$auth.$state.user.consultant?.phone_number
      ) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${this.offer.title}%20${this.url}`
        window.open(link, '_blank')
      } else if (this.offer.contact_link) {
        const whatsapp = this.offer.contact_link
        link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${this.offer.title}%20${this.url}`
        window.open(link, '_blank')
      } else {
        this.$flash({
          message:
            'Tú consultor y/o el experto del area no tienen link de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    },
    register() {
      this.$router.push(
        this.localePath({
          name: 'register',
          query: { referral_code: this.referralCode }
        })
      )
    }
  }
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}

.menu {
  .v-toolbar__content {
    padding: 0 !important;
  }

  &__remove-decoration {
    text-decoration: none;
  }
}
</style>
