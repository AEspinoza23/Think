<template>
  <v-card :width="$vuetify.breakpoint.width" class="backColor my-3 rounded-lg shades-general">
    <v-row class="pt-2 pl-3" justify="space-between" no-gutters>
      <v-col cols="8">
        <div class="app-body-exlarge-bold">
          Estudio de ahorro GRATIS
        </div>
        <div class="my-1 app-body-small">
          Recibe tu estudio en 24 horas de cualquier servicio y descubre cuánto puedes ahorrar
        </div>
        <div class="d-flex align-end mt-7 mb-2" block>
          <app-btn block :to="localePath('pre-register')">
            Registrarme
          </app-btn>
        </div>
      </v-col>
      <v-col cols="4">
        <v-img
          :src="$assets.difuminado" 
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {}
</script>