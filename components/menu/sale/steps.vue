<template>
  <v-card 
    :width="$vuetify.breakpoint.width" 
    height="85px"
    class="backColor my-4 rounded-lg shades-general"
  >
    <v-card-text class="pt-7">
      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="auto">
          <v-row justify="center">
            <v-col class="py-0" cols="auto">
              <v-icon :color="menuColor(1)" size="30">{{ $icons.qrScan }}</v-icon>
            </v-col>
          </v-row>
          <v-row 
            :style="textStyle(1)" 
            :class="textColor(1)"  
            class="app-body-small d-flex justify-center"
          >
            <v-col class="pt-1 pb-0" cols="auto">
              <span> Escaneo código </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-divider class="title"></v-divider>
        </v-col>
        <v-col cols="auto">
          <v-row justify="center">
            <v-col class="py-0" cols="auto">
              <v-icon :color="menuColor(2)" size="30">{{ $icons.securitySearcher }}</v-icon>
            </v-col>
          </v-row>
          <v-row
            :style="textStyle(2)"
            class="app-body-small d-flex justify-center"
            :class="textColor(2)"
          >
            <v-col class="pt-1 pb-0" cols="auto">
              <span> Confirmación </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    active: { type: Number, default: 1 }
  },
  methods: {
    menuColor(active) {
      if (this.active >= active) {
        return 'primary'
      } else {
        return 'expired'
      }
    },
    textColor(active) {
      if (this.active >= active) {
        return 'title--text'
      } else {
        return 'expired--text'
      }
    },
    textStyle(active) {
      if (this.active >= active) {
        return { fontWeight: 'bold' }
      } else {
        return { color: '#C4C4C4'}
      }
    }
  }
}
</script>