import helper from './queryHelper'

const sufi = '/api/offers/'
export default {
  getList: (filter) => {
    return `${sufi}public-offers/${helper.buildQueryString(filter)}`
  },
  getOffer: (id) => {
    return `${sufi}public-offers/${id}/`
  },
  hireOffer: `${sufi}offer-request/`,
  hireNow: (id) => { 
    return `${sufi}public-offers/${id}/email_contract_offer_now/`
  },
  freeStudy: (id) => { 
    return `${sufi}public-offers/email_savings_bill/`
  },
  bestSeller: () => { 
    return `${sufi}public-services/list_best_seller/`
  },
  bestSellerRequest: () => { 
    return `${sufi}bestsellers-invoices/`
  },
  bestSellerLink: () => { 
    return `${sufi}public-services/get_award_url/`
  },
  rating: {
    create: `${sufi}public-ratings/`,
    update: (id) => {
      return `${sufi}ratings/${id}/`
    },
    delete: (id) => {
      return `${sufi}ratings/${id}/`
    },
  }
}
