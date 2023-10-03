<template>
  <v-card
    :width="$vuetify.breakpoint.width"
    class="rounded-lg backColor shades-general mt-1 mb-3"
  >
    <v-card-title>
      <v-row no-gutters>
        <v-col cl.. class="app-heading-1-bold" cols="auto">
          {{ $t('dashboard.number') }}
        </v-col>
        <v-col class="primary--text app-heading-1-bold ml-3" cols="auto">
          {{ affiliateNumber }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="loading">
      <v-row no-gutters>
        <v-col cols="auto" class="ml-3 mr-2">
          <v-skeleton-loader max-height="50px" type="avatar" />
        </v-col>
        <v-col cols="auto">
          <v-skeleton-loader max-height="50px" type="avatar" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <div class="pointer" @click="goTo">
        <div 
          v-if="referralsInfo.length === 0" 
          class="app-body-small"
        >
          {{ $t('dashboard.noAffiliated') }}
        </div>
        <div v-else class="app-body-small">
          {{ referralsInfo.length }} {{ $t('dashboard.afiliated') }}
        </div>
        <v-avatar
          v-for="(affiliate, i) in affiliatesToShow"
          :key="i"
          class="mx-1"
          rounded="lg"
          size="40"
        >
          <v-img
            v-if="affiliate.avatar"
            :lazy-src="affiliate.avatar.image_xs"
            :src="affiliate.avatar.image_xs"
            alt="Afiliado"
          />
          <v-icon v-else class="icon--xl pa-0">
            {{ $iconsSvg.profile }}
          </v-icon>
        </v-avatar>
        <v-avatar 
          v-if="referralsInfo.length > 6" 
          color="primary" 
          rounded="lg" 
          size="40"
        >
          +{{ referralsInfo.length - 6 }}
        </v-avatar>
      </div>
      <dashboard-affiliate-banner />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Affiliate',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    referralsInfo() {
      return this.user?.referrals
    },
    id() {
      return this.$auth.$state.user.id
    },
    affiliateNumber() {
      let width = 4
      if (this.id !== undefined) {
        const number = this.id
        width -= number.toString().length
        if (width > 0) {
          return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number
        }
        return number + '' // siempre devuelve tipo cadena
      }
      return '0000'
    },
    affiliatesToShow() {
      const element = []
      this.referralsInfo.slice(0, 6).forEach((item) => {
        element.push(item)
      })
      return element
    }
  },
  async mounted() {
    if (this.user.referrals.length === 0) {
      this.loading = true
    }
    const id = this.$auth.$state.user.id
    await this.getUser(id)
    this.loading = false
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser'
    }),
    goTo() {
      this.$router.push(this.localePath('profile-affiliates'))
    }
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>