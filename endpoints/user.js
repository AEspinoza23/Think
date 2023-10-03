import helper from './queryHelper'

const sufi = '/api/users'
export default {
  listUserOffers: (filter) => {
    return `${sufi}/users/list_user_offers/${helper.buildQueryString(filter)}`
  },
  listBalanceMovements: (filter) => {
    return `${sufi}/users/list_balance_movement/${helper.buildQueryString(filter)}`
  },
  getUserOffer: (filter) => {
    return `${sufi}/users/retrieve_user_offer/${helper.buildQueryString(filter)}`
  },
  getUser: (id) => {
    return `${sufi}/users/${id}/`
  },
  getReferral: (filter) => {
    return `${sufi}/users/retrieve_referral/${helper.buildQueryString(filter)}`
  },
  pushNotifications: `${sufi}/users/create_gcm_device/`,
  balanceSummary: `${sufi}/users/balance_summary/`,
  balanceWeekSummary: `${sufi}/users/graphic_week_balance_summary/`,
  balanceMonthSummary: `${sufi}/users/graphic_month_balance_summary/`,
  balanceYearSummary: `${sufi}/users/graphic_year_balance_summary/`,
  requestBalance: `${sufi}/users/request_balance/`,
  createCommerce: `${sufi}/commerces/`,
  createOwnCommerce: `${sufi}/users/create_own_commerce/`,
  getCommercesCount: `${sufi}/commerces/get_commerce_count/`,
  getSavings: `${sufi}/users/savings_information/`,
  getBalanceDetail: (slug) => {
    return `${sufi}/user-balances/${slug}/`
  },
  sendEmail: () => {
    return `${sufi}/users/send_invite_email/`
  },
  shops: {
    list: (filter) => {
      return `${sufi}/commerces/${helper.buildQueryString(filter)}`
    },
    details: (id) => {
      return `${sufi}/commerces/${id}/`
    },
    types: (filter) => { 
      return `${sufi}/commerce_types/${helper.buildQueryString(filter)}`
    },
    create_purchase: `${sufi}/users/create_purchase/`,
    retrieve_purchase: (filter) => { 
      return `${sufi}/users/retrieve_purchase/${helper.buildQueryString(filter)}`
    },
    pay_with_balance: `${sufi}/users/pay_with_balance/`,
    save_pdf: `${sufi}/users/save_commerce_pdf/`,
    save_pdf_client: `${sufi}/users/save_client_pdf/`,
  },
}