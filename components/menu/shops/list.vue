<template>
  <v-row no-gutters justify="space-between" class="mt-5 px-2">
    <v-col cols="auto" class="app-heading-1-bold title--text">
      {{ title || 'Comercios piensa' }}
    </v-col>
    <v-col cols="auto">
      <menu-shops-filters :types="types" @applyFilter="setFilters" />
    </v-col>
    <v-col v-if="list.length > 0" cols="12" class="app-body-large title--text ml-3 mb-4">
      {{ count }} Comercios disponibles
    </v-col>
    <menu-shops-commerces 
      :list="list" 
      :loading="loading" 
      :page-number="pageNumber"
      :actual-page="actualPage"
      @changePage="changePage"
      @searchType="searchType"
      @seeCommerce="seeCommerce"
    />
  </v-row>
</template>

<script>
export default {
  props: {
    list: { type: Array, default:() => [] },
    types: { type: Array, default:() => [] },
    loading: { type: Boolean, default: false },
    pageNumber: { type: Number, default: null },
    actualPage: { type: Number, default: null },
    count: { type: Number, default: null },
    title: { type: String, default: null },
  },
  methods: {
    setFilters(val) {
      this.$emit('applyFilter', val)
    },
    changePage(val) {
      this.$emit('changePage', val);
    },
    searchType(val) {
      this.$emit('searchType', val);
    },
    seeCommerce(val) {
      this.$emit('seeCommerce', val);
    },
  }
}
</script>