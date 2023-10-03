<template>
  <v-row class="consultor">
    <v-col>
      <v-card
        class="rounded-lg py-0 shades-small-card"
        color="degraded"
        height="135"
        max-height="135"
      >
        <v-card-text class="pt-0">
          <v-row class="py-3">
            <v-col cols="7">
              <v-row>
                <v-col>
                  <span class="app-body-large white--text"> 
                    Solicita un 
                    <span class="app-body-large-bold white--text">
                      estudio gratis
                    </span> 
                    sin compromiso
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <v-btn 
                    color="button-primary" 
                    :to="localePath('offers-study')"
                  >
                    <span class="app-body-medium white--text">
                      Solicitar Estudio
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
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
