export default {
  user: (state) => {
    return state.user;
  },
  offer: (state) => {
    return state.offer;
  },
  userServices: (state) => {
    return state.userServices;
  },
  referral: (state) => {
    return state.referral;
  },
  userBalance: (state) => {
    return state.userBalance;
  },
  userWeekBalance: (state) => {
    return state.userWeekBalance;
  },
  userMonthBalance: (state) => {
    return state.userMonthBalance;
  },
  userYearBalance: (state) => {
    return state.userYearBalance;
  },
  movementsList: (state) => {
    return state.movementsList;
  },
  shopsList: (state) => {
    return state.shopsList;
  },
  shopsTypes: (state) => {
    return state.shopsTypes;
  },
  getNewPurchase: (state) => {
    return state.purchase;
  },
  getPurchaseInfo: (state) => {
    return state.purchase_info;
  },
  location: (state) => {
    return state.location;
  },
  savings: (state) => {
    return state.savings;
  },
  balanceDetails: (state) => {
    return state.balanceDetails;
  },
}