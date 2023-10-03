<template>
  <v-list-item class="card shades-general rounded-lg pr-2" v-bind="$attrs">
    <v-list-item-content>
      <v-list-item-title class="text-h5">
        <v-row v-if="address">
          <v-col cols="6" class="app-body-large secondary--text">
            <v-row class="mb-4" no-gutters>
              <span class="app-body-large primary--text">
                {{ item.tag }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span> {{ item.street }} </span>
            </v-row>
            <v-row no-gutters>
              <span> {{ item.postal_code }} </span>
            </v-row>
            <v-row no-gutters>
              <span>{{ item.city }}/{{ item.state }}</span>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="address && commerce" no-gutters class="mt-2">
          <v-col cols="auto">
            <app-btn
              size="x-small" 
              @click="$emit('change')"
            >
              editar
            </app-btn>
          </v-col>
        </v-row>
        <v-row v-if="address && !commerce" no-gutters class="mt-2">
          <app-btn
            class="mr-2"
            outlined
            size="x-small"
            @click="$emit('delete')"
          >
            Eliminar
          </app-btn>
          <app-btn
            size="x-small" 
            @click="$emit('change')"
          >
            Editar
          </app-btn>
        </v-row>
        <v-row v-else-if="!address">
          <v-col class="pr-1" cols="5">
            <span v-if="!data" class="app-body-large primary--text">
              {{ password ? 'Cambiar' : 'Añadir' }}
            </span>
            <span :class="!data? 'app-body-large primary--text':'app-body-large title--text'">
              {{ title | shortenWord(10) }}
            </span>
          </v-col>
          <v-col cols="5">
            <span class="app-body-large">{{ data | shortenWord(showArrow ? 10 : 29) }}</span>
          </v-col>
          <v-col v-if="showArrow" class="pl-1" cols="2">
            <v-icon>mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ProfileDetailsDataField',
  props: {
    title: {  type: String, default: ''  },
    data: { type: String,  default: '' },
    password: { type: Boolean, default: false },
    showArrow: {  type: Boolean,  default: true },
    address: {  type: Boolean,  default: false  },
    commerce: {  type: Boolean,  default: false  },
    item: {  type: Object,  default: () => {} },
  }
}
</script>

<style scoped></style>
