<template>
  <div class="pa-4">
    <v-row justify="center" align="center" class="pt-4">
      <v-img min-width="134px" max-width="134px" :src="$assets.mapPoint" />
    </v-row>
    <v-row justify="center" class="app-display-1-bold">
      <div class="text-center">
        Comprueba el mapa
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="px-4">
        <span class="app-body-medium">
          Si la dirección es correcta tu negocio debe aparecer bien en este mapa. 
          Si no, puedes editar la ubicación en el mapa para que nadie se equivoque
        </span>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-3">
        <app-map
          :value="{ latitude, longitude }"
          class="fill-width"
          @update-lat-lng="changeLatLng"
        />
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
  methods: {
    changeLatLng(val) {
      this.$emit('changeLatLng', val)
    }
  }
}
</script>