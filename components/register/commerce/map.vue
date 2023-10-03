<template>
  <div>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.mapPoint" :style="imgStyle" class="mt-11" min-width="370" />
      </v-col>
    </v-row>
   
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="11">
            <span class="app-display-1-bold white--text">
              Ponte en el mapa
            </span>
            <br />
            <span class="app-body-large white--text">
              Si la
            </span>
            <span class="app-body-large-bold white--text">
              dirección es correcta
            </span>
            <span class="app-body-large white--text">
              tu negocio 
            </span>
            <span class="app-body-large-bold white--text">
              debe aparecer bien en este mapa.
            </span>
            <span class="app-body-large-bold white--text">
              Si no, puedes editar la ubicación en el mapa para que nadie se equivoque
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <div class="boxRegister boxBackground pa-5" >
              <v-row no-gutters>
                <v-col cols="12">
                  <app-map
                    :value="{ latitude, longitude }"
                    class="fill-width"
                    @update-lat-lng="changeLatLng"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'CommerceInfo',
  mixins: [Form], 
  props: {
    errorMessages: { type: Array, default: () => [] },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null }
  },
  data:() => ({}),
  computed: {
    imgStyle() {
      return { left: '125px', top: '100px' }
    }
  },
  methods: {
    changeLatLng(val) {
      this.$emit('changeLatLng', val)
    }
  }
}
</script>