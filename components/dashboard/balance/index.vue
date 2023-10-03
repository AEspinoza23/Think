<template>
  <div>
    <v-card 
      :width="$vuetify.breakpoint.width"
      rounded="lg"
      class="backColor shades-small-card mt-1 mb-3"
    >
      <v-card-text v-if="loading">
        <v-skeleton-loader type="image" class="mt-2"/>
      </v-card-text>
      <v-card-text v-else>
        <div class="app-heading-1 title--text">
          {{ $t('dashboard.balance') }}
        </div>
        <v-row no-gutters>
          <v-col cols="12">
            <v-tabs 
              v-model="tabGraph" 
              class="app-tabs rounded-lg my-1"
              height="40"
              background-color="backColor"
              hide-slider
            >
              <v-tab
                v-for="item in items" 
                :key="item"
                class="text-capitalize px-14 py-4"
              >
                <span>
                  {{ item }}
                </span>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <dashboard-balance-summary v-if="tabGraph === 0" :balance="balance" />
        <div v-else>
          <v-tabs 
            v-model="tab" 
            color="primary" 
            background-color="backColor" 
            center-active grow :show-arrows="false"
          >
            <v-tab class="card text-capitalize">1 {{ $t('dashboard.weekGraphic') }}</v-tab>
            <v-tab class="card text-capitalize">1 {{ $t('dashboard.monthGraphic') }}</v-tab>
            <v-tab class="card text-capitalize">1 {{ $t('dashboard.yearGraphic') }}</v-tab>
          </v-tabs>
          <dashboard-balance-chart :balances="chartData" />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DashboardBalance',
  props: {
    loading: { type: Boolean, default: false},
    balance: { type: Object, default: () => {}},
    weekly: { type: Array, default: () => []},
    monthly: { type: Array, default: () => []},
    yearly: { type: Array, default: () => []},
  },
  data: () => ({
    dialog: false,
    tab: 0,
    tabGraph: 0,
    items: ['Resumen', 'Gráfico'],
  }),
  computed: {
    chartData() {
      const data = {
        virtual: [],
        available: [],
        locked: [],
      }
      if (this.tab === 0) {
        this.weekly.forEach(element => {
          if (this.weekly.length === 1) {
            data.virtual.push(element.total_amount);
            data.available.push(element.release_amount);
            data.locked.push(element.locked_amount);
          }
          data.virtual.push(element.total_amount);
          data.available.push(element.release_amount);
          data.locked.push(element.locked_amount);
        });
      } else if (this.tab === 1) {
        this.monthly.forEach(element => {
          if (this.monthly.length === 1) {
            data.virtual.push(element.total_amount);
            data.available.push(element.release_amount);
            data.locked.push(element.locked_amount);
          }
          data.virtual.push(element.total_amount);
          data.available.push(element.release_amount);
          data.locked.push(element.locked_amount);
        });
      } else if (this.tab === 2) {
        this.yearly.forEach(element => {
          if (this.yearly.length === 1) {
            data.virtual.push(element.total_amount);
            data.available.push(element.release_amount);
            data.locked.push(element.locked_amount);
          }
          data.virtual.push(element.total_amount);
          data.available.push(element.release_amount);
          data.locked.push(element.locked_amount);
        });
      }
      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
.click {
  cursor: pointer;
}
</style>
