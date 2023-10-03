<template>
  <v-row class="register">
    <v-col>
      <v-card
        :width="$vuetify.breakpoint.width"
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
                  <span class="app-body-large white--text">
                    Obten los mejores descuentos sin preocuparte de nada
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <v-btn color="button-primary" @click="GoTo">
                    <span class="app-body-medium white--text"> Regístrate </span>
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
                    class="register--coins-img"
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
  name: 'Register',
  methods: {
    GoTo() {
      this.$router.push(this.localePath('/register'))
    },
  }
}
</script>

<style lang="scss" scoped>
.register {
  &--coins-img {
    position: absolute;
    width: 100%;
    top: -10px;
    right: 10px;
  }
}
</style>
