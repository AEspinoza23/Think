<template>
  <v-card
    class="rounded-lg shades-small-card"
    color="degraded"
  >
    <v-card-text>
      <v-row no-gutters class="white--text" justify="center" align="center">
        <v-col cols="12">
          <v-row no-gutters class="app-body-exlarge-bold">
            Este es tu código de referido
          </v-row>
          <v-row class="whiteblue my-2 title--text rounded-lg" justify="center" no-gutters>
            <v-col cols="auto" class="px-2 py-3 app-body-medium-bold">
              {{ $auth.$state.user.referral_code }}
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7">
          <v-row no-gutters class="app-body-small my-2">
            <div>
              <span class="font-weight-bold">
                Invita a tus amigos y ganarás dinero
              </span>
              <br />
               con cada servicio que contraten.
              <br />
              <span class="font-weight-bold">
                ¡Cuanto más ahorren, más ganarás!
              </span>
            </div>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <profile-affiliates-share-dialog />
            </v-col>
          </v-row>
          <v-row no-gutters class="app-body-small my-2">
            <div>
              ¡Empieza a ganar dinero con PIENSA en tan solo un clic!
            </div>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-img
            :lazy-src="$assets.atraer"
            :src="$assets.atraer"
            max-width="200"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'OfferBanner',
  data: () => ({})
}
</script>