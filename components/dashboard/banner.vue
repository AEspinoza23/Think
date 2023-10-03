<template>
  <v-row class="register">
    <v-col>
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 shades-small-card title--text"
        color="degraded"
        dark
      >
        <v-card-text class="pa-4">
          <v-img
            :lazy-src="$assets.money"
            :src="$assets.money"
            class="register--coins-img"
            height="150"
            width="100"
          />
          <v-row no-gutters>
            <v-col cols="auto" class="app-body-exlarge-bold white--text">
              ¡Consigue 1€ gratis en tu saldo ahora!
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" class="app-body-medium pr-14 my-2 white--text">
              Haz clic en el botón “Estudio Gratis” dentro de cada oferta y envíanos tu factura 
              o documento para realizarte el estudio y obtendrás 1€ de forma inmediata.
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto">
              <app-btn class="px-10 py-3" @click="GoTo">
                Ver ofertas
              </app-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardBanner',
  methods: {
    GoTo() {
      this.$router.push(this.localePath('/offers'))
    },
  }
}
</script>

<style lang="scss" scoped>
.register {
  &--coins-img {
    position: absolute;
    width: 100%;
    right: -6px;
    bottom: -17px;
  }
}
</style>
