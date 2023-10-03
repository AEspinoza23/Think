<template>
  <v-card
    width="100%"
    color="backColor"
    elevation="0"
    class="py-2 title--text"
    :to="localePath({ name: `profile-affiliates-details-slug`, params: { slug: affiliate.id } })"
  >
    <v-row no-gutters>
      <v-col cols="2">
        <v-avatar rounded="lg" size="40px">
          <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
          <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="7" class=" text-truncate">
        <v-row class="app-body-medium-bold" no-gutters>
          {{ affiliateName }}
        </v-row>
        <v-row class="app-body-exsmall my-1 secondary--text" no-gutters> SE HIZO PENSADOR EL </v-row>
        <v-row class="app-body-small" no-gutters> {{ affiliateDate }} </v-row>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <div v-for="(service, i) in servicesToShow" :key="i">
          <v-img min-width="20px" max-width="20px" :src="service.small_color_image.svg"></v-img>
        </div>
        <v-sheet
          v-if="hiredServices.length > 2" 
          color="primary" 
          class="white--text rounded app-body-medium-bold px-1" 
          :style="{height: '20px', 'padding-top': '1px', 'letter-spacing': '-1px'}"
        >
          + {{ hiredServices.length - 2 }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AffiliatesRow',
  props: {
    affiliate: { type: Object, default: () => ({}) }
  },
  computed: {
    ...mapGetters({
      servicesList: 'services/servicesList'
    }),
    servicesTypes() {
      return this.servicesList.results;
    },
    imageSrc() {
      let image = null;
      if (this.affiliate.avatar != null) {
        image = this.affiliate.avatar.image_xs;
      }
      return image
    },
    hiredServices() {
      const hiredType = []
      this.servicesTypes.forEach(element => {
        const index = this.affiliate.contracted_offers.findIndex( val => val.offer.service === element.id);
        if (index !== -1) {
          hiredType.push(element)
        }
      });
      return hiredType;
    },
    servicesToShow() {
      const element = []
      this.hiredServices.slice(0, 2).forEach((item) => {
        element.push(item)
      })
      return element
    },
    affiliateName() {
      let fullname = this.affiliate.first_name;
      if (this.affiliate.middle_name !== null && this.affiliate.middle_name !== undefined) {
        fullname = fullname + ' ' + this.affiliate.middle_name;
      }
      if (this.affiliate.last_name !== null && this.affiliate.last_name !== undefined) {
        fullname = fullname + ' ' + this.affiliate.last_name;
      }
      return fullname
    },
    affiliateDate() {
      const date = this.$dateFns.format(this.affiliate.date_joined, "dd-MM-yyyy");
      return date
    }
  }
}
</script>
