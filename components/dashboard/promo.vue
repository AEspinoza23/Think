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
          <v-row justify="center">
            <v-col cols="auto">
              <v-img
                :lazy-src="$assets.money"
                :src="$assets.money"
                height="132"
                width="86"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-display-1-bold text-center title--text">
              ¡Consigue 1€ gratis en tu saldo ahora!
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-body-medium text-center my-2 title--text">
              Haz clic en el botón “Estudio Gratis” dentro de cada oferta y envíanos tu factura 
              o documento para realizarte el estudio y obtendrás 1€ de forma inmediata.
               <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-icon 
                    size="16" 
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >{{ $icons.alertInfo}}</v-icon>
                </template>
                <div>
                  <v-row no-gutters>
                    <v-col cols="12" class="app-body-small text-center my-2">
                      *Solo para clientes activos con un servicio contratado
                    </v-col>
                    <v-col cols="12" class="app-body-small text-center my-2">
                      *Se puede obtener un maximo de 10€ al mes
                    </v-col>
                  </v-row>
                </div>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-row class="ma-0" justify="center">
          <v-col cols="6" class="d-flex justify-center px-0">
            <app-btn class="button-primary" @click="GoTo">
              Ver ofertas
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
  name: 'DashboardBanner',
  props: {
    dialog: { type: Boolean, default: false }
  },
  methods: {
    ...mapMutations({
      statePromo: 'app/PROMO',
    }),
    GoTo() {
      this.statePromo();
      this.$router.push(this.localePath('/offers'))
    }
  }
}
</script>
