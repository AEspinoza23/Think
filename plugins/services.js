import Vue from 'vue'

export default ({ store }) => {
  Vue.prototype.$flash = (flash) => {
    let conf = { show: true }
    if (typeof flash === 'string') {
      conf.message = flash
    } else {
      conf = { ...conf, ...flash }
    }
    store.commit('app/SET_FLASH_CONFIG', conf)
  }
  Vue.prototype.$headerConfig = (headerConfig, loggedIn) => {
    store.commit('app/SET_HEADER_CONFIG', headerConfig)
    if (loggedIn) {
      store.dispatch('notifications/getNotificationsNumber')
    }
  }
  Vue.prototype.$isIOS = false
}
