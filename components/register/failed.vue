<template>
  <div class="boxLogin boxBackground pa-7">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.error" class="my-5" width="115px" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <div class="app-body-large-bold">
        {{ $t('login.wrong') }}
      </div>
      <div class="app-body-medium text-center my-2">
        {{ $t('login.failedOne') }}. <br />
        {{ $t('login.failedTwo') }}.
      </div>
    </v-row>
    <v-row align="center" class="py-2" justify="center">
      <app-btn size="medium" @click="$emit('retry')">
        <span class="app-body-medium-bold">
          {{ $t('login.tryAgain') }}
        </span>
      </app-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
  layout: 'login',
  computed: {
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { 'margin-top': '55%', background: 'rgba(7, 7, 7, 0.2)' }
      } else {
        return { 'margin-top': '55%', background: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  }
}
</script>
