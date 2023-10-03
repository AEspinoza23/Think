<template>
  <v-card
    :width="$vuetify.breakpoint.width"
    class="backColor rounded-lg shades-small-card mt-4 mb-3 title--text"
  >
    <v-row class="app-body-large-bold title--text pl-5 py-3" no-gutters>
      <v-col cols="auto">
        {{ $t('affiliates.refer') }}
      </v-col>
    </v-row>
    <v-row class="whiteblue mx-5 title--text" justify="center" no-gutters>
      <v-col cols="auto" class="px-2 py-3">
        {{ $auth.$state.user.referral_code }}
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col class="app-body-medium title--text px-4 py-2 text-center" cols="auto">
        Invita a amigos y ganarás dinero con cada servicio que contraten
      </v-col>
    </v-row>
    <v-row class="mt-3 pb-5" justify="center" no-gutters>
      <v-col cols="auto">
        <profile-affiliates-share-dialog />
      </v-col>
    </v-row>
  </v-card>
</template>

<script></script>
