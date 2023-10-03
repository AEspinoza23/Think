<template>
  <v-row no-gutters justify="space-between" class="mt-5 px-2">
    <v-col cols="auto" class="app-heading-1-bold title--text">
      ¡Encuentra tu comercio piensa!
    </v-col>
    <v-col cols="12" class="mt-4">
      <app-search
        v-model="filters.search"
        placeholder="Busca tipo de comercio"
      ></app-search>
    </v-col>
    <v-col 
      class="d-flex justify-end app-body-medium title--text"
    >
    <span v-if="!filters.distance">
      Sin Limite
    </span>
    <span v-else>
      {{ filters.distance }}km de mí
    </span> 
    </v-col>
    <v-col cols="12">
      <v-slider
        v-model="slider"
        ticks
        :max="5"
        @input="setSlider($event)"
      >
      </v-slider>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <app-btn @click="applyFilter">
        <span v-if="!filters.distance">
          Buscar sin limite
        </span>
        <span v-else>
          Buscar a {{ filters.distance }}km
        </span>
      </app-btn>
    </v-col>
    <v-col cols="12" class="d-flex justify-center my-3">
      <app-btn text @click="cleanFilter">
        Limpiar búsqueda
      </app-btn>
    </v-col>
    <v-col cols="12" class="pa-3">
      <app-map
        id="map"
        :value="{ latitude, longitude }"
        class="fill-width"
        :marker-list="markerList"
        :commerce="{latitude: commerce.latitude, longitude: commerce.longitude}"
      />
    </v-col>
    <v-col cols="12" class="app-heading-1-bold title--text ml-3">
      Comercios piensa
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
    loading: { type: Boolean, default: false },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    pageNumber: { type: Number, default: null },
    actualPage: { type: Number, default: null },
    count: { type: Number, default: null },
  },
  data: () => ({
    slider: 1,
    filters: {
      distance: 5,
      location: '',
      search: ''
    },
    commerce: {
      latitude: null,
      longitude: null,
    }
  }),
  computed: {
    markerList() {
      const newList = []
      this.list.forEach(element => {
        newList.push({
          longitude: element.address.longitude,
          latitude: element.address.latitude,
          name: element.store_name,
          address: element.address,
          commerce_type: element.commerce_type.name,
          phone_number: element.phone_number
        })
      });
      return [...newList].map(
        // eslint-disable-next-line camelcase
        ({ latitude, longitude, name, address, commerce_type, phone_number }) => {
          return {
            position: { lat: Number(latitude), lng: Number(longitude) },
            name,
            showInfo: false,
            address,
            commerce_type,
            phone_number
          };
        }
      );
    }
  },
  methods: {
    changePage(val) {
      this.$emit('changePage', val);
    },
    applyFilter() {
      this.$emit('applyFilter', this.filters)
      this.commerce = {
        latitude: null,
        longitude: null,
      }
    },
    cleanFilter() {
      this.slider = 1;
      this.filters.distance = 5;
      this.filters.search = '';
      this.commerce = {
        latitude: null,
        longitude: null,
      };
      this.$emit('applyFilter', this.filters);
    },
    searchType(val) {
      this.$emit('searchType', val);
    },
    seeCommerce(val) {
      const element = document.getElementById("map");
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      this.commerce.latitude = Number(val.address.latitude);
      this.commerce.longitude = Number(val.address.longitude);
    },
    setSlider(val) {
      switch (val) {
        case 0:
          this.filters.distance = 1;
          break;
        case 1:
          this.filters.distance = 5;
          break;
        case 2:
          this.filters.distance = 10;
          break;
        case 3:
          this.filters.distance = 25;
          break;
        case 4:
          this.filters.distance = 50;
          break;
        case 5:
          this.filters.distance = null;
          break;
      
        default:
          break;
      }
      this.$emit('setDistance', this.filters.distance)
    }
  }
}
</script>