<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card card my-2">
    <v-card-title>
      <span class="app-body-large title--text">
        {{ $t('profile.address') }}
      </span>
    </v-card-title>
    <v-card-text>
      <profile-details-fields-address />
    </v-card-text>
  </v-card>
</template>