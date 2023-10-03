<template>
  <v-slide-group v-model="model" :show-arrows="false" active-class="success" class="pa-0">
    <v-slide-item v-for="item in list" :key="item.id" :value="item">
      <v-col @click="setService(item)">
        <v-row justify="center">
          <v-col class="py-1" cols="auto">
            <div>
              <v-img
                v-if="item.first_dark_image || item.first_light_image"
                :lazy-src="isDarkTheme ? item.first_dark_image.svg : item.first_light_image.svg"
                :src="isDarkTheme ? item.first_dark_image.svg : item.first_light_image.svg"
                class="icon--exl"
                height="45"
                width="45"
              />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="py-0 d-flex align-center" cols="auto">
            <span 
            :class="
              $route.params.slug === item.name ? 'app-label-bold text-capitalize' : 'app-body-small text-capitalize'
            ">
              {{ item.name }}
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OffersTypeSlider',
  props: {
    fetchTypes: { type: Boolean, default: false }
  },
  data() {
    return {
      model: null,
      data: []
    }
  },
  computed: {
    ...mapGetters({
      isDarkTheme: 'app/isDark',
      servicesList: 'services/servicesList',
      servicesListNext: 'services/servicesListNext'
    }),
    list() {
      return this.servicesList.results
    },
    next() {
      return this.servicesListNext
    }
  },
  async mounted() {
    if (this.fetchTypes && this.next) {
      await this.servicesListAction();
    }
  },
  methods: {
    ...mapActions({
      servicesListAction: 'services/getServicesList'
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
