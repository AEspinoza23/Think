<template>
  <v-card :width="$vuetify.breakpoint.width" class="backColor my-3 rounded-lg shades-general">
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <v-avatar rounded="lg" size="40">
            <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
            <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
          </v-avatar>
        </v-col>
        <v-col class="app-heading-1-regular mt-2 title--text" cols="auto">
          <v-row>
            {{ $t('dashboard.hello') }},
            <span class="app-heading-1-bold">&nbsp; {{ name }}</span>
          </v-row>
          <v-row>
            {{ $t('dashboard.welcome') }}
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Greeting',
  data: () => ({
    imageSrc: null,
    name: ''
  }),
  mounted() {
    if (this.$auth.$state.user.profile === 6) {
      this.name = this.$auth.$state.user.commerce.store_name || this.$auth.$state.user.commerce.social_reason;
    } else {
      this.name = this.$auth.$state.user.first_name
    }
    this.imageSrc = this.$auth.$state.user.avatar?.image_xs
  }
}
</script>