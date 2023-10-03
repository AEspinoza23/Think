export default {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_OFFER(state, offer) {
    state.offer = offer;
  },
  SET_REFERRAL(state, referral) {
    state.referral = referral;
  },
  SET_USER_SERVICES(state, { page, results, ...rest }) {
    const _results =
      page === 1
        ? results
        : [...state.userServices.results, ...results];

    state.userServices = { page, results: _results, ...rest };
  },
  SET_NEW_RATING(state, rating) {
    const copy = [...state.offer.offer.feedbacks]
    copy.push(rating)
    state.offer.offer.feedbacks = copy
    let totalRating = 0
    const totalFeedback = state.offer.offer.feedbacks.length
    state.offer.offer.feedbacks.forEach((feedback) => {
      totalRating = totalRating + feedback.rating;
    });
    const ratingAvg = totalRating / totalFeedback
    state.offer.offer.rating_avg = ratingAvg
    state.offer.offer.rating_count = state.offer.offer.rating_count + 1
  },
  UPDATE_RATING(state, rating) {
    const copy = [...state.offer.offer.feedbacks]
    const index = copy.findIndex(({ id }) => id === rating.id);
    copy.splice(index, 1, rating);
    state.offer.offer.feedbacks = copy
    let totalRating = 0
    const totalFeedback = state.offer.offer.feedbacks.length
    state.offer.offer.feedbacks.forEach((feedback) => {
      totalRating = totalRating + feedback.rating;
    });
    const ratingAvg = totalRating / totalFeedback
    state.offer.offer.rating_avg = ratingAvg
  },
  DELETE_RATING(state, ratingId) {
    const copy = [...state.offer.offer.feedbacks]
    const index = copy.findIndex(({ id }) => id === ratingId);
    copy.splice(index, 1);
    state.offer.offer.feedbacks = copy
    let totalRating = 0
    const totalFeedback = state.offer.offer.feedbacks.length
    state.offer.offer.feedbacks.forEach((feedback) => {
      totalRating = totalRating + feedback.rating;
    });
    const ratingAvg = totalRating / totalFeedback
    state.offer.offer.rating_avg = ratingAvg
    state.offer.offer.rating_count = state.offer.offer.rating_count - 1
  },
  SET_USER_BALANCE(state, balance) {
    state.userBalance = balance;
  },
  SET_USER_WEEK_BALANCE(state, balance) {
    state.userWeekBalance = balance;
  },
  SET_USER_MONTH_BALANCE(state, balance) {
    state.userMonthBalance = balance;
  },
  SET_USER_YEAR_BALANCE(state, balance) {
    state.userYearBalance = balance;
  },
  SET_MOVEMENTS_LIST(state, results) {
    state.movementsList = results;
  },
  RESET_MOVEMENTS_LIST(state) {
    state.movementsList = {
      earnings: [],
      expenses: []
    }
  },
  SET_SHOPS_LIST(state, { page, results, ...rest }) {
    const _results =
      page === 1
        ? results
        : [...state.shopsList.results, ...results];

    state.shopsList = { page, results: _results, ...rest };
  },
  RESET_SHOPS_LIST(state) {
    state.shopsList = {
      page: 1,
      next: true,
      results: []
    };
  },
  SET_SHOPS_TYPES(state, { page, results, ...rest }) {
    const _results =
      page === 1
        ? results
        : [...state.shopsTypes.results, ...results];

    state.shopsTypes = { page, results: _results, ...rest };
  },
  SET_NEW_PURCHASE(state, purchase) {
    state.purchase = purchase;
  },
  SET_PURCHASE_INFO(state, info) {
    state.purchase_info = info;
  },
  SET_LOCATION(state, location) {
    state.location = location;
  },
  SET_SAVINGS(state, savings) {
    state.savings = savings;
  },
  SET_BALANCE_DETAILS(state, details) {
    state.balanceDetails = details;
  },
}