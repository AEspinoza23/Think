<template>
  <v-app class="layout_app">
    <v-main>
      <app-header 
        app
        class="mb-10 blur-container-card transparent header-notch"
      >
        <template #leftAction>
          <v-btn v-if="headerConfig.isCancel" icon text @click="$router.back()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn v-if="headerConfig.isBack" icon text @click="backAction">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div
            v-if="headerConfig.isMenu"
            v-ripple
            class="rounded-pill pa-1"
            @click="changeDialogValue"
          >
            <client-only>
              <vue-lottie :options="defaultOptions" :height="25" :width="25" />
            </client-only>
          </div>
        </template>
        <template #title>
          <span 
            v-if="headerConfig.isTitle"
            :style="{'line-height': '14px'}"
            class="text-center"
          >
            {{ headerConfig.title }}
          </span>
          <v-icon v-if="!headerConfig.isTitle" class="icon--lg">{{ $iconsSvg.icon }}</v-icon>
        </template>
        <template #rightAction>
          <!--IF ACTION IS NOTIFICATIONS-->
          <div
            v-if="headerConfig.isNotification"
            v-ripple
            class="rounded-pill py-1 pr-4"
            @click="openLink"
          >
            <v-icon size="0" class="icon--sm">
              {{ $iconsSvg.contacto }}
            </v-icon>
          </div>
          <!-- IF ACTION IS MENU-->
          <!-- <div
            v-if="headerConfig.isMenu"
            v-ripple
            class="rounded-pill pa-1"
            @click="changeDialogValue"
          >
            <client-only>
              <vue-lottie :options="defaultOptions" :height="25" :width="25" />
            </client-only>
          </div> -->
          <!-- IF ACTION IS FILTER-->
          <div
            v-if="headerConfig.isFilter"
            v-ripple
            class="rounded-pill pa-1"
            @click="changeDialogValue"
          >
            <v-icon class="icon--sm">{{ $iconsSvg.filters }}</v-icon>
          </div>
          <!-- IF ACTION IS NOTIFICATION SEARCH-->
          <div
            v-if="headerConfig.isNotificationSearch"
            v-ripple
            class="rounded-pill py-1 pr-4"
            @click="changeDialogValue"
          >
            <v-icon size="0" class="icon--sm">
              {{ $iconsSvg.search }}
            </v-icon>
          </div>
          <!-- IF ACTION IS OPTIONS-->
          <div
            v-if="headerConfig.isOptions"
            v-ripple
            class="rounded-pill py-1 pr-3"
            @click="GoToSettings"
          >
            <v-icon class="icon--sm">{{ $iconsSvg.adjust }}</v-icon>
          </div>
          <div
            v-if="headerConfig.isContact"
            v-ripple
            class="rounded-pill py-1 pr-3"
            @click="GoToSettings"
          >
            <v-icon class="icon--sm">{{ $iconsSvg.contacto }}</v-icon>
          </div>
        </template>
      </app-header>
      <v-row 
        v-if="headerConfig.showTypes" :class="$isIOS ? 'mt-10' : ''" 
        class="start-save--image--slider-background"
      >
        <v-col cols="auto">
          <div>
            <offers-start-save
              :fetch-types="headerConfig.showTypes"
              :img="
                service.background_image
                  ? service.background_image.image_400
                  : ''
              "
              :service="service"
            />
          </div>
        </v-col>
      </v-row>
      <v-container :class="$isIOS && !headerConfig.showTypes? 'mt-10' : ''" class="pa-0 card">
        <Nuxt />
      </v-container>
    </v-main>
    <app-menu v-if="$auth.$state.loggedIn || isOffer" app bottom class="blur-container-card transparent" />
    <app-common />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import Theme from '~/constants/theme'
import menu from '~/assets/icons/lottie_icons/menu.json'

export default {
  name: 'App',
  middleware: ['authenticate'],
  data() {
    return {
      themeItems: Theme,
      defaultOptions: { animationData: menu, loop: false }
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    ...mapGetters({
      headerConfig: 'app/headerConfig',
      activeTheme: 'app/isDark',
      service: 'services/service'
    }),
    isOffer() {
      return this.$route.name.includes('offer-');
    }
  },
  async created() {
    if (this.$auth.loggedIn) {
      await this.$auth.fetchUser();
    } else {
      this.$router.push(this.localePath('/login'))
    }
  },
  beforeMount() {
    // eslint-disable-next-line import/no-named-as-default-member
    Vue.nextTick(function () {
      Vue.prototype.$isIOS = navigator
        ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        : ''
    })
  },
  mounted() {
    if (this.$auth.loggedIn) {
      const themeValue = this.themeItems.find(
        (item) => item.value === this.$auth.$state.user.theme
      ).value
      this.changeAppTheme(themeValue === 2 || themeValue === 3)
      setTimeout(() => {
        this.$vuetify.theme.dark = themeValue === 2 || themeValue === 3
      }, 50)
    }
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      changeAppTheme: 'app/changeAppTheme'
    }),
    GoToSettings() {
      this.$router.push(this.localePath('/menu/adjust/notifications'))
    },
    backAction() {
      this.$router.back();
    },
    openLink() {
      let link
      if (this.$auth.$state.user.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        }
        window.open(link, '_blank')
      } else if (
        this.$auth.$state.user.consultant?.phone_code &&
        this.$auth.$state.user.consultant?.phone_number
      ) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        window.open(link, '_blank')
      } else {
        this.$flash({
          message:
            'Tú consultor no tiene número de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_app {
  overflow: hidden;
}
</style>
