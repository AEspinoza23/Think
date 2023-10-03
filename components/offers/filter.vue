<template>
  <v-dialog v-model="dialog" :width="$vuetify.breakpoint.width">
    <template #activator="{ on, attrs }">
      <div class="no-background-hover" style="height: auto; width: auto" v-bind="attrs" v-on="on">
        <v-icon class="icon--md">
          {{ $iconsSvg.filters }}
        </v-icon>
      </div>
    </template>

    <v-card color="card">
      <v-card-title class="text-h5 d-flex align-self-auto">
        <v-col class="pa-0" cols="4" />
        <v-col class="d-flex justify-center pa-0" cols="4">
          <span> Filtrar </span>
        </v-col>
        <v-col class="d-flex justify-end pa-0" cols="4">
          <v-icon size="30" @click="dialog = false">mdi-close-circle-outline</v-icon>
        </v-col>
      </v-card-title>
      <v-card-text>
        <span class="app-body-large-bold">Ofertas por sector</span>
        <v-row v-for="(item, index) in checkboxGroup" :key="index" align="center" class="ma-0">
          <v-col class="px-0 py-1">
            <v-checkbox
              v-model="selected"
              :hide-details="true"
              :label="item.name"
              :value="item.id"
              class="mt-0"
              on-icon="mdi-checkbox-marked-outline"
              off-icon="mdi-checkbox-blank-outline"
            >
              <template #label>
                <div class="text-capitalize">
                  {{ item.name }} 
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
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
      selected: []
    }
  },
  computed: {
    ...mapGetters({
      servicesList: 'services/servicesList'
    }),
    checkboxGroup() {
      const checkboxGroup = this.servicesList.results
      ? this.servicesList.results
          .filter((item) => item.categories.length > 0)
          .map((item) => {
            return {
              id: item.id,
              name: item.name,
              value: false
            }
          })
      : []
      return checkboxGroup
    }
  },
  methods: {
    cleanFilter() {
      this.selected = [];
      this.$emit('applyFilter', [])
    },
    applyFilter() {
      this.$emit('applyFilter', this.selected)
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>
