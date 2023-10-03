<template>
  <v-row no-gutters justify="space-between" align="center" class="my-2 title--text">
    <v-col cols="9">
      <v-row no-gutters align="center">
        <v-col cols="auto">
          <v-icon 
            :color="movement.earning? 'green': 'red'" 
            size="25"
          >
            {{ $icons.savedEuros }}
          </v-icon>
        </v-col>
        <v-col cols="10">
          <v-row v-if="!show && movement.details.length > 20" no-gutters class="app-body-medium" @click="show = true">
            <v-col cols="11" class="">
              {{ movement.details | shortenWord(20)}}
            </v-col>
            <v-col cols="1">
              <v-icon>
                mdi-chevron-down
              </v-icon>
            </v-col>
          </v-row>
          <v-row v-else no-gutters class="app-body-medium" @click="movement.details.length > 20 ? show = false : show = true">
            <v-col cols="11">
              {{ movement.details }}
            </v-col>
            <v-col v-if="movement.details.length > 20" cols="1">
               <v-icon>
                  mdi-chevron-up
                </v-icon>
            </v-col>
          </v-row>
          <v-row no-gutters class="app-label grey--text">
            {{ dateFormat(movement.date) }}
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col 
      cols="3" 
      class="app-body-medium d-flex justify-end" 
      :class="movement.earning? 'green--text': 'red--text'"
    >
      {{movement.earning? '+': '-'}}{{ movement.amount | appCurrency }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    movement: { type: Object, default: () => {} }
  },
  data: () => ({
    show: false
  }),
  methods: {
    dateFormat(date) {
      return this.$dateFns.format(date, 'dd/MM/yyyy')
    }
  }
}
</script>