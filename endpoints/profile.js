const sufi = '/api/dj-rest-auth'
export default {
  update: `${sufi}/user/`,
  updatePassword: `${sufi}/password/change/`,
  contact: '/api/users/users/send_contact_email/',
  address: '/api/users/user-address/',
  updateAddress: (id) => {
    return `/api/users/user-address/${id}/`
  },
  deleteAddress: (id) => {
    return `/api/users/user-address/${id}/`
  }
}
