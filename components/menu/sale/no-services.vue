<template>
  <v-dialog :value="dialog" persistent>
    <v-card color="card" class="container-card mx-0 px-0">
      <v-card-title>
        <v-row justify="space-between" no-gutters>
          <v-col cols="auto">
            <span class="app-body-large-bold"> No puedes solicitar saldo </span>
          </v-col>
          <v-col class="pa-0" cols="auto">
            <v-icon size="30" @click="$emit('close')">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div class="app-body-medium title--text">
          Actualmente 
          <span class="app-body-medium-bold">
            no eres un cliente activo,
          </span> 
          al realizar una contratación, ya eres un cliente activo.
        </div>
        <div class="app-body-medium-bold title--text mt-2">
          Debes contratar al menos un servicio para poder usar tu saldo. 
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-row class="ma-0" justify="center">
          <v-col cols="6" class="d-flex justify-center px-0">
            <app-btn class="button-primary" :to="localePath('offers')">
              Ir a ofertas para continuar
            </app-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: {
    dialog: { type: Boolean, default: false }
  }
}
</script>