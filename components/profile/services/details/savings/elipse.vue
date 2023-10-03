<template>
  <v-row justify="space-around" no-gutters>
    <v-col cols="auto">
      <v-sheet 
        min-width="162px" 
        min-height="82px"
        color="#009699" 
        rounded="lg"
        dark
      >
        <div class="ml-2 pt-1">
          <v-icon>{{ $icons.moneyBox }}</v-icon>
        </div>
        <div class="app-display-1-bold ml-3">
          {{ value | appCurrency }}
        </div>
        <div class="app-body-small-bold ml-4">
          ahorro
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="auto">
      <v-sheet 
        width="162px" 
        height="82px" 
        color="#80DDDF" 
        rounded="lg"
        dark
      >
        <div class="ml-2 pt-1">
          <v-icon>{{ $icons.savedEuros }}</v-icon>
        </div>
        <div class="app-display-1-bold ml-3">
          {{ max | appCurrency }}
        </div>
        <div class="app-body-small-bold ml-4">
          Precio de mercado
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Elipse',
  props: {
    value: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 0 }
  },
  methods: {
    tooltipChange(e) {
      return parseFloat(this.value) + ' €'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
