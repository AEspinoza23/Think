<template>
  <v-row v-if="$auth.loggedIn" class="background" no-gutters>
    <v-card
      :width="$vuetify.breakpoint.width"
      class="rounded-lg shades-small-card pa-4 backColor"
      height="auto"
    >
      <profile-personal-data />

      <profile-panels />
    </v-card>

    <!--    <profile-consultor class="mt-5" />-->
  </v-row>
  <v-row v-else class="background">
    <profile-noLogin-register />
    <profile-noLogin-discount />
    <profile-noLogin-balance />
    <profile-noLogin-commerce />
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',
  layout: 'app',
  auth: true,
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    })
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig(
      {
        isTitle: true,
        isBack: true,
        title: 'Perfil',
        isNotification: true
      },
      true
    )
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    })
  }
}
</script>

<style lang="scss" scoped></style>
