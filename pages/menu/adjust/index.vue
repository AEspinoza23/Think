<template>
  <div class="py-3 backColor rounded-lg">
    <v-card
      :width="$vuetify.breakpoint.width"
      class="rounded-lg shades-small-card"
      color="backColor"
      height="auto"
      elevation="0"
    >
      <v-card-text>
        <app-list-item
          :icon-right="'mdi-chevron-right'"
          :name="$t('notifications.title')"
          :to="localePath('/menu/adjust/notifications')"
          class="card"
        />
        <app-list-item
          :data="themeTitle"
          :icon-right="'mdi-chevron-right'"
          :name="'Apariencia'"
          :to="localePath('/menu/adjust/theme')"
          class="my-3 card"
        />
        <app-list-item class="card" :name="'Actualizaciones'" data="v1.0" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Theme from '~/constants/theme'

export default {
  name: 'MenuAdjust',
  layout: 'app',
  auth: true,
  data() {
    return {
      items: Theme,
      themeTitle: ''
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      isDark: 'app/isDark'
    })
  },
  watch: {
    isDark() {
      this.themeTitle = this.items.find((item) => item.value === this.$auth.$state.user.theme).text
    }
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.setHeaderConfig({
      isTitle: true,
      title: 'Ajustes',
      isNotification: true,
      isBack: true
    })
    this.themeTitle = this.items.find((item) => item.value === this.$auth.$state.user.theme).text
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    }),
    ...mapMutations({
      setHeaderConfig: 'app/SET_HEADER_CONFIG'
    })
  }
}
</script>

<style scoped></style>
