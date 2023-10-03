<template>
  <v-card :width="$vuetify.breakpoint.width" class="backColor my-3 rounded-lg shades-general">
    <v-row no-gutters class="pa-2">
      <v-card
        class="rounded-lg shades-small-card white--text pa-3"
        color="degradedRadial"
        :width="$vuetify.breakpoint.width"
      >
        <v-row justify="center" no-gutters>
          <v-col cols="auto">
            <v-img
              :lazy-src="$assets.tienda"
              :src="$assets.tienda"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="app-body-exlarge-bold" justify="center">
          <div>
            Recomienda PIENSA a
          </div>
        </v-row>
        <v-row no-gutters class="app-body-exlarge-bold primaryTwo--text" justify="center">
          <div>
            COMERCIOS de tu zona
          </div>
        </v-row>
        <v-row no-gutters class="app-body-small my-2">
          <div>
            Es <span class="font-weight-bold">GRATIS</span> para ellos, 
            le ayudas a vender más y a conseguir 
            más clientes mientras ahorran y tú 
            <span class="font-weight-bold">
              recibirás un 15% 
            </span>
            de todos los servicios que contrate.
          </div>
        </v-row>
        <v-row no-gutters class="app-body-small mb-2 mt-3">
          <div>
            Descubre 
            <span class="primaryTwo--text" @click="openLink()">
              qué son los COMERCIOS PIENSA
            </span> 
          </div>
        </v-row>
        <v-row no-gutters class="app-body-small my-2">
          <div>
            Comparte en un clic tu enlace a los COMERCIOS que pienses 
            pueden aprovechar esta gran oportunidad.
          </div>
        </v-row>
        <v-row no-gutters>
          <v-btn 
            color="button-primary"
            class="mt-1"
            :to="localePath('pre-register')"
            block
          >
            <span class="app-body-medium white--text">
              Registrarme
            </span>
          </v-btn>
        </v-row>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'DashboardRecommends',
    data: () => ({}),
    methods: {
      openLink() {
        const link = 'https://piensanetwork.com/comerciospiensa-sabermas'
        window.open(link, '_blank')
      }
    }
  }
</script>ofile')