<template>
  <v-expansion-panels class="pa-0 rounded-xl" accordion multiple flat>
    <profile-services-panel
      v-for="(service, i) in hiredServicesTypes"
      :key="i"
      class="my-1"
      :color="service.color"
      :title="service.name"
      :icon="serviceIcon(service)"
      :services="hiredServices(service.id)"
      :service-type="service"
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
      this.servicesTypes.forEach(element => {
        const index = this.services.findIndex( val => val.offer.service === element.id);
        if (index !== -1) {
          hiredType.push(element)
        }
      });
      return hiredType;
    }
  },
  methods: {
    serviceIcon(service) {
      return service.small_color_image.svg
    },
    hiredServices(typeId) {
      const hired = []
      this.services.forEach(element => {
        if (element.offer.service === typeId) {
          hired.push(element)
        }
      });
      return hired;
    }
  }
}
</script>

<style>
.v-expansion-panel:not(:first-child)::after {
  border: none !important;
}
</style>