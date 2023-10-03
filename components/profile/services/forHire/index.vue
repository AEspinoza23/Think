<template>
  <v-expansion-panels class="pa-0" multiple>
    <profile-services-panel
      v-for="(service, i) in hiredServicesTypes"
      :key="i"
      class="my-2"
      :color="service.color"
      :title="service.name"
      :icon="serviceIcon(service)"
      :services="forhireServices(service.id)"
    />
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'HiredServices',
  props: {
    services: { type: Array, default: () => ([])},
    servicesTypes: { type: Array, default: () => ([])}
  },
  computed: {
    hiredServicesTypes() {
      const hiredType = []
      /* this.servicesTypes.forEach(element => {
        const index = this.services.findIndex( val => val.offer.service_category === element.id);
        if (index !== -1) {
          hiredType.push(element)
        }
      }); */
      return hiredType;
    }
  },
  methods: {
    serviceIcon(service) {
      return service.small_color_image.svg
    },
    forhireServices(typeId) {
      const forHiree = []
        
      return forHiree;
    }
  }
}
</script>
