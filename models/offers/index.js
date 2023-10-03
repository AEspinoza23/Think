import offer from './offer'

export default class Offer {
  get jsonOffer() {
    return offer
  }

  get model() {
    return {
      ...this.jsonOffer
    }
  }
}