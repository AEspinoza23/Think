export default {
  changeDialogValue({ commit }) {
    commit('CHANGE_HEADER_ACTION_VALUE')
  },
  changeNotificationsValue({ commit }, value) {
    commit('CHANGE_HEADER_NOTIFICATION_VALUE', value)
  },
  changeAppTheme({ commit }, value) {
    commit('CHANGE_THEME', value)
    window.$nuxt.$root.$vuetify.theme.dark = value
  }
}
