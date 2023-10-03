<template>
  <v-card 
    :width="$vuetify.breakpoint.width" 
    class="mt-1 mb-3 backColor rounded-lg shades-small-card"
  >
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="auto" class="pl-2 py-1 app-body-large-bold title--text">
          {{ $t('affiliates.list') }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="affiliates.length > 0">
      <v-row no-gutters>
        <v-col cols="12">
          <app-search v-model="search" class="mx-2" />
        </v-col>
      </v-row>
      <v-row 
        justify="space-between" 
        no-gutters
      >
        <v-col cols="auto" class="mb-5">
          {{ affiliates.length }} 
          {{ affiliates.length === 1 ? 'Afiliado' : 'Afiliados'}}
        </v-col>
      </v-row>
      <v-row v-for="(affiliate, i) in afilliatesList" :key="i" no-gutters>
        <profile-affiliates-row :affiliate="affiliate" />
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-row justify="center">
        <v-col cols="6">
          <v-img min-width="100px" :src="$assets.referidos" />
        </v-col>
      </v-row>
      <v-row class="app-body-small my-2 text-center title--text" justify="center">
        {{ $t('affiliates.none') }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AffiliatesList',
  props: {
    affiliates: { type: Array, default: () => ([])}
  },
  data: () => ({
    search: ''
  }),
  computed: {
    afilliatesList() {
      const list = []
      this.affiliates.forEach((element) => {
        let fullname = element.first_name;
        if (element.middle_name !== null && element.middle_name !== undefined) {
          fullname = fullname + ' ' + element.middle_name;
        }
        if (element.last_name !== null && element.last_name !== undefined) {
          fullname = fullname + ' ' + element.last_name;
        }
        const nameLower = fullname.toLowerCase() 
        const searchLower = this.search.toLowerCase()
        const index = nameLower.search(searchLower);
        if (index !== -1) {
          list.push(element)
        }
      });
      return list
    }
  }
}
</script>
