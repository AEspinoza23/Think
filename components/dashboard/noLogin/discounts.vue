<template>
  <v-row class="consultor mt-3">
    <v-col>
      <v-card
        class="rounded-lg py-0 shades-small-card"
        color="degraded"
      >
        <v-card-text class="pt-0">
          <v-row class="">
            <v-col cols="8">
              <v-row>
                <v-col>
                  <div class="app-body-large white--text">
                    Obten los mejores descuentos sin preocuparte de nada
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-2">
                <v-col>
                  <v-btn 
                    color="button-primary" 
                    :to="localePath('pre-register')"
                  >
                    <span class="app-body-medium white--text">
                      Registrarme
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col>
                  <v-img
                    :lazy-src="$assets.monedas"
                    :src="$assets.monedas"
                    class="consultor--coins-img"
                    height="150"
                    width="150"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Consultor'
}
</script>

<style lang="scss" scoped>
.consultor {
  &--coins-img {
    position: absolute;
    width: 100%;
    top: -9px;
    right: -5px;
  }
}
</style>
