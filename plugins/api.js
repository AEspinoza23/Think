import Cookie from 'js-cookie'
import helper from './api-helper'
let isRefreshing = false
let failedQueue = []
const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })

  failedQueue = []
}

export default function ({ $axios, app }, inject) {
  Cookie.set('piensa_language', app.i18n.locale)
  
  $axios.onRequest(config => {
    config.withCredentials = true

    return config
  })

  const api = $axios.create({
    baseURL: process.env.baseUrl
  })

  // SET TOKEN
  api.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: app.$auth.strategy.token.get(),
      'Accept-Language': app.i18n.locale
    }
    return config
  })

  // config parameter
  api.onError(async ({ response, config }) => {
    const originalRequest = config
    let result = response.data
    const code = response.status
    const codeCondition =
      code === 500 || code === 502 || code === 405 || code === 403 || code === 408 || code === 300
    if (codeCondition) {
      result = { code, detail: code }
    }

    if (code === 401) {
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject })
          })
            .then(() => {
              return api(originalRequest)
            })
            .catch((err) => {
              return Promise.reject(err)
            })
        } else {
          originalRequest._retry = true
          isRefreshing = true
          const { success, data } = await helper.refreshToken(app.$auth.strategy.refreshToken.get())
          if (success) {
            await app.$auth.strategy.token.set(data)
            processQueue()
            return api(originalRequest)
          } else {
            processQueue(data)
          }
          isRefreshing = false
        }
      }
      return app.router.push(app.localePath('/login'))
    }
    return Promise.reject(result)
  })
  api.defaults.baseURL = '/'
  inject('api', api)
}
