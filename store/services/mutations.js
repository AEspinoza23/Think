export default {
  SET_SERVICES_LIST(state, { page, results, ...rest }) {
    const _results =
      page === 1
        ? results
        : [...state.servicesList.results, ...results];

    state.servicesList = { page, results: _results, ...rest };
  },
  SET_SERVICE(state, service) {
    state.service = service
  },
  SET_SERVICE_CATEGORY(state, serviceCategory) {
    state.serviceCategory = serviceCategory
  }
}
