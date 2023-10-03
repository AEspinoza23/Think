<template>
  <v-alert
    :icon="false"
    :text="computedAlert"
    :type="type"
    class="rounded-lg"
    close-icon="mdi-close"
    dismissible
    max-width="335px"
    outlined
    transition="slide-x-transition"
    v-bind="$attrs"
  >
    <div v-if="toast" :style="computedTextColor">
      <v-row>
        <v-col class="d-flex align-end" cols="1">
          <v-icon :color="type">
            {{ computedIcon }}
          </v-icon>
        </v-col>
        <v-col class="ml-3" cols="10">
          <div class="app-body-medium-bold my-2">{{ title }}</div>
          <div class="app-body-medium">{{ message }}</div>
        </v-col>
      </v-row>
    </div>
    <div v-else :style="computedTextColor" class="app-body-medium">
      <v-icon :color="type">
        {{ computedIcon }}
      </v-icon>
      {{ message }}
    </div>
  </v-alert>
</template>

<script>
export default {
  name: 'Alerts',
  props: {
    toast: { type: Boolean, default: false },
    type: { type: String, default: 'success' },
    message: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  computed: {
    computedIcon() {
      if (this.type === 'success') {
        return 'mdi-checkbox-marked-circle'
      } else if (this.type === 'error') {
        return 'mdi-alert-octagon'
      } else if (this.type === 'warning') {
        return 'mdi-alert'
      } else {
        return 'mdi-alert-circle'
      }
    },
    computedTextColor() {
      if (this.$vuetify.theme.dark) {
        return { color: 'white' }
      } else {
        return { color: 'black' }
      }
    },
    computedAlert() {
      return this.type !== 'info'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-alert--outlined {
  border: 3px solid !important;
}
</style>
