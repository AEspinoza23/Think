import helper from './queryHelper'
const sufi = '/api/inbox'

export default {
  getNotifications: (filter) => {
    return `${sufi}/notifications/${helper.buildQueryString(filter)}`
  },
  updateNotifications: (id) => {
    return `${sufi}/notifications/${id}/`
  },
  deleteNotifications: (id) => {
    return `${sufi}/notifications/${id}/`
  },
  getNotificationsNumber: `${sufi}/notifications/retrieve_notification_count/`,
  markAllRead: `${sufi}/notifications/read_all_notifications/`
}