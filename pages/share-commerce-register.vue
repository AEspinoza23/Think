<template>
  <v-card 
    color="backColor"
    class="rounded-lg shades-general my-6 mx-2"
  >
    <v-row class=" py-10 pb-3">
      <v-col cols="12" class="text-center app-body-large-bold title--text">
        Registro comercios
      </v-col>
    </v-row>
    <v-row justify="center" class="white mx-5">
      <v-col cols="auto">
        <qr-code :text="codeText"></qr-code>
      </v-col>
    </v-row>
    <v-row class="py-10 pb-3">
      <v-col cols="12" class="px-5 text-center app-body-medium title--text">
        Escanea este código para registrar tu comercio y formar parte de Piensa. 
        También puedes compartirlo entre tus contactos.
      </v-col>
    </v-row>
    <v-row no-gutters class="py-2 pb-10">
      <v-col cols="12" class="px-5 text-center app-body-medium title--text">
        <menu-shops-share-form />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  layout: 'app',
  computed: {
    referralCode() {
      if (this.$auth.$state.user.referral_code) {
        return this.$auth.$state.user.referral_code
      } 
      return '';
    },
    codeText() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/register/?referral_code=${this.referralCode}&commerce=true`
      }
      return `https://app.piensanetwork.com/es/register/?referral_code=${this.referralCode}&commerce=true`
    }
  },
  mounted() {
    const loggedIn = this.$auth.loggedIn
    this.$headerConfig(
      {
        isBack: true,
        isTitle: true,
        title: 'Registro comercio',
        isNotification: loggedIn,
        isMenu: !loggedIn
      },
      loggedIn
    )
  },
}
</script>