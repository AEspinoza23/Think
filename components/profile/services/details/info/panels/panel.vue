<template>
  <v-expansion-panel class="pa-0">
    <v-expansion-panel-header class="backColor pa-3">
      <div class="app-body-medium pa-0">
        <v-icon class="icon--md">
          {{ icon }}
        </v-icon>
        {{ title }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="backColor">
      <v-row class="title--text app-body-medium">
        <v-col cols="auto" class="px-6">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="text">
          </span>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
    <v-divider class="mx-4 placeholder"></v-divider>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'ServicesPanels',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    text: { type: String, default: '' },
  }
}
</script>

<style lang="scss">
.v-expansion-panel {
  .v-expansion-panel-content__wrap {
    padding: 0 0 0 !important;
  }
}
</style>
