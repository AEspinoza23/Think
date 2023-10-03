<template>
  <div class="backColor rounded-lg">
    <v-row class="app-heading-1-bold" no-gutters>
      <v-col cols="auto" class="pa-3">
        {{ title }}
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-slide-group v-model="model2" :show-arrows="false" class="pa-0">
          <v-slide-item v-for="(item, index) in offers" :key="index">
            <v-col class="px-2">
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
                @setOffer="haveUrl(item, 'offer')"
                @contact="haveUrl(item, 'contact')"
                @study="haveUrl(item, 'study')"
              />
            </v-col>
          </v-slide-item>
          <v-slide-item v-if="!loading" v-intersect.quiet="onIntersect">
            <v-col cols="4">
            </v-col>
          </v-slide-item>
          <v-slide-item v-if="loading">
            <v-col cols="4">
              <v-skeleton-loader
                height="325"
                width="200"
                type="card-avatar, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <!-- Iframe Dialog -->
    <app-iframe 
      :dialog="iframe"
      :url="url"
      @close="iframe = false"
    />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { mapMutations } from 'vuex';

export default {
  name: 'CurrentOffer',

  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    offers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      model2: null,
      model: null,
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      url: '',
      iframe: false
    }
  },
  methods: {
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
    onIntersect (entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
      this.$emit('fetch');
    },
  }
}
</script>

<style lang="scss" scoped></style>
