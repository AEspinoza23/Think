<template>
  <v-expansion-panel class="pa-0 card rounded-lg shades-general">
    <v-expansion-panel-header class="pa-0">
      <v-row justify="space-around">
        <v-col cols="8" class="ml-2">
          <div class="app-body-medium-bold">
            {{ title }}
          </div>
        </v-col>
        <v-col v-if="balance" cols="3" class="d-flex justify-center">
          <div class="app-body-medium-bold primary--text">
            {{ balance | appCurrency }}
          </div>
        </v-col>
        <v-col v-else cols="3" class="d-flex justify-center">
          <div class="app-body-medium-bold primary--text">
            {{ 0 | appCurrency }}
          </div>
        </v-col>
      </v-row>
      <template #actions>
        <v-icon class="mr-3">
          $expand
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="card">
      <div class="pa-3 title--text app-body-medium">
        {{ text }}
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'ServicesPanels',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    balance: { type: Number, default: null },
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel {
  .v-expansion-panel-content__wrap {
    padding: 0 0 0 !important;
  }

}
.v-expansion-panel-header {
  min-height: 57px !important;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
</style>