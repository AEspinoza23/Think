import endpoints from '~/endpoints'

const { profile, utils } = endpoints

export default {
  async update(_, { ...value }) {
    const result = { success: true, data: {} }
    try {
      const { data } = await this.$api({
        method: 'PATCH',
        url: profile.update,
        data: value
      })
      result.data = data
      return result
    } catch (e) {
      if (e.statusCode === 404) throw e
      result.data = e
      result.success = false
      return result
    }
  },

  async updatePassword(_, { ...value }) {
    const result = { success: true, data: {} }
    try {
      result.data = await this.$api({
        method: 'POST',
        url: profile.updatePassword,
        data: value
      })
      return result
    } catch (e) {
      if (e.statusCode === 404) throw e
      result.data = e
      result.success = false
      return result
    }
  },
  // async resetPassword(_, email) {
  //   const result = { success: true, data: {} }
  //   try {
  //     const { data } = await this.$api({
  //       method: 'POST',
  //       url: user.resetPassword,
  //       data: { email }
  //     })
  //     result.data = data
  //     return result
  //   } catch (e) {
  //     result.data = e
  //     result.success = false
  //     return result
  //   }
  // },
  // async resetPasswordConfirm(_, payload) {
  //   try {
  //     const { data } = await this.$api({
  //       method: 'POST',
  //       url: user.resetPasswordConfirm,
  //       data: payload
  //     })
  //
  //     return { success: true, data }
  //   } catch (e) {
  //     console.warn('store/actions/profile/resetPasswordConfirm', e)
  //     return { success: false, data: e }
  //   }
  // },

  async delete(_, id) {
    try {
      const { data } = await this.$api.delete(profile.delete(id))
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async uploadAvatar({ commit }, payload) {
    const { data } = await this.$api({
      method: 'POST',
      url: utils.uploadImage,
      data: payload,
      headers: Headers.multipart
    })
    commit('SET_NEW_AVATAR', data)
    return data
  },
  async getUser({ commit }) {
    try {
      const { data } = await this.$api.get(profile.user())
      commit('SET_USER', data)
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async sendContactForm({ _ }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: profile.contact,
        data: payload
      })
      return {
        success: true,
        data
      }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async createAddress({ _ }, payload) {
    try {
      await this.$api({
        method: 'POST',
        url: profile.address,
        data: payload
      })
      return { success: true }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async updateAddress({ _ }, payload) {
    try {
      await this.$api({
        method: 'PATCH',
        url: profile.updateAddress(payload.id),
        data: payload.data
      })
      return { success: true }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async deleteAddress({ _ }, id) {
    try {
      await this.$api.delete(profile.deleteAddress(id))
      return { success: true }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  }
}
