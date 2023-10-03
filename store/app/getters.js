export default {
  flashConfig: (state) => {
    return state.flash
  },
  headerConfig: (state) => {
    return state.header
  },

  // IS USED FOR DIALOGS or MENU ACTIVATORS
  dialogValue: (state) => {
    return state.header.actionValue
  },
  isDark: (state) => {
    return state.isDark
  },
  promo: (state) => {
    return state.promo
  },
  promoTwo: (state) => {
    return state.promoTwo
  },
  promoThree: (state) => {
    return state.promoThree
  },
  promoFour: (state) => {
    return state.promoFour
  }
}
