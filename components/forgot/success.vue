<template>
  <div class="boxLogin boxBackground pa-2 black--text">
    <v-row justify="center" no-gutters>
      <v-col cols="auto">
        <v-img :src="$assets.emailPng" width="130" />
      </v-col>
    </v-row>
    <v-row class="app-body-large-bold my-4" justify="center" no-gutters>
      <v-col cols="auto">
        {{ $t('login.sended') }}
      </v-col>
    </v-row>
    <v-row class="app-body-medium-bold text-center my-4" justify="center" no-gutters>
      <v-col cols="auto">
        {{ $t('login.emailText') }} <br />
        {{ email }}
      </v-col>
    </v-row>
    <v-row class="pb-4" justify="center" no-gutters>
      <v-col cols="auto">
        <div class="app-body-medium text-center my-2">
          {{ $t('login.checkOne') }} <br />
          {{ $t('login.checkTwo') }} <br />
          {{ $t('login.checkThree') }}
        </div>
      </v-col>
    </v-row>
    <v-row class="pb-4" justify="center" no-gutters>
      <v-col cols="auto" class="app-body-medium text-center my-2">
        *{{ $t('login.spamOne') }}, <br />
        {{ $t('login.spamTwo') }}
      </v-col>
    </v-row>
    <v-row class="my-5" justify="center" no-gutters>
      <v-col cols="auto">
        <app-btn color="white" @click="$emit('changeRecover')">
          {{ $t('login.return') }}
        </app-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ForgotSuccess',
  layout: 'login',
  props: {
    email: { type: String, default: ''}
  },
  computed: {
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { 'margin-top': '45%', background: 'rgba(7, 7, 7, 0.2)' }
      } else {
        return { 'margin-top': '45%', background: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  }
}
</script>
