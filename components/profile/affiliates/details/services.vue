<template>
  <v-card :width="$vuetify.breakpoint.width" class="rounded-lg py-0 backColor shades-general mt-1 mb-3">
    <v-card-title>
      <span class="app-heading-1">{{ $t('dashboard.services') }}</span>
    </v-card-title>
    <v-card-text v-if="services.length > 0">
      <v-expansion-panels class="pa-0" multiple>
        <profile-services-panel
          v-for="(service, i) in hiredServicesTypes"
          :key="i"
          class="my-2"
          :color="service.color"
          :title="service.name"
          :icon="serviceIcon(service)"
          :services="hiredServices(service.id)"
          is-afiliate
        />
      </v-expansion-panels>
    </v-card-text>
    <v-card-text v-else>
      <span class="app-body-small title--text">
        {{ $t('profile.noServices') }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HiredServices',
  props: {
    services: { type: Array, default: () => []},
    types: { type: Array, default: () => []}
  },
  computed: {
    hiredServicesTypes() {
      const hiredType = []
      this.types.forEach(element => {
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