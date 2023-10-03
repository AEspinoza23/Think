export default () => ({
  flash: {
    message: '',
    type: '',
    show: false,
    color: 'primary'
  },
  header: {
    // Boolean true if Header has go Back button
    isBack: false,

    // Boolean true if Header has Title
    isTitle: true,

    // String title of Header
    title: '',

    // Boolean if is notification
    isNotification: false,

    // Boolean if is notification search
    isNotificationSearch: false,

    // Boolean if is menu
    isMenu: false,

    // Boolean if is filter
    isFilter: false,

    // Boolean if is options
    isOptions: false,

    // notifications Number
    notificationsNumber: 0,

    // IS USED FOR DIALOGS or MENU ACTIVATORS
    actionValue: false,

    // Boolean if is offers service type
    isOffers: false,

    // Boolean to show types of services
    showTypes: false
  },
  isDark: false,
  promo: false,
  promoTwo: false,
  promoThree: false,
  promoFour: false,
})
