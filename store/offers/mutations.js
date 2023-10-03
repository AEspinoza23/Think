export default {
  SET_OFFERS_LIST(state, offerList) {
    state.offersList = offerList
  },
  SET_OFFER(state, offer) {
    state.offer = offer
  },
  SET_BEST_SELLER_LIST(state, bestSeller) {
    state.bestSeller = bestSeller;
  },
  SET_BEST_SELLER_LINK(state, link) {
    state.bestSellerLink = link;
  },
  UPDATE_BEST_SELLER_LIST(state, bestSeller) {
    const copy = [...state.bestSeller];
    const index = copy.findIndex(({ id }) => id === bestSeller.service);
    if (index > -1) {
      copy[index].uploaded = true;
    }
    state.bestSeller = [...copy];
  }
}
