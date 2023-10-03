import endpoints from '~/endpoints'

const { authentication, utils } = endpoints

export default {
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, user) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.register(),
        data: user
      })
      return { success: true, data }
    } catch (e) {
      console.error('action register error', e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  // eslint-disable-next-line no-unused-vars
  async verifyEmail({ commit }, token) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.verifyEmail(),
        data: { key: token }
      })
      return data
    } catch (e) {
      console.error('verify error', e)
      if (e.statusCode === 404) throw e
      return { error: true, object: e }
    }
  },
  // eslint-disable-next-line no-unused-vars
  async reset({ commit }, info) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.reset(),
        data: info
      })
      return { success: true , data}
    } catch (e) {
      console.error('verify error', e)
      if (e.statusCode === 404) throw e
      return { success: false, object: e }
    }
  },
  // eslint-disable-next-line no-unused-vars
  async resetConfirm({ commit }, info) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.resetConfirm(),
        data: info
      })
      return { success: true , data}
    } catch (e) {
      console.error('verify error', e)
      if (e.statusCode === 404) throw e
      return { success: false, object: e }
    }
  },
  async postalCodeVerify({ commit }, code) {
    try {
      const { data } = await this.$api({
        method: 'GET',
        url: utils.postalCodeVerify(code)
      })
      return { success:true, data }
    } catch (e) {
      console.error('verify error', e)
      if (e.statusCode === 404) throw e
      return { error: true, data: e }
    }
  }
}
