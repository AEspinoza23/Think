export default {
  SET_NOTIFICATIONS_LIST(state, { page, results, ...rest }) {
    const _results =
      page === 1
        ? results
        : [...state.notificationList.results, ...results];

    state.notificationList = { page, results: _results, ...rest };
  },
  RESET_NOTIFICATION_LIST(state) {
    state.notificationList = {
      page: 1,
      next: true,
      results: []
    }
  },
  SET_NOTIFICATION_CHANGE(state, notification) {
    const copy = [...state.notificationList.results];
    const index = copy.findIndex(({ id }) => id === notification.id);
    copy.splice(index, 1, notification);
    state.notificationList = {
      ...state.notificationList,
      results: copy
    };
  },
  DELETE_NOTIFICATION(state, notification) {
    const copy = { ...state.notificationList };
    const index = copy.results.findIndex(
      ({ id }) => id === notification
    );
    copy.results.splice(index, 1);
    state.notificationList.results = copy.results
  },
  SET_NOTIFICATIONS_NUMBER(state, number) {
    state.notificationNumber = number.notification_count;
  },
}