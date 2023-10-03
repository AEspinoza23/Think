<template>
  <v-card :width="$vuetify.breakpoint.width" class="mt-2 mb-3 shades-small-card rounded-lg backColor">
    <v-card-title class="app-heading-1">
      <v-row>
        <v-col cols="auto">
          <v-avatar class="shades-small-card" rounded="lg" size="98.75">
            <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
            <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
          </v-avatar>
        </v-col>
        <v-col class="mt-4" cols="auto">
          <v-row class="app-heading-1-bold ml-1">{{ fullName }}</v-row>
          <v-row class="app-body-small mt-3 ml-1">
            {{ $t('affiliates.number') }}: {{ affiliateNumber }}
          </v-row>
          <!-- <v-row class="app-body-medium mt-10 ml-1">
            <v-icon class="icon--xl pa-0 ma-0">{{ $iconsSvg.philosopherLevel }}</v-icon>
            <span class="mt-2"> Fílosofo </span>
          </v-row> -->
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="title--text">
      <v-row class="my-1 pa-2" justify="space-between">
        <v-col cols="auto">
          <v-icon class="icon--lg">{{ $iconsSvg.calendar }}</v-icon>
          <span class="app-body-large-bold mt-10">{{ $t('affiliates.register') }}</span>
        </v-col>
        <v-col cols="auto">
          <span class="app-body-large">{{ affiliateDate() }}</span>
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="mt-1 pa-2" justify="space-between">
        <v-col cols="auto">
          <v-icon class="icon--lg">{{ $iconsSvg.affiliates }}</v-icon>
          <span class="app-body-large-bold">{{ $t('affiliates.origin') }}</span>
        </v-col>
        <v-col cols="auto">
          <span class="app-body-large">
            {{ $auth.$state.user.first_name }} {{ $auth.$state.user.middle_name }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Affiliate',
  props: {
    referral: { type: Object, default: () => ({}) }
  },
  computed: {
    fullName() {
      let fullname = this.referral.first_name
      if (this.referral.middle_name !== null && this.referral.middle_name !== undefined) {
        fullname = fullname + ' ' + this.referral.middle_name
      }
      if (this.referral.last_name !== null && this.referral.last_name !== undefined) {
        fullname = fullname + ' ' + this.referral.last_name
      }
      return fullname
    },
    affiliateNumber() {
      let width = 4
      if (this.referral.id !== undefined) {
        const number = this.referral.id
        width -= number.toString().length
        if (width > 0) {
          return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number
        }
        return number + '' // siempre devuelve tipo cadena
      }
      return '0000'
    },
    imageSrc() {
      let image = null
      if (this.referral.avatar != null) {
        image = this.referral.avatar.image_400
      }
      return image
    }
  },
  methods: {
    affiliateDate() {
      try {
        const joined = new Date(this.referral.date_joined)
        return this.$dateFns.format(joined, 'dd-MM-yyyy')
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
