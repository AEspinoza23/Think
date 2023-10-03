<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card card my-2">
    <v-card-title>
      <v-row>
        <v-col cols="4">
          <span class="app-body-large title--text">
            {{ $t('profile.userInfo') }} 
          </span>
        </v-col>
        <v-col cols="6">
          <v-btn text>
            <v-icon class="icon--md">
              {{ $iconsSvg.edit }}
            </v-icon>
            <span class="btnText--text app-body-medium">
              Editar
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="ml-3">
      <v-row class="app-body-large title--text my-2">
        Alberto Martín Zuñiga
      </v-row>
      <v-row class="app-body-large title--text my-2">
        DNI 87709765N
      </v-row>
      <v-row class="app-body-large title--text my-2">
        05/03/1987
      </v-row>
      <v-row class="app-body-large title--text my-2">
        albertomazu@hotmail.com
      </v-row>
    </v-card-text>
  </v-card>
</template>