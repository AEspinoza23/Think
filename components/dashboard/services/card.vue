<template>
  
  <v-card 
    :width="$vuetify.breakpoint.width" 
    class="backColor mb-3 rounded-lg shades-general"
  >
    <v-card-title v-if="contracted.length > 0">
      <div class="app-heading-1">
        Servicios Contratados
      </div>
    </v-card-title>
    <v-card-text v-if="loading">
      <v-skeleton-loader type="image" class="mt-2"/>
    </v-card-text>
    <v-card-text v-else>
      <dashboard-services-notHired v-if="contracted.length === 0" />
      <dashboard-services-hired v-else :services="contracted" :types="types" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'DashboardServicesCard',
    data: () => ({
      loading: false
    }),
    computed: {
      ...mapGetters({
        servicesList: 'services/servicesList',
        servicesListNext: 'services/servicesListNext'
      }),
      contracted() {
        return this.$auth.$state.user.contracted_offers;
      },
      types() {
        return this.servicesList.results;
      }
    },
    mounted() {
      this.loading = true;
      this.servicesListAction();
      this.loading = false;
    },
    methods: {
      ...mapActions({
        servicesListAction: 'services/getServicesList'
      })
    }
  }
</script>