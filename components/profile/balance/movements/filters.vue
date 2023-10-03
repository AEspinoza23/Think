<template>
  <v-dialog v-model="dialog" :width="$vuetify.breakpoint.width">
    <template #activator="{ on, attrs }">
      <div 
        class="no-background-hover" 
        style="height: auto; width: auto" 
        v-bind="attrs" 
        v-on="on"
      >
        <v-icon class="icon--md">
          {{ $iconsSvg.filters }}
        </v-icon>
      </div>
    </template>

    <v-card color="card" class="mx-0 px-0">
      <v-card-title class="text-h5 d-flex align-self-auto">
        <v-col class="pa-0" cols="4" />
        <v-col class="d-flex justify-center pa-0" cols="4">
          <span> Filtrar </span>
        </v-col>
        <v-col class="d-flex justify-end pa-0" cols="4">
          <v-icon size="30" @click="dialog = false">mdi-close-circle-outline</v-icon>
        </v-col>
      </v-card-title>
      <v-card-text class="mx-0 px-3 pb-0">
        <v-divider class="mb-3 title" />
          <app-search
            :value="filters.search"
            placeholder="Búsqueda por texto"
            @input="edit($event, 'search')"
            @click="applyFilter"
          />
        <v-divider class="mb-2 title"  />
        <span class="app-body-large-bold title--text">Por gasto / ingreso</span>
        <v-row>
          <v-col cols="auto">
            <v-tabs 
              v-model="tab" 
              class="app-tabs rounded-lg mt-4" 
              background-color="backColor" 
              hide-slider
              @change="edit($event, 'expense')"
            >
              <v-tab 
                v-for="item in items" 
                :key="item" 
                class="text-capitalize px-0"
              >
                {{ item }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-divider class="my-2 title" />
        <span class="app-body-large-bold title--text">Por rango de fechas</span>
        <v-row>
          <v-col cols="6" class="mt-2">
            <app-date-picker
              v-model="filters.start_date"
              outlined
              :prepend-icon="'mdi-calendar'"
              label="Fecha inicio"
              @input="edit($event, 'start_date')"
            />
          </v-col>
          <v-col cols="6" class="mt-2">
            <app-date-picker
              v-model="filters.end_date"
              outlined
              :prepend-icon="'mdi-calendar'"
              label="Fecha fin"
              :min="filters.start_date"
              @input="edit($event, 'end_date')"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-row class="ma-0" justify="center">
          <v-col cols="6" class="d-flex justify-center px-0">
            <app-btn class="medium" color="primary" outlined size="small" @click="cleanFilter">
              {{ $t('notifications.clean') }}
            </app-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-center px-0">
            <app-btn class="button-primary" size="small" @click="applyFilter">
              {{ $t('notifications.applyFilter') }}
            </app-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OffersFilter',
  data() {
    return {
      dialog: false,
      filters: {
        start_date: null,
        end_date: null,
        search: ''
      },
      items: ['Todos', 'Gastos', 'Ingresos'],
      tab: 0
    }
  },
  computed: {
    ...mapGetters({
      servicesList: 'services/servicesList'
    })
  },
  methods: {
    cleanFilter() {
      this.tab = 0;
      this.filters = {
        start_date: null,
        end_date: null,
        search: ''
      };
      this.$emit('applyFilter', {})
    },
    applyFilter() {
      this.$emit('applyFilter', this.filters)
      this.dialog = false
    },
    edit(val, key) {
      if (key === "expense") {
        if (this.tab === 1) {
          this.filters.expensive = true;
          delete this.filters.earnings
        } else if (this.tab === 2) {
          this.filters.earnings = true;
          delete this.filters.expensive
        } else {
          delete this.filters.expensive
          delete this.filters.earnings
        }
      } else {
        this.filters[key] = val;
      }
    },
  }
}
</script>

<style scoped></style>
