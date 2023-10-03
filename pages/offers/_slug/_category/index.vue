<template>
  <div class="offers-category">
    <v-img
      :src="serviceCategory.image? serviceCategory.image.image_400 : ''"
      class="mt-3 rounded-lg"
      height="100px"
      width="100%"
    >
      <div class="start-save--image--bar">
        <v-sheet :color="slug.toLowerCase()" height="3px" width="100vw" />
      </div>
    </v-img>
      <v-row class="ma-0">
        <v-col class="px-0">
          <v-card
            :width="$vuetify.breakpoint.width"
            class="rounded-lg py-0 shades-small-card offers-category&#45;&#45;card"
            color="backColor"
          >
            <v-card-title>{{ $t('dashboard.offers') }}</v-card-title>
            <app-loading v-if="loading" class="pt-5" />
            <v-card-text v-else>
              <v-row class="mx-0" justify="space-between">
                <v-col v-for="(item, index) in list" :key="index" class="px-0" cols="auto">
                  <app-cardOffer
                    :color="item.service.color"
                    :description="item.short_details"
                    :discount="item.discount_value"
                    :discount-type="item.discount_type"
                    :end-date="item.end_date"
                    :price="item.original_price"
                    :rating-avg="item.rating_avg"
                    :rating-count="item.rating_count"
                    :service-title="item.service.name"
                    :start-date="item.start_date"
                    :subtitle="item.title"
                    :title="item.company.name"
                    :offer="item"
                    small
                    @setOffer="haveUrl(item, 'offer')"
                    @contact="haveUrl(item, 'contact')"
                    @study="haveUrl(item, 'study')"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    <!-- <offers-top :is-category="serviceCategory.id" /> -->
    <!-- MENU DIALOG-->
    <offers-menu />
    <!-- Iframe Dialog -->
    <app-iframe 
      :dialog="iframe"
      :url="url"
      @close="iframe = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OffersSlugCategory',
  layout: 'app',
  data: () => ({
    list: [],
    loading: false,
    iframe: false,
    url: ''
  }),
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      serviceCategory: 'services/serviceCategory'
    }),
    slug() {
      return this.$route.params.slug;
    },
    category() {
      return this.$route.params.category;
    },
  },
  async mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    const loggedIn = this.$auth.loggedIn
    this.$headerConfig(
      {
        isBack: true,
        isTitle: true,
        title: this.$route.params.category,
        isNotification: loggedIn,
        isMenu: !loggedIn
      },
      loggedIn
    )
    this.loading = true;
    const response = await this.offersListAction({service_category: this.serviceCategory.id})
    this.list = response.success ? response.data : []
    this.loading = false;
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      offersListAction: 'offers/getOffersList'
    }),
    ...mapMutations({
      offerMutation: 'offers/SET_OFFER'
    }),
    haveUrl(item, type) {
      if (item.url_info) {
        this.url = item.url_info;
        this.iframe = true;
      } else {
        switch (type) {
          case 'offer':
            this.setOffer(item);
            break;
          case 'contact':
            this.openLink(item);
            break;
          case 'study':
            this.GoTo(item);
            break;
        
          default:
            break;
        }
      }
    },
    async setOffer(offer) {
      await this.$router.push(
        this.localePath({
          name: 'offer-slug',
          params: {
            slug: offer.id
          }
        })
      )
    },
    openLink(offer) {
      let link
      if (this.$auth.$state.user.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta%20${offer.title}%20${this.offerUrl(offer)}`
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${offer.title}%20${this.offerUrl(offer)}`
        }
        window.open(link, '_blank')
      } else if (
        this.$auth.$state.user.consultant?.phone_code &&
        this.$auth.$state.user.consultant?.phone_number
      ) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${offer.title}%20${this.offerUrl(offer)}`
        window.open(link, '_blank')
      } else if (offer.contact_link) {
        const whatsapp = offer.contact_link
        link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20la%20oferta:%20${offer.title}%20${this.offerUrl(offer)}`
        window.open(link, '_blank')
      } else {
        this.$flash({
          message:
            'Tú consultor y/o el experto del area no tienen link de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    },
    async GoTo(offer) {
      await this.offerMutation(offer);
      this.$router.push(
        this.localePath({
          name: 'offers-study',
          query: { offer: true }
        })
      )
    },
    offerUrl(offer) {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/offer/${offer.id}`;
      }
      return `https://app.piensanetwork.com/es/offer/${offer.id}`;
    },
  }
}
</script>

<style lang="scss">
.offers-category {
  &--card {
    border-radius: 20px !important;
  }
}
</style>
