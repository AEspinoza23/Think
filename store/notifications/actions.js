import endpoints from '~/endpoints'

const { notifications } = endpoints

export default {
  async getNotificationsList({ commit, state }, filter) {
    try {
      const _filter = {
        page: state.notificationList.page,
        ...(filter || {})
      };
      const { data } = await this.$api.get(notifications.getNotifications(_filter))
      commit('SET_NOTIFICATIONS_LIST',{ 
        ...data,
        results: data.results,
        page: state.notificationList.page + 1
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async updateNotification({ commit }, info) {
    try {
      const { data } = await this.$api({
        method: 'PATCH',
        url: notifications.updateNotifications(info.id),
        data: info.data
      })
      commit('SET_NOTIFICATION_CHANGE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async deleteNotification({ commit }, id) {
    try {
      const { data } = await this.$api({
        method: 'DELETE',
        url: notifications.deleteNotifications(id),
      })
      commit('DELETE_NOTIFICATION', id)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async readAll() {
    try {
      const { data } = await this.$api({
        method: 'PUT',
        url: notifications.markAllRead,
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getNotificationsNumber({ commit }) {
    try {
      const { data } = await this.$api.get(notifications.getNotificationsNumber)
      commit('SET_NOTIFICATIONS_NUMBER', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  }
}