import endpoints from '~/endpoints'

const { user, offers } = endpoints

export default {
  async listUserOffers({ commit, state }) {
    try {
      const _filter = {
        page: state.userServices.page
      };
      const { data } = await this.$api.get(user.listUserOffers(_filter))
      commit('SET_USER_SERVICES', { 
          ...data,
          results: data.results,
          page: state.userServices.page
        }
      )
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserOffer({ commit }, id) {
    try {
      const _filter = {
        user_offer_id: id
      };
      const { data } = await this.$api.get(user.getUserOffer(_filter))
      commit('SET_OFFER', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUser({ commit }, id) {
    try {
      const { data } = await this.$api.get(user.getUser(id))
      commit('SET_USER', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getReferral({ commit }, id) {
    const _filter = { referral_id: id }
    try {
      const { data } = await this.$api({
        method: 'GET',
        url: user.getReferral(_filter)
      })
      commit('SET_REFERRAL', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },

  async createComment({ commit }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: offers.rating.create,
        data: payload.info
      })
      commit('SET_NEW_RATING', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },

  async editComment({ commit }, payload) {
    try {
      const { data } = await this.$api({
        method: 'PATCH',
        url: offers.rating.update(payload.id),
        data: payload.info
      })
      commit('UPDATE_RATING', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },

  async deleteComment({ commit }, id) {
    try {
      const { data } = await this.$api({
        method: 'DELETE',
        url: offers.rating.delete(id),
      })
      commit('DELETE_RATING', id)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserBalance({ commit }) {
    try {
      const { data } = await this.$api.get(user.balanceSummary)
      commit('SET_USER_BALANCE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserWeekBalance({ commit }) {
    try {
      const { data } = await this.$api.get(user.balanceWeekSummary)
      commit('SET_USER_WEEK_BALANCE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserMonthBalance({ commit }) {
    try {
      const { data } = await this.$api.get(user.balanceMonthSummary)
      commit('SET_USER_MONTH_BALANCE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserYearBalance({ commit }) {
    try {
      const { data } = await this.$api.get(user.balanceYearSummary)
      commit('SET_USER_YEAR_BALANCE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getMovementList({ commit }, filter) {
    try {
      const { data } = await this.$api.get(user.listBalanceMovements(filter))
      commit('SET_MOVEMENTS_LIST', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async shopsList({ commit, state }, filter) {
    try {
      const _filter = {
        ...filter
      };
      const { data } = await this.$api.get(user.shops.list(_filter))
      commit('SET_SHOPS_LIST', { 
          ...data,
          results: data.results,
        }
      )
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getShopsTypes({ commit, state }) {
    try {
      const _filter = {
        page: state.shopsTypes.page
      };
      const { data } = await this.$api.get(user.shops.types(_filter))
      commit('SET_SHOPS_TYPES', { 
        ...data,
        results: data.results,
        page: state.shopsTypes.page + 1
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async createPurchase({ commit }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.shops.create_purchase,
        data: payload
      })
      commit('SET_NEW_PURCHASE', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async readPurchase({ commit }, payload) {
    try {
      const { data } = await this.$api({
        method: 'GET',
        url: user.shops.retrieve_purchase(payload)
      })
      commit('SET_PURCHASE_INFO', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      return { success: false, data: e }
    }
  },
  async payWithBalance({ commit }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.shops.pay_with_balance,
        data: payload
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async savePdf({ c }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.shops.save_pdf,
        data: payload,
        headers: Headers.multipart
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async savePdfClient({ c }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.shops.save_pdf_client,
        data: payload,
        headers: Headers.multipart
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async requestBalance({ _ }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.requestBalance,
        data: payload
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async createCommerce({ commit }, info) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.createCommerce,
        data: info
      })
      return { success: true, data }
    } catch (e) {
      console.error('action create commerce error', e)
      return { success: false, data: e }
    }
  },
  async createOwnCommerce({ commit }, info) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.createOwnCommerce,
        data: info
      })
      return { success: true, data }
    } catch (e) {
      console.error('action create own commerce error', e)
      return { success: false, data: e }
    }
  },
  async getCommerceCount({c}) {
    try {
      const { data } = await this.$api(user.getCommercesCount)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getUserSavings({ commit }) {
    try {
      const { data } = await this.$api.get(user.getSavings)
      commit('SET_SAVINGS', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getBalanceDetail({ commit }, slug) {
    try {
      const { data } = await this.$api.get(user.getBalanceDetail(slug))
      commit('SET_BALANCE_DETAILS', data)
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async sendEmail({ _ }, payload) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: user.sendEmail(),
        data: payload
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
}
