<template>
  <v-row class="mt-1 mb-3" no-gutters>
    <app-loading v-if="loading" />
    <v-card 
      v-else 
      :width="$vuetify.breakpoint.width"
      rounded="lg"
      class="backColor rounded-lg shades-small-card"
    >
      <v-card-title>
        <v-row justify="space-between">
          <v-col cols="auto">
            <div class="app-heading-1 ml-2 mt-2">
              Movimientos
            </div>
          </v-col>
          <v-col cols="auto">
            <profile-balance-movements-filters 
              @applyFilter="setFilters"
            />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div v-for="(movement, i) in computedMovements" :key="i">
          <v-divider class="title--text" />
          <profile-balance-movements-movement :movement="movement" />
        </div>
        <div 
          v-if="computedMovements.length === 0" 
          class="d-flex justify-center app-body-medium title--text"
        >
          No hay movimientos recientes en la cuenta
        </div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'BalanceMovements',
  props: {
    balance: { type: Object, default: () => {}}
  },
  data: () => ({
    filters: {},
    loading: false
  }),
  computed: {
    ...mapGetters({
      movementsList: 'user/movementsList',
    }),
    computedMovements() {
      const array = []
      this.movementsList.earnings.forEach(element => {
        const content = {
          date: element[0],
          amount: element[1],
          details: element[2],
          earning: true
        };
        array.push(content);
      });
      this.movementsList.expenses.forEach(element => {
        const content = {
          date: element[0],
          amount: element[1],
          details: element[2],
          earning: false
        };
        array.push(content);
      });
      array.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      return array;
    }
  },
  methods: {
    ...mapActions({
      getMovementList: 'user/getMovementList',
    }),
    ...mapMutations({
      resetMovementList: 'user/RESET_MOVEMENTS_LIST'
    }),
    async getMovements() {
      if (!this.loading) {
        this.loading = true;
        await this.getMovementList(this.filters);
        this.loading = false;
      }
    },
    async setFilters(val) {
      this.filters = val;
      await this.resetMovementList();
      this.getMovements()
    }
  }
}
</script>
