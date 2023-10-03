<template>
  <v-card
    class="rounded-lg mt-3 shades-small-card"
    color="degraded"
  >
    <v-card-text>
      <v-row no-gutters class="white--text" justify="center">
        <v-col cols="12">
          <v-row no-gutters class="app-body-exlarge-bold">
            Gana dinero por compartir esta oferta
          </v-row>
        </v-col>
        <v-col cols="7">
          <v-row no-gutters class="app-body-medium my-2">
            <div>
              Comparte en un clic esta oferta con todos tus amigos y 
              <span class="primaryThree--text white">
                gana {{ amount | appCurrency }}
              </span>
              por cada amigo que la contrate
            </div>
          </v-row>
          <v-row no-gutters class="app-body-medium my-3">
            <div>
              ¿Tienes 10 amigos? Puedes conseguir 
              <span class="primaryThree--text white">
                hasta {{ amount * 10 | appCurrency }}
              </span>
            </div>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <offers-shareBanner :offer-id="offerId"  />
            </v-col>
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
  props: {
    amount: {
      type: Number,
      default: 0
    },
    offerId: { type: [Number, String], default: '' },
  },
  data: () => ({})
}
</script>