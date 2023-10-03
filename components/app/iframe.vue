<template>
  <v-dialog 
    :value="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition" 
  >
    <v-card height="100%">
      <v-toolbar
        dark
        color="primary"
        height="35px"
        rounded="0"
      >
        <v-btn
          icon
          dark
          @click="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    url: { type: String, default: '' },
    dialog: { type: Boolean, default: false },
  }
}
</script>

<style>

</style>