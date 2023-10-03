const sufi = '/api/utils'

export default {
  // to consume this endpoint send on data type: 1 for user avatar, type: 2 for images
  uploadImage: `${sufi}/images/`,
  postalCodeVerify: (filter) => { 
    return `${sufi}/zip_code/select_zip_code/?zip_code=${filter}`
  }
}
