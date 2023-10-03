import Cookie from 'js-cookie'
import helper from './api-helper'
export default function ({ $axios, app }, inject) {
  Cookie.set('piensa_language', app.i18n.locale)
  const apiFree = $axios.create()
  apiFree.onError = helper.onError
  apiFree.defaults.baseURL = '/'
  inject('apiFree', apiFree)
}
