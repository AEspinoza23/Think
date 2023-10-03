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
        <app-loading v-if="loading" />
        <v-row v-for="(type, i) in types" :key="i" no-gutters>
          <v-col class="px-0 py-1">
            <v-checkbox
              v-model="filters.commerce_type"
              :hide-details="true"
              :label="type.name"
              :value="type.id"
              class="mt-0"
              on-icon="mdi-checkbox-marked-outline"
              off-icon="mdi-checkbox-blank-outline"
            >
              <template #label>
                <div class="text-capitalize">
                  {{ type.name }} 
                </div>
              </template>
            </v-checkbox>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OffersFilter',
  data() {
    return {
      dialog: false,
      filters: {
        commerce_type: []
      },
      items: ['Todos', 'Gastos', 'Ingresos'],
      tab: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      shopsTypes: 'user/shopsTypes'
    }),
    types() {
      return this.shopsTypes.results;
    },
    next() {
      return this.shopsTypes.next;
    }
  },
  async mounted() {
    if (this.next && !this.loading) {
      this.loading = true;
      await this.getShopsTypes()
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({
      getShopsTypes: 'user/getShopsTypes'
    }),
    cleanFilter() {
      this.filters = {
        commerce_type: []
      };
      this.$emit('applyFilter', {})
    },
    applyFilter() {
      this.$emit('applyFilter', this.filters)
      this.dialog = false
    },
    edit(val, key) {
      this.filters[key] = val;
    },
  }
}
</script>

<style scoped></style>
