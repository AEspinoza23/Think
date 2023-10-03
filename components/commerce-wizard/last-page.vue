<template>
  <div>
    <v-row justify="center" align="center">
      <v-img max-height="350px" max-width="350px" :src="$assets.ready"/>
    </v-row>
    <v-row justify="center" class="app-display-1-bold">
      <div class="text-center">
        Listo
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="text-center pa-5">
        <span class="app-body-medium">
          Tu comercio se ha activado y ya estás listo para poder ser encontrado y vender a través de PIENSA
        </span>
      </div>
      <div class="text-center">
        <app-btn :to="localePath('offers')">
          Terminar
        </app-btn>
      </div>
    </v-row>
  </div>
</template>