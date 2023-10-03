<template>
  <div class="boxLogin boxBackground pa-3">
    <v-row class="app-body-large-bold mt-10" justify="center">
      {{ $t('login.verified') }}
    </v-row>
    <v-row justify="center">
      <div class="app-body-medium text-center my-2">
        {{ $t('login.thanks') }}
      </div>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <app-btn @click="downloadApp">
          Descargar app
        </app-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="d-flex justify-center align-center">
        <span class="black--text"> Ya estas en el app?, &nbsp; </span>
        <v-btn
          :to="localePath('login')"
          class="pa-0 text-decoration-underline"
          color="black"
          exact
          router
          text
        >
          {{ $t('login.access') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RegisterVerified',
  layout: 'login',
  computed: {
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { 'margin-top': '55%', background: 'rgba(7, 7, 7, 0.2)' }
      } else {
        return { 'margin-top': '55%', background: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  },
  methods: {
    downloadApp() {
      if (this.$isIOS) {
        window.location.href = "https://apps.apple.com/es/app/piensa/id1610112151";
      } else {
        window.location.href = "https://play.google.com/store/apps/details?id=com.smartandfun.piensanetwork";
      }
    }
  }
}
</script>

<style lang="scss"></style>
