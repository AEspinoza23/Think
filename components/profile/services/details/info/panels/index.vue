<template>
  <div>
    <v-divider class="mx-4 mt-2 placeholder"></v-divider>
    <v-expansion-panels v-model="panels" flat accordion class="pa-0 mb-2" multiple>
      <profile-services-details-info-panels-panel
        :icon="$iconsSvg.services"
        :title="$t('services.hiring')"
        :text="service.offer.hiring_details"
      />
      <profile-services-details-info-panels-panel
        :icon="$iconsSvg.cone"
        :title="$t('services.next')"
        :text="service.offer.next_review"
      />
      <profile-services-details-info-panels-panel
        :icon="$iconsSvg.alertInfo"
        :title="$t('services.details')"
        :text="service.offer.details"
      />
      <profile-services-details-info-panels-panel
        :icon="$iconsSvg.legalsTerms"
        :title="$t('services.legal')"
        :text="service.offer.legal_details"
      />
      <profile-services-details-info-panels-panel
        :icon="$iconsSvg.securePayment"
        :title="$t('services.payment')"
        :text="service.offer.payment_details"
      />
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    service: { type: Object, default: () => {} }
  },
  data: () => ({
    panels: [0, 1, 2, 3, 4]
  })
}
</script>