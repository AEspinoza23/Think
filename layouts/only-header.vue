<template>
  <v-app class="only-header">
    <v-main>
      <app-header app class="blur-container-card header-notch" elevate-on-scroll flat>
        <template v-if="headerConfig.isBack" #leftAction>
          <v-btn :class="isIOSDevice ? 'pb-5' : ''" icon text @click="$router.back()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template #title>
          <div :class="isIOSDevice ? 'pb-5' : ''">
            <span v-if="headerConfig.isTitle" class="text-center">{{ headerConfig.title }}</span>
            <v-icon v-else class="icon--md">{{ $iconsSvg.icon }}</v-icon>
          </div>
        </template>
        <template #rightAction>
          <div :class="isIOSDevice ? 'pb-5' : ''">
            <!--IF ACTION IS NOTIFICATIONS-->
            <app-notifications
              v-if="headerConfig.isNotification"
              :notifications="headerConfig.notificationsNumber"
              @click="changeDialogValue"
            />
            <!-- IF ACTION IS MENU-->
            <div
              v-else-if="headerConfig.isMenu"
              v-ripple
              class="rounded-pill pa-1"
              @click="changeDialogValue"
            >
              <v-icon class="icon--md">{{ $iconsSvg.menuIcon }}</v-icon>
            </div>
            <!-- IF ACTION IS FILTER-->
            <div
              v-else-if="headerConfig.isFilter"
              v-ripple
              class="rounded-pill pa-1"
              @click="changeDialogValue"
            >
              <v-icon class="icon--md">{{ $iconsSvg.filters }}</v-icon>
            </div>
            <!-- IF ACTION IS OPTIONS-->
            <div
              v-else-if="headerConfig.isOptions"
              v-ripple
              class="rounded-pill pa-1"
              @click="changeDialogValue"
            >
              <v-icon class="icon--md">{{ $iconsSvg.adjust }}</v-icon>
            </div>
          </div>
        </template>
      </app-header>
      <v-container :class="isIOSDevice ? 'mt-10' : ''" class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <app-common />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OnlyHeader',
  middleware: ['authenticate'],
  data() {
    return {
      isIOSDevice: false
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    ...mapGetters({
      headerConfig: 'app/headerConfig',
      activeTheme: 'app/isDark'
    })
  },
  mounted() {
    this.isIOSDevice = navigator
      ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      : ''
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    })
  }
}
</script>

<style scoped>
.only-header {
  overflow: hidden;
}

.header-notch {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
}
</style>
