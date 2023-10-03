import endpoints from '~/endpoints'

const { services } = endpoints

export default {
  async getServicesList({ commit, state }) {
    try {
      const _filter = {
        page: state.servicesList.page
      };
      
      const { data } = await this.$api.get(services.getList(_filter))
      commit('SET_SERVICES_LIST', { 
        ...data,
        results: data.results,
        page: state.servicesList.page + 1
      })
      return { success: true, data }
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  },
  async getService({ commit }, id) {
    try {
      const { data } = await this.$api.get(services.getService(id))
      commit('SET_SERVICE', data.results)
    } catch (e) {
      console.log(e)
      if (e.statusCode === 404) throw e
      return { success: false, data: e }
    }
  }
}
