<template>
  <v-card :style="computedSize" color="card">
    <v-img :src="img" :style="computedSizeImg">
      <app-headerRate :color="color" :small="small" :title="header" />
    </v-img>
    <v-card-title>
      <v-row align="center" justify="start">
        <span class="app-body-medium-bold ml-1"> Axa </span>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="mt-1">
        <div class="title--text app-body-large-bold">{{ title }}</div>
      </v-row>
      <v-row class="mt-4">
        <div class="secondary--text app-body-medium">{{ description }}</div>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn class="button-primary white--text">
        <span class="app-body-medium-bold"> Ver más </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardRate',
  props: {
    price: { type: Number, String, default: 1500 },
    discount: { type: Number, String, default: 300 },
    description: { type: String, default: 'Mínima descripción en este espacio aquí' },
    title: { type: String, default: 'Seguro a todo riesgo' },
    subtitle: { type: String, default: 'Seguro a todo riesgo' },
    color: { type: String, default: 'broker' },
    header: { type: String, default: 'broker' },
    img: { type: String, default: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
    small: { type: Boolean, default: false }
  },
  computed: {
    computedSize() {
      if (this.small) {
        return {
          'max-width': '163px',
          'max-height': '315px'
        }
      }
      return {
        'max-width': '200px',
        'max-height': '309px'
      }
    },
    computedSizeImg() {
      if (this.small) {
        return {
          'max-width': '163px',
          'max-height': '80px'
        }
      }
      return {
        'max-width': '200px',
        'max-height': '91px'
      }
    }
  }
}
</script>
