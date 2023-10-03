import endpoints from '~/endpoints'

const { offers } = endpoints

export default {
  async getOffersList({ commit }, filter) {
    try {
      const { data } = await this.$apiFree.get(offers.getList(filter))
      commit('SET_OFFERS_LIST', data.results)
      return { success: true, data: data.results, next: data.next };
    } catch (e) {
      return {success: false, data: e, next: null};
    }
  },
  async getMoreOffers({ commit }, url) {
    try {
      const { data } = await this.$apiFree.get(url)
      commit('SET_OFFERS_LIST', data.results);
      return { success: true, data: data.results, next: data.next };
    } catch (e) {
      return {success: false, data: e, next: null};
    }
  },
  async getOffer({ commit }, id) {
    try {
      const { data } = await this.$apiFree.get(offers.getOffer(id))
      commit('SET_OFFER', data)
      return { success: true, data }
    } catch (e) {
      error(e)
      return { success: false, data: e }
    }
  },

  async hireOffer({ _ }, payload) {
    try {
      const { data } = await this.$apiFree({
        method: 'POST',
        url: offers.hireOffer,
        data: payload
      })
      return { success: true, data }
    } catch (e) {
      return { success: false, data: e.response.data }
    }
  },

  async hireOfferNow({ _ }, id) {
    try {
      const { data } = await this.$apiFree({
        method: 'POST',
        url: offers.hireNow(id)
      })
      return { success: true, data }
    } catch (e) {
      return { success: false, data: e.response.data }
    }
  },

  async freeStudyApply({ _ }, info) {
    try {
      const { data } = await this.$apiFree({
        method: 'POST',
        url: offers.freeStudy(info.id),
        data: info.data,
        headers: Headers.multipart
      })
      return { success: true, data }
    } catch (e) {
      console.log(e);
      return { success: false, data: e.response.data }
    }
  },

  async bestSellerList({ commit }) {
    try {
      const { data } = await this.$apiFree.get(offers.bestSeller());
      commit('SET_BEST_SELLER_LIST', data);
      return { success: true, data };
    } catch (e) {
      error(e);
    }
  },

  async bestSellerLink({ commit }) {
    try {
      const { data } = await this.$apiFree.get(offers.bestSellerLink());
      commit('SET_BEST_SELLER_LINK', data);
      return { success: true, data };
    } catch (e) {
      error(e);
    }
  },

  async bestSellerRequest({ commit }, info) {
    try {
      const { data } = await this.$apiFree({
        method: 'POST',
        url: offers.bestSellerRequest(),
        data: info,
        headers: Headers.multipart
      })
      commit('UPDATE_BEST_SELLER_LIST', data)
      return { success: true, data }
    } catch (e) {
      console.log(e);
      return { success: false, data: e }
    }
  },
}

function error(e) {
  console.log(e)
  if (e.statusCode === 404) throw e
  return { success: false, data: e }
}
