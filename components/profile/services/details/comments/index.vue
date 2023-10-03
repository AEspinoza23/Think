<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card backColor rouneded-lg">
    <v-card-title>
      <span class="app-body-medium-bold title--text">
        {{ $t('services.valorations') }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-row justify="space-between" align="center" no-gutters>
        <v-col cols="auto" class="mb-5 ml-3">
          <v-row>
            <v-rating
              color="#F2C94C"
              background-color="#F2C94C"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              half-increments
              hover
              dense
              size="15"
              :value="service.rating_avg"
              readonly
            ></v-rating>
          </v-row>
          <v-row class="app-body-small-bold title--text">
            {{ service.rating_count }} 
            <span>
              &nbsp;
              {{ $t('services.valorations') }}
            </span>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <app-select v-model="filter" :items="filters" medium ></app-select>
        </v-col>
      </v-row>
      <profile-services-details-comments-row 
        v-for="(rating, i) in filterComments" 
        :key="i"
        :rating="rating"
        :service="service"
        :is-offer="isOffer"
        @changeToForm="changeToForm"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ServiceComments',
  props: {
    service: { type: Object, default: () => ({})},
    isOffer: { type: Boolean, default: false}
  },
  data: () => ({
    filters: [
      { text: '', value: null },
      { text: 'profile.mostRecent', value: 'recent' },
      { text: 'profile.mostImportant', value: 'important' }
    ],
    filter: null
  }),
  computed: {
    filterComments() {
      let copy = [];
      if (this.service.feedbacks) {
        copy = [...this.service.feedbacks]
        if (this.filter === 'recent') {
          return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (this.filter === 'important')  {
          return copy.sort((a, b) => new Date(b.rating) -new Date(a.rating));
        }
        return copy;
      }
      return copy;
    }
  },
  methods: {
    changeToForm(val){
      this.$emit('changeToForm', val)
    }
  }
}
</script>