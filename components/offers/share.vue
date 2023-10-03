<template>
  <div>
    <slot name="shareDialog">
      <v-row no-gutters justify="center">
        <v-icon class="icon--sm" color="primary" @click="showDialog()">
          {{ $iconsSvg.share }}
        </v-icon>
      </v-row>
      <v-row no-gutters justify="center">
        <div class="app-label primary--text">
          {{ $t('services.share') }}
        </div>
      </v-row>
    </slot>
    <v-bottom-sheet v-model="dialog" inset>
      <v-card class="card" width="100%">
        <v-card-title>
          <v-row>
            <v-col cols="auto">
              <v-icon class="icon--lg">{{ $iconsSvg.icon }}</v-icon>
            </v-col>
            <v-col class="app-body-medium py-6" cols="auto">
              <v-row class="title--text font-weight-bold">
                Comparte esta oferta y gana dinero ahora
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="my-7 text-center" justify="space-around" no-gutters>
            <v-col v-for="(network, i) in networks" :key="i" cols="2">
              <ShareNetwork
                :network="network.name"
                :url="url"
                description="Ver oferta"
                title="Mira lo que acabo de encontrar en Piensa:"
                quote="Mira lo que acabo de encontrar en Piensa:"
              >
                <v-row no-gutters>
                  <v-col class="py-0">
                    <v-avatar rounded size="46px">
                      <img :alt="network.name" :src="network.image" />
                    </v-avatar>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="app-label mt-2 title--text">
                    <span>{{ network.name }}</span>
                  </v-col>
                </v-row>
              </ShareNetwork>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <app-btn outlined @click="copyToClipboard">
                <span class="title--text app-body-medium-bold"> Copiar enlace</span>
                <v-icon class="icon--xl">{{ $iconsSvg.copy }}</v-icon>
              </app-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'ShareDialog',
  props: {
    offerId: { type: [Number, String], default: '' },
    image: {
      type: String,
      default: 'https://nuxtjs.org/nuxt-card.png'
    }
  },
  data: () => ({
    dialog: false,
    networks: []
  }),
  computed: {
    referralCode() {
      if (this.$auth.loggedIn) {
        return this.$auth.$state.user.referral_code
      } 
      return '';
    },
    url() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/offer/${this.offerId}/?referral_code=${this.referralCode}`;
      }
      return `https://piensa-pre.sfsl.es/es/offer/${this.offerId}/?referral_code=${this.referralCode}`;
    }
  },
  mounted() {
    this.networks = [
      {
        name: 'Facebook',
        image: this.$assets.facebook
      },
      {
        name: 'Twitter',
        image: this.$assets.twitter
      },
      {
        name: 'Whatsapp',
        image: this.$assets.whatsapp
      },
      {
        name: 'Telegram',
        image: this.$assets.telegram
      },
      {
        name: 'Email',
        image: this.$assets.mail
      }
    ]
  },
  methods: {
    showDialog() {
      document.activeElement.blur();
      this.dialog = !this.dialog
    },
    copyToClipboard() {
      let success = false;
      success = navigator.clipboard.writeText(this.url);
      try {
        // eslint-disable-next-line no-undef
        NativeAndroid.copyToClipboard(this.url);
      } catch (error) {
        console.log(error);
      }
      if (success) {
        this.$flash({
          message: 'Url copiada satisfactoriamente',
          color: 'success'
        })
      } else {
        this.$flash({
          message: 'No se pudo copiar url',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.panelDiv {
  .v-icon {
    height: 30px;
  }
}
a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }
</style>
