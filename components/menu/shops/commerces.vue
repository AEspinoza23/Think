<template>
  <v-col cols="12" class="pb-14 mt-3">
    <div v-for="(item, key) in list" :key="key">
      <div class="d-flex">
        <v-col cols="auto">
          <v-img 
            v-if="item.user.avatar"
            :lazy-src="item.user.avatar.image_xs"
            :src="item.user.avatar.image_xs"
            width="90px"
            height="90px"
            alt="item image"
          />
          <v-icon v-else class="icon--exxl pa-0">{{ $iconsSvg.profile }}</v-icon>
        </v-col>
        <v-col cols="8">
          <div 
            class="app-body-large-bold"
          >{{ item.store_name }}
          </div>
          <div 
            class="app-body-medium my-2 d-flex"
            @click="$emit('seeCommerce', item)"
          >
            <div><v-icon color="primary">
              mdi-map-marker
            </v-icon></div>
            <div>
              {{ item.address.address_formatted }}
            </div>
          </div>
          <div
            class="app-body-medium"
            @click="openWhatsapp(item.phone_number)"
          >
            <v-icon color="primary">
              mdi-whatsapp
            </v-icon>
            {{ item.phone_number }}
          </div>
          <div
            class="app-body-medium mt-3"
            @click="$emit('searchType', item.commerce_type)"
          >
            <v-icon size="14" color="success">
              mdi-check
            </v-icon>
            <span class="text-decoration-underline">
              {{ item.commerce_type.name }}
            </span>
          </div>
        </v-col>
      </div>
      <v-divider class="grey mx-3 mt-1"></v-divider>
    </div>
    <div v-if="list.length === 0 && loading === false" class="mt-4">
      <v-row no-gutters justify="center">
        <v-col cols="auto">
          <v-img :src="$assets.noShops" max-height="80" max-width="107.8px"></v-img>
        </v-col>
      </v-row>
      <div 
        class="app-heading-1-bold expired--text d-flex justify-center text-center px-4"
      >
        Sin comercios
      </div>
      <div 
        class="app-body-medium d-flex justify-center text-justify my-4 px-4"
      >
        ¡Vaya! No hemos podido encontrar ningún comercio PIENSA para la zona buscada. 
        Seguro que pronto se suman más. De momento puedes ampliar el rango de tu búsqueda.
      </div>
    </div>
    <v-skeleton-loader 
      v-if="loading" 
      type="image" 
      max-height="150px"
      class="mt-4"
    >
    </v-skeleton-loader>
    <v-pagination
      v-if="list.length !== 0 && loading === false"
      v-model="page"
      class="my-3"
      circle
      :length="pageNumber"
      @next="$emit('changePage', page)"
      @previous="$emit('changePage', page)"
    ></v-pagination>
  </v-col>
</template>

<script>
export default {
  props: {
    list: { type: Array, default:() => [] },
    loading: { type: Boolean, default: false },
    pageNumber: { type: Number, default: null },
    actualPage: { type: Number, default: null },
  },
  data:() => ({
    page: 1
  }),
  watch: {
    actualPage(val) {
      this.page = val;
    }
  },
  methods: {
    openWhatsapp(number) {
      const link = `https://api.whatsapp.com/send?phone=${number}`;
      window.open(link, '_blank');
    }
  }
}
</script>