<template>
  <div class="mt-5 fadeIn">
    <!-- Old Offers -->
    <!--DISABLE REGISTER WHEN IS USER LOGGED-->
    <!-- <dashboard-noLogin-discounts v-if="!$auth.loggedIn" /> -->

    <!--TOP OFFERS-->
    <!-- <offers-top /> -->

    <!-- NEXT OFFERS-->
    <!-- <offers-next-offers :is-current-offer="true" :title="'Ofertas vigentes'" /> -->

    <!-- <offers-next-offers :is-current-offer="false" :title="'Proximas Ofertas'" class="pt-5" /> -->
    <!-- MENU DIALOG-->
    <!-- <offers-menu /> -->

    <!-- New offers Display -->
    <v-img 
      v-for="(service, i) in list"
      :key="i"
      class="my-3 pl-4 rounded-lg"
      :lazy-src="service.background_image ? service.background_image.image_xs : ''"
      :src="service.background_image? service.background_image.image_400 : ''"  
      height="158px" 
      :width="$vuetify.breakpoint.width"
      :style="{'border-bottom': `5px solid ${service.color}`}"
      @click="setService(service)"
    >
      <div 
        :class="`layer`" 
        :style="{ background: service.color}"
      ></div>
      <div class="mt-6">
        <span class="nameBox">
          {{ service.name }}
        </span>
      </div>
      <div class="mt-16">
        <span class="descriptionBox">
          {{ service.description }} 
        </span>
      </div>
    </v-img >
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Offers',
  layout: 'app',
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      servicesList: 'services/servicesList'
    }),
    list() {
      return this.servicesList.results
    }
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    const menu = !this.$auth.loggedIn
    const loggedIn = this.$auth.loggedIn
    this.$headerConfig({
      isBack: true,
      isTitle: false,
      isNotification: true,
      isMenu: menu
    }, loggedIn)
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    }),
    ...mapMutations({
      setServiceMutation: 'services/SET_SERVICE'
    }),
    setService(item) {
      this.setServiceMutation(item)
      this.$router.push(
        this.localePath({
          name: 'offers-slug',
          params: {
            slug: item.name
          }
        })
      )
    }
  }
}
</script>

<style scoped>
.nameBox {
  border-radius: 5px;
  background: var(--light-theme-secondary-tittle, #1C2D38);
  color: white;
  padding: 7px 14px;
  align-items: center;
  position: absolute;
}

.descriptionBox {
  border-radius: 5px;
  background: #1C2D3840;
  padding: 7px 10px;
  align-items: center;
  color: white;
  position: absolute;
  margin-top: 40px;
}
</style>
