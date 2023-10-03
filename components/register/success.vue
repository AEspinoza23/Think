<template>
  <div class="boxLogin boxBackground black--text">
    <v-row justify="center" no-gutters>
      <v-col cols="auto" class="py-5">
        <v-img :lazy-src="$assets.emailPng" :src="$assets.emailPng" width="130" />
      </v-col>
    </v-row>
    <v-row class="app-body-large-bold" justify="center" no-gutters>
      <v-col cols="auto">
        {{ $t('login.verify') }}
      </v-col>
    </v-row>
    <v-row class="app-body-medium-bold text-center" justify="center" no-gutters>
      <v-col cols="auto">
        {{ $t('login.emailSend') }}
      </v-col>
    </v-row>
    <v-row class="app-body-medium-bold text-center" justify="center" no-gutters>
      <v-col cols="auto">
        {{ email }}
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols="9" class="app-body-medium text-center title--text my-4">
        {{ $t('login.emailOne') }}
        {{ $t('login.emailTwo') }}
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters class="px-4">
      <v-col cols="10" class="app-body-medium text-center title--text mt-2">
        *{{ $t('login.spamOne') }}, 
        {{ $t('login.spamTwo') }}
      </v-col>
    </v-row>
    <v-row class="py-5" justify="center" no-gutters>
      <v-col cols="auto">
        <v-col cols="auto">
          <app-btn color="white" @click="GoTo">
            Iniciar sesión
          </app-btn>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
  layout: 'login',
  props: {
    email: { type: String, default: 'email@email.com' }
  },
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
    GoTo() {
      this.$router.push(this.localePath('/login'))
    }
  }
}
</script>
