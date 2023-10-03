<template>
  <v-card
    :width="$vuetify.breakpoint.width"
    class="rounded-lg shades-general mt-3 pa-2 backColor"
    height="185"
  >
    <v-card-title>
      <span class="app-body-large-bold">Foto</span>
    </v-card-title>
    <v-card-text>
      <v-dialog v-model="dialog" :width="$vuetify.breakpoint.width" fullscreen>
        <template #activator="{ on, attrs }">
          <v-row>
            <v-col class="d-flex justify-center py-0">
              <v-avatar color="placeholderBase" height="79" v-bind="attrs" width="79" v-on="on">
                <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
                <v-icon v-else class="icon--exl pa-0">{{ $iconsSvg.profile }}</v-icon>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center pb-0">
              <v-btn depressed plain text v-bind="attrs" v-on="on">
                <span class="primary--text">
                  {{ imageSrc ? 'Cambiar Foto' : 'Añadir Foto' }}
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <client-only>
          <profile-details-avatar-edit @closeDialog="closeDialog" />
        </client-only>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileDetailsAvatar',

  data() {
    return {
      imageSrc: null,
      dialog: null
    }
  },
  mounted() {
    this.imageSrc = this.$auth.$state.user.avatar?.image_xs
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.imageSrc = this.$auth.$state.user.avatar?.image_xs
    }
  }
}
</script>

<style scoped></style>
