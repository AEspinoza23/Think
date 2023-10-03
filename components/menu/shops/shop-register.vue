<template>
  <v-card
    class="rounded-lg shades-small-card consultor mt-8 mb-2"
    color="degradedRadial"
    :width="$vuetify.breakpoint.width"
  >
    <div class="white--text">
      <v-row no-gutters justify="center">
        <v-col cols="auto">
          <v-img
            :lazy-src="$assets.tienda"
            :src="$assets.tienda"
            class="consultor--coins-img"
            width="164px"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2" justify="center">
        <v-col cols="10" class="text-center">
          <div class="app-body-exlarge-bold">
            Hazte COMERCIO PIENSA y disfruta de 
            <span class="primaryTwo--text">innumerables ventajas</span>  
            ahorrando
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="px-5 py-2 text-center" justify="center">
        <v-col cols="auto" class="app-body-medium text-center">
          <div class="app-body-medium">
            Si tienes un 
            <span class="font-weight-bold">COMERCIO</span>, esto te interesa.Te ayudamos a 
            <span class="font-weight-bold">vender más</span> y a 
            <span class="font-weight-bold">conseguir más clientes</span>
            mientras ahorras con nosotros. 
          </div>
        </v-col>
        <v-col cols="auto" class="app-body-medium text-center">
          <span class="font-weight-bold">Regístrate ahora, ¡es GRATIS!</span>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-2">
        <v-col cols="12">
          <app-btn 
            block 
            outlined 
            color="white" 
            @click="openLink"
          >
            Quiero saber más
          </app-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="pb-2 px-2">
        <v-col cols="12">
          <app-btn 
            block 
            :disabled="$auth.$state.user.profile === 6" 
            :to="localePath('/commerce-register')"
          >
            <span class="app-body-medium"> Quiero ser COMERCIO PIENSA </span>
          </app-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ShopsBanner',
  methods: {
    openLink() {
      window.open('https://piensanetwork.com/comerciospiensa-sabermas', '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
.consultor {
  &--coins-img {
    top: -30px;
  }
}
</style>
