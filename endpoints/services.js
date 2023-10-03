import helper from './queryHelper'

const sufi = '/api/offers/'
export default {
  getList: (filter) => {
    return `${sufi}public-services/${helper.buildQueryString(filter)}`
  },
  getService: (id) => {
    return `${sufi}public-services/${id}/`
  }
}
