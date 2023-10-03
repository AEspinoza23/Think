<template>
  <v-dialog width="351px" :value="dialog" persistent>
    <v-card color="backColor" class="mx-0 px-0">
      <v-card-title>
        <v-row justify="space-between" no-gutters>
          <v-col cols="auto">
            <span class="app-body-medium"> <v-icon size="20">{{ $icons.offer}}</v-icon> </span>
            <span class="app-body-medium"> Promo </span>
          </v-col>
          <v-col class="pa-0" cols="auto">
            <v-icon size="25" @click="$emit('close')">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div>
          <v-row no-gutters>
            <v-col cols="12" class="app-display-1-bold text-center title--text">
              Hazte franquiciado PIENSA
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="auto" class="my-1">
              <v-img
                :lazy-src="$assets.maletaDinero"
                :src="$assets.maletaDinero"
                height="120"
                width="120"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-body-medium my-2 title--text">
              Emprende en un modelo de negocio 
              <span class="font-weight-bold">sin riesgo y anticrisis</span> 
              vendiendo servicios que todo el mundo consume y con todo el apoyo de PIENSA y 
              toda nuestra Comunidad.
            </v-col>
            <v-col cols="12" class="app-body-medium my-2 title--text">
              Sé tu propio jefe y consigue tus sueños más rápido. 
              Tú eliges hasta dónde quieres llegar
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-row class="ma-0" justify="center" no-gutters>
          <v-col cols="12">
            <app-btn class="button-primary" block @click="GoTo">
              Quiero ser franquiciado
            </app-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {  mapMutations } from 'vuex'
export default {
  name: 'DashboardBannerFranchise',
  props: {
    dialog: { type: Boolean, default: false }
  },
  methods: {
    ...mapMutations({
      statePromoFour: 'app/PROMO_FOUR',
    }),
    GoTo() {
      this.statePromoFour()
      const link = 'https://piensanetwork.com/franquicia-piensa'
      window.open(link, '_blank')
    }
  }
}
</script>