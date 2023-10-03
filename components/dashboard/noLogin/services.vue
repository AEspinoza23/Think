<template>
  <v-row no-gutters class="my-3">
    <v-col cols="12">
      <v-card :width="$vuetify.breakpoint.width" class="backColor rounded-lg shades-general pa-2">
          <v-card
            :width="$vuetify.breakpoint.width"
            class="rounded-lg shades-small-card"
            color="degradedRed"
            height="auto"
          >
            <v-row class="white--text app-body-exlarge-bold pt-3 pl-3" no-gutters>
              Regístrate para contratar servicios
            </v-row>
            <v-row class="white--text app-body-small pt-2 pl-3" justify="space-between" no-gutters>
              <v-col cols="7">
                <div class="mb-1">
                  ¿Sabías que una persona promedio tiene un
                  <span class="font-weight-bold">
                    potencial de ahorro
                  </span> 
                  de 1.200€ y
                  <span class="white error--text font-weight-bold px-1">3.000€ anuales</span>
                </div>
                <div class="pt-3">
                  ¿A qué estás esperando?
                  <span class="font-weight-bold">
                    Empieza a ahorrar GRATIS con PIENSA
                  </span>  
                </div>
                <v-btn color="white" class="my-2" :to="localePath('pre-register')">
                  <span class="error--text font-weight-bold">
                    Registrarme
                  </span>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-img
                  :src="$assets.onBoard3" 
                />
              </v-col>
            </v-row>
          </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.register {
  &--coins-img {
    position: absolute;
    width: 100%;
    top: -20px;
    right: -15px;
  }
}
</style>
