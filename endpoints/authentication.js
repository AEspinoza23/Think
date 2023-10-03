const sufi = '/api/dj-rest-auth'

export default {
  register: () => {
    return `${sufi}/registration/`
  },
  verifyEmail: () => {
    return `/api/users/users/verify_email/`
  },
  reset: () => {
    return `${sufi}/password/reset/`
  },
  resetConfirm: () => {
    return `${sufi}/password/reset/confirm/`
  },
  token: {
    create: `${sufi}/token/refresh/`
  }
}
