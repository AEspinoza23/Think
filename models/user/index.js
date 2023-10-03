import data from './data'
// import Address from '../address/index';
export default class User {
  get jsonBasicData() {
    return data
  }

  // get jsonAddress() {
  //   return Address;
  // }
  get model() {
    return {
      ...this.jsonBasicData
      // ...this.jsonAddress
    }
  }
}
