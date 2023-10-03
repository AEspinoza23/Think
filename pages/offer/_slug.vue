<template>
  <div>
    <SocialHead
      :title="'Piensa App - ' + seo.title || ''"
      :description="seo.description || ''"
      :image="seo.image"
    />
    <!-- eslint-disable vue/no-v-html -->
    <v-skeleton-loader v-if="loading" type="card-avatar, article, actions" class="pt-5" />
    <div v-else class="offers-details">
      <v-card 
        :width="$vuetify.breakpoint.width"
        class="rounded-lg backColor shades-general mt-3 mb-3"
      >
        <v-card-title class="shades-small-card mb-3 pa-0">
          <v-img height="170px" :lazy-src="imageSrc" :src="imageSrc">
            <app-headerRate
              v-if="offerInfo"
              :color="offerInfo.color || ''"
              :title="offerInfo.name || ''"
              :rating-avg="offer.rating_avg || 0"
              :rating-count="offer.rating_count || 0"
              :rated="true"
              full
            />
          </v-img>
        </v-card-title>
        <v-card-text class="rounded-t-lg shades-small-card px-2">
          <!-- TITLE AND SUBTITLE-->
          <v-row class="mt-0 px-7 py-4" justify="space-between">
            <span class="title--text font-weight-bold">
              {{ offer.company ? offer.company.name : '' }}
            </span>
            <vue-js-countdown :deadline="offer.end_date || ''">
              <template #default="{ days, hours, minutes, seconds }">
                <span :class="`${expiredColor(hours)} app-body-small-bold mr-1`">
                  {{ days }}d{{ hours }}h{{ minutes }}m{{ seconds }}s
                </span>
              </template>
            </vue-js-countdown>
            <offers-share v-if="!loading" :offer-id="offer.id" />
          </v-row>

          <!-- OFFER TITLE-->
          <v-row no-gutters class="px-4">
            <v-col>
              <span class="app-heading-1 title--text">{{ offer.subtitle }}</span>
            </v-col>
          </v-row>
          <!-- OFFER DISCOUNT-->
          <v-row class="mt-3 px-4" no-gutters align="center" justify="space-between">
            <v-col cols="auto">
              <span class="app-display-2-bold title--text">
                {{ totalPrice | appCurrency }}
              </span>
            </v-col>
            <v-col cols="auto">
              <v-row no-gutters>
                <v-col
                  cols="auto"
                  class="title--text midOpacity app-body-small-bold text-decoration-line-through"
                >
                  Antes {{ offer.original_price | appCurrency }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <span v-if="offer.discount_value || offer.discount_value != 0">
                  <span
                    v-if="offer.discount_type === 1"
                    class="title--text midOpacity app-body-medium"
                  >
                    {{ offer.discount_value | appCurrency }} descuento
                  </span>
                  <span
                    v-if="offer.discount_type === 2"
                    class="title--text midOpacity app-body-medium-bold"
                  >
                    -{{
                      offer.discount_value >= 1
                        ? parseInt(offer.discount_value)
                        : parseFloat(offer.discount_value).toFixed(2)
                    }}% descuento
                  </span>
                </span>
              </v-row>
            </v-col>
          </v-row>
          <offers-banner :amount="offer.balance_for_sharing" :offer-id="offer.id" />
        </v-card-text>
      </v-card>
      <v-card 
        :width="$vuetify.breakpoint.width"
        class="rounded-lg backColor shades-general mt-1 mb-3"
      >
        <v-card-text>
          <v-row class="my-0" justify="center">
            <v-divider class="mx-4 mt-3 placeholder"></v-divider>
            <v-expansion-panels v-model="panels" class="mb-2" flat accordion multiple tile>
              <v-expansion-panel>
                <v-expansion-panel-header color="backColor">
                  <v-row>
                    <v-col class="py-0" cols="auto">
                      <v-icon class="icon--md">{{ $iconsSvg.alertInfo }}</v-icon>
                    </v-col>
                    <v-col class="py-0">
                      <span class="app-body-medium-medium title--text">Detalles</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="backColor">
                  <v-row class="ma-0" justify="center">
                    <v-col cols="11">
                      <span class="app-body-medium title--text" v-html="offer.details"> </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider class="mx-4 placeholder"></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header color="backColor">
                  <v-row>
                    <v-col class="py-0" cols="auto">
                      <div>
                        <v-icon class="icon--md">{{ $iconsSvg.legalsTerms }}</v-icon>
                      </div>
                    </v-col>
                    <v-col class="py-0">
                      <span class="app-body-medium-medium title--text"> Términos Legales </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="backColor">
                  <v-row class="ma-0" justify="center">
                    <v-col cols="11">
                      <span class="app-body-medium title--text" v-html="offer.legal_details">
                      </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider class="mx-4 placeholder"></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header color="backColor">
                  <v-row>
                    <v-col class="py-0" cols="auto">
                      <v-icon class="icon--md">{{ $iconsSvg.securePayment }}</v-icon>
                    </v-col>
                    <v-col class="py-0">
                      <span class="app-body-medium-medium title--text">
                        Pago Seguro y Garantía
                      </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="backColor">
                  <v-row class="ma-0" justify="center">
                    <v-col cols="11">
                      <span class="app-body-medium title--text" v-html="offer.payment_details">
                      </span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider class="mx-4 placeholder"></v-divider>
            </v-expansion-panels>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- MENU DIALOG-->
      <profile-services-details-comments :class="$isIOS ? 'mt-2 mb-12 pb-5' : 'mt-2 mb-10'" :service="offer" is-offer />
      <offers-menu />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueJsCountdown from '~/components/vuejs-countdown'
import SocialHead from '~/components/seoHeads'
import Form from '~/mixins/form'

export default {
  name: 'OffersDetails',
  components: { SocialHead, VueJsCountdown },
  mixins: [Form],
  layout: 'app',
  middleware: 'auth',
  auth: false,
  asyncData({ params, $axios }) {
    const seo = {
      image: '',
      title: '',
      description: '.'
    }

    return $axios
      .get(`/api/offers/public-offers/${params.slug}/get_link_details/`, {
        baseURL: 'https://piensa-pre.sfsl.es',
        browserBaseURL: 'https://piensa-pre.sfsl.es'
      })
      .then((response) => {
        const data = (response && response.data) || {}
        return {
          seo: {
            image: data.image?.image_400 || data.image?.svg || '',
            title: data.title || '',
            description: data.description || ''
          }
        }
      })
      .catch((e) => {
        return { seo }
      })
  },
  data: () => ({
    loading: false,
    panels: []
  }),
  head() {
    return {
      title: 'Piensa App - ' + this.seo.title || ''
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      offer: 'offers/offer'
    }),
    loggedIn() {
      return this.$auth.loggedIn
    },
    offerInfo() {
      return this.offer.service || {}
    },
    referralCode() {
      if (this.$route.query.referral_code) {
        return this.$route.query.referral_code
      }
      return ''
    },
    totalPrice() {
      let value = 0
      const original = parseFloat(this.offer.original_price)
      const discount = parseFloat(this.offer.discount_value)
      if (this.offer.discount_type === 1) {
        value = original - discount
      } else if (this.offer.discount_type === 2) {
        value = (original * discount) / 100
        value = original - value
      }
      return value
    },
    slug() {
      return this.$route.params.slug
    },
    url() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/offer/${this.slug}`;
      }
      return `https://piensa-pre.sfsl.es/es/offer/${this.slug}`;
    },
    imageSrc() {
      if (this.offer.image) {
        return this.offer.image.image_400
      } else if (this.offer) {
        if (this.offer.service_category) {
          if (this.offer.service_category.image) {
            if (this.offer.service_category.image.svg !== null) {
              return this.offer.service_category.image.svg
            } else {
              return this.offer.service_category.image.image_400
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  async mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    await this.fetchOffer()
    const loggedIn = this.$auth.loggedIn
    const menu = !this.$auth.loggedIn
    this.$headerConfig(
      {
        isBack: true,
        isTitle: true,
        title: this.offer.title,
        isNotification: loggedIn,
        isMenu: menu
      },
      loggedIn
    )
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      getOffer: 'offers/getOffer'
    }),
    async fetchOffer() {
      this.loading = true
      const { success } = await this.getOffer(this.slug);
      if (!success) {
        this.$flash({
          message:
            'Oferta no encontrada, podría estar inactiva o no existir',
          color: 'error',
          type: 'error'
        })
      }
      this.loading = false
    },
    expiredColor(time) {
      if (time <= 6) {
        return 'red--text'
      } else if (time <= 12) {
        return 'orange--text'
      } else if (time > 12) {
        return 'green--text'
      } else {
        return ''
      }
    }
  }
}
</script>
