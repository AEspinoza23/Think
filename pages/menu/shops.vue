<template>
  <div class="fadeIn">
    <!-- Botón de registro de comercio usuario existente -->
    <dashboard-recommends v-if="$auth.$state.user.profile === 6" class="mt-5" />
    <menu-shops-shop-register v-else class="mt-5" />
    <v-card 
      :width="$vuetify.breakpoint.width"
      class="backColor my-3 rounded-lg shades-general pa-2 mt-3"
    >
      <v-tabs 
        v-model="tab" 
        class="app-tabs rounded-lg my-5" 
        background-color="backColor" 
        hide-slider
        grow
        center-active
        @change="checkTab"
      >
        <v-tab 
          v-for="item in items" 
          :key="item" 
          class="text-capitalize px-10"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <menu-shops-map 
        v-if="tab === 0"
        :list="list"
        :latitude="latitude"
        :longitude="longitude"
        :loading="loading"
        :page-number="pageNumber"
        :actual-page="filters.page"
        :count="count"
        @applyFilter="setFilters"
        @setDistance="setDistance"
        @changePage="changePage"
        @searchType="searchType"
      />
      <menu-shops-list 
        v-else-if="tab === 1"
        :list="list" 
        :loading="loading"
        :page-number="pageNumber"
        :actual-page="filters.page"
        :title="title"
        :count="count"
        @applyFilter="setFilters"
        @changePage="changePage"
        @searchType="searchType"
      />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Shops',
  layout: 'app',
  auth: true,
  data: () => ({
    tab: 0,
    items: ['Mapa', 'Listado'],
    loading: false,
    filters: {
      location: '',
      distance: 5,
      page: 1
    },
    title: null,
    count: 0
  }),
  computed:  {
    ...mapGetters({
      shopsList: 'user/shopsList',
      location: 'user/location'
    }),
    latitude() {
      return this.location.latitude;
    },
    longitude() {
      return this.location.longitude;
    },
    pageNumber() {
      return this.shopsList.num_pages;
    },
    list() {
      return this.shopsList.results;
    },
    next() {
      return this.shopsList.next;
    }
  },
  async mounted() {
    this.$headerConfig({
      isTitle: true,
      title: 'Comercios Piensa',
      isNotification: true,
      isBack: true
    }, true)
    const { success, data } = await this.getCommerceCount();
    if (success) {
      this.count = data.commerce_count;
    }
    await this.shopsListReset();
    await this.getShopList();
  },
  methods: {
    ...mapActions({
      shopsListAction: 'user/shopsList',
      getCommerceCount: 'user/getCommerceCount'
    }),
    ...mapMutations({
      shopsListReset: 'user/RESET_SHOPS_LIST'
    }),
    async checkTab() {
      if (this.tab === 0) {
        this.filters.distance = 5;
      } else if (this.tab === 1) {
        delete this.filters.distance;
      }
      this.filters.page = 1
      this.title = null;
      this.filters.location = `${this.latitude}_${this.longitude}`;
      await this.shopsListReset();
      await this.getShopList();
    },
    async searchType(val) {
      this.tab = 1
      this.filters.commerce_type = [val.id];
      this.title = val.name;
      await this.shopsListReset();
      await this.getShopList();
    },
    async getShopList() {
      try {
        if (this.next && !this.loading) {
          this.loading = true;
          if (this.filters.distance === null) {
            delete this.filters.distance;
          }
          this.filters.location = `${this.latitude}_${this.longitude}`;
          await this.shopsListAction(this.filters);
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setFilters(val) {
      this.title = null;
      this.filters = val;
      this.filters.page = 1;
      await this.shopsListReset();
      await this.getShopList();
    },
    setDistance(val) {
      this.filters.distance = val;
    },
    async changePage(val) {
      this.filters.page = val;
      await this.shopsListReset();
      await this.getShopList();
    }
  }
}
</script>