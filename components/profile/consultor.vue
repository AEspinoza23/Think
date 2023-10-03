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
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <span class="app-heading-1 white--text"> HAZTE CONSULTOR </span> <br />
                  <span class="app-body-large white--text"> y gana mejores comisiones </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <v-btn color="button-primary">
                    <span class="app-body-medium white--text"> Regístrate </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-row>
                <v-col>
                  <v-img
                    :lazy-src="$assets.cohete"
                    :src="$assets.cohete"
                    class="consultor--coins-img"
                    height="160"
                    width="160"
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
    top: -25px;
    right: 10px;
  }
}
</style>
