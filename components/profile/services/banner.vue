<template>
  <v-row class="register" no-gutters>
    <v-col class="px-4">
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg py-0 shades-small-card"
        color="degraded"
        height="135"
        max-height="135"
      >
        <v-card-text class="pt-0">
          <v-row>
            <v-col cols="10">
              <v-row no-gutters>
                <v-col>
                  <span class="app-body-exlarge-bold white--text">
                    Estudio de ahorro gratis
                  </span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="10" class="my-1">
                  <span class="app-body-small white--text" :style="{'line-height': '15px'}">
                    De cualquier sector, te ofrecemos mejores oportunidades de ahorro.
                  </span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="pt-0">
                  <v-btn color="button-primary" @click="GoTo">
                    <span class="app-body-medium white--text px-7"> 
                      Solicitar ahora 
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-img
            :lazy-src="$assets.ready"
            :src="$assets.ready"
            class="register--coins-img"
            width="130"
          />
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
      this.$router.push(this.localePath('offers-study'))
    }
  }
}
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
