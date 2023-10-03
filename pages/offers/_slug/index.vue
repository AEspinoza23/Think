<template>
  <div class="background pb-5">
    <v-row 
      v-if="service.available_offers" 
      justify="center" 
      no-gutters
      class="rounded-lg"
    >
      <v-col
        v-for="(item, index) in service.categories"
        :key="index"
        cols="auto"
        :style="{ 
          'background-image': 'url(' + returnImage(item) + ')', 
          'background-size': 'cover',
          height: '96px',
          width: '335px'
        }"
        class="my-3 rounded-lg"
      >
        <v-card
          v-if="item.active"
          class="shades-small-card d-flex justify-center layerCategory filter rounded-lg"
          rounded="lg"
          color="transparent"
          height="96px"
          width="335px"
          @click="haveUrl(item)"
        > 
          <div class="layered rounded-lg"></div>
          <v-row justify="space-between" align="center" class="indexfortext">
            <v-col cols="8" class="ml-4 black--text">
              <div class="app-body-exlarge-bold">
                {{ item.name }}
              </div>
              <div class="app-body-small">
                {{ item.offer_count }} Ofertas disponibles
              </div>
            </v-col>
            <v-col cols="auto" class="mr-4" style="">
              <v-row no-gutters>
                <app-btn fab icon="mdi-chevron-right" small />
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="ma-0 py-3 card" justify="center">
      <span class="app-display-1 title--text"> Próximamente </span>
    </v-row>
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
  name: 'OfferType',
  layout: 'app',
  data: () => ({
    iframe: false,
    url: ''
  }),
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      service: 'services/service'
    })
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    const loggedIn = this.$auth.loggedIn
    this.$headerConfig(
      {
        showTypes: true,
        isOffers: true,
        isBack: true,
        isTitle: true,
        title: this.service.name,
        isNotification: loggedIn,
        isMenu: !loggedIn
      },
      loggedIn
    )
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    }),
    ...mapMutations({
      setServiceCategoryMutation: 'services/SET_SERVICE_CATEGORY'
    }),
    returnImage(item) {
      return item.image?.image_400 || item.image?.svg || '';
    },
    haveUrl(item) {
      if (item.url_info) {
        this.url = item.url_info;
        this.iframe = true;
      } else {
        this.setServiceCategory(item);
      }
    },
    setServiceCategory(item) {
      this.setServiceCategoryMutation(item)
      this.$router.push(
        this.localePath({
          name: 'offers-slug-category',
          params: {
            category: item.name
          }
        })
      )
    }
  }
}
</script>

<style lang="scss">
.filter {
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
}

.layered {
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 32.48%, #FFF 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.indexfortext {
  z-index: 9999;
}
</style>
