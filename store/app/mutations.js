export default {
  SET_FLASH_CONFIG(state, { message, show, color, type }) {
    state.flash = {
      message: message || '',
      show: !!show,
      color: color || 'primary',
      type: type || ''
    }
  },
  // SETTING HEADER CONFIG TO USE IN PAGES
  SET_HEADER_CONFIG(
    state,
    { 
      isBack, 
      isTitle, 
      title, 
      isNotification, 
      notificationsNumber, 
      isMenu, isFilter, 
      isOptions, 
      isOffers, 
      showTypes,
      isNotificationSearch
    }
  ) {
    state.header = {
      isBack: isBack || false,
      isTitle: isTitle || false,
      title: title || '',
      isNotification: isNotification || false,
      notificationsNumber: notificationsNumber || 0,
      isNotificationSearch: isNotificationSearch || false,
      isMenu: isMenu || false,
      isOptions: isOptions || false,
      isFilter: isFilter || false,
      actionValue: false,
      isOffers: isOffers || false,
      showTypes: showTypes || false
    }
  },
  // IS USED FOR DIALOGS or MENU ACTIVATORS
  CHANGE_HEADER_ACTION_VALUE(state) {
    state.header.actionValue = !state.header.actionValue
  },
  CHANGE_HEADER_NOTIFICATION_VALUE(state, value) {
    state.header.notificationsNumber = value
  },
  CHANGE_THEME(state, value) {
    state.isDark = value
  },
  PROMO(state) {
    state.promo = !state.promo;
  },
  PROMO_TWO(state) {
    state.promoTwo = !state.promoTwo;
  },
  PROMO_THREE(state) {
    state.promoThree = !state.promoThree;
  },
  PROMO_FOUR(state) {
    state.promoFour = !state.promoFour;
  },
}
