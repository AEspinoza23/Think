<template>
  <v-card :width="$vuetify.breakpoint.width" class="shades-small-card card">
    <v-card-text class="app-body-medium title--text pa-5">
      <v-row justify="center" class="my-2">
        <v-icon color="warning">{{ $icons.alertWarning }}</v-icon>
        {{ $t('services.noValoration') }}
      </v-row>
      <v-row justify="center" class="my-2">
        <app-btn size="medium" @click="changeToForm()">
          {{ $t('services.valorate') }}
        </app-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ServiceValoration',
  props: {
    service: { type: Object, default: () => ({}) }
  },
  methods: {
    changeToForm() {
      const valorationInfo = {
        info: {
          user: this.$auth.$state.user.id,
          offer: this.service.id,
        }
      };
      this.$emit('changeToForm', { valorationInfo, isEdit: false })
    }
  }
}
</script>
