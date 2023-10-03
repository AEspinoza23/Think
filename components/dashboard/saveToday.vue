<template>
  <v-dialog width="351px" :value="dialog" persistent>
    <v-card color="backColor" class="mx-0 px-0">
      <v-card-title>
        <v-row justify="end" no-gutters>
          <v-col class="pa-0" cols="auto">
            <v-icon size="25" @click="$emit('close')">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div>
          <v-row no-gutters>
            <v-col cols="12" class="app-display-1-bold text-center title--text">
              ¿En qué quieres
            </v-col>
            <v-col cols="12" class="app-display-1-bold text-center primaryThree--text">
              ahorrar hoy?
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="auto">
              <v-img
                :lazy-src="$assets.banklock"
                :src="$assets.banklock"
                height="99px"
                width="146px"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-body-medium my-2 title--text">
              Elige la categoría de servicios que te interesa y da el primer paso para
              <span class="font-weight-bold">
                empezar a ahorrar hoy mismo
              </span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col 
              v-for="(item, i) in types" 
              :key="i" 
              cols="auto" 
              class="saveBox ma-1" 
              @click="GoTo(item.id)"
            >
              <v-img
                v-if="item.small_color_image"
                :lazy-src="item.small_color_image.svg"
                :src="item.small_color_image.svg"
                class="iconHired"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {  mapGetters, mapMutations,  } from 'vuex'
export default {
  name: 'DashboardBanner',
  props: {
    dialog: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters({
      servicesList: 'services/servicesList',
      servicesListNext: 'services/servicesListNext'
    }),
    types() {
      return this.servicesList.results;
    }
  },
  methods: {
    ...mapMutations({
      statePromoTwo: 'app/PROMO_TWO',
    }),
    GoTo(service) {
      this.statePromoTwo();
      this.$router.push(
        this.localePath({
          name: 'saveToday',
          query: { service }
        })
      )
    }
  }
}
</script>

<style>
.saveBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 60px;
  height: 34px;
  border-radius: 4px;
  flex: none;
  background: rgba(255, 255, 255);
  backdrop-filter: blur(12.5px);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #00BBBF;
}
</style>