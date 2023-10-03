import Pages from './lang/pages/index'
import Locales from './constants/locales'

export default {
  dev: process.env.NODE_ENV !== 'production',
  // Disable ssr
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Piensa',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover user-scalable=no'
      },
      {
        name: 'google',
        content: 'notranslate'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    ...(process.env.NODE_ENV !== 'production' && {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/eruda'
        },
        { src: '/js/eruda.js' }
      ]
    }),

    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon256.ico' }]
  },

  googleAnalytics: {
    // Options
    id: 'G-DWXVBZMFCK'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/icons/fontello.css', '~/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/utils.js' },
    { src: '~/plugins/services.js' },
    { src: '~/plugins/api.js' },
    { src: '~/plugins/api-fr.js' },
    { src: '~/plugins/vue-cookies' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/lottie' },
    { src: '~/plugins/vue-apexchart.js', ssr: false },
    { src: '~/plugins/round-slider.js', ssr: false },
    { src: '~/plugins/qrcode-reader.js', ssr: false },
    { src: '~/plugins/vue-flicking-slider.js' },
    /* { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' }, */
    /* { src: '~/plugins/google-analytics.js', mode: 'client' }, */
    { src: '~/plugins/vue2-google-maps.js' },
    { src: '~/plugins/vue-qr-generator.js', ssr: false },
    { src: '~/plugins/vue-html2pdf.js', ssr: false },
    { src: '~/plugins/vue-the-mask.js' },
  ],

  // nuxt i18n config
  i18n: {
    lazy: true,
    vueI18nLoader: true,
    parsePages: false,
    langDir: 'lang/',
    locales: Locales,
    defaultLocale: 'es',
    strategy: 'prefix',
    pages: Pages
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/date-fns',
    'nuxt-compress',
    'vue-social-sharing/nuxt'
    /* '@yabhq/nuxt-hotjar', {
      hjid: 2973806, // required
      hjsv: 6, // optional
    } */
    /* [
      '@netsells/nuxt-hotjar', {
      id: '2973806',
      sv: '6',
    }], */
  ],
  dateFns: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    format: 'dd/mm/yyyy'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'https://piensa-pre.sfsl.es'
        : 'https://piensa-pre.sfsl.es',
    proxy: process.env.NODE_ENV === 'development'
  },

  ...(process.env.NODE_ENV === 'development' && {
    proxy: {
      '/api': 'https://piensa-pre.sfsl.es'
    }
  }),
  auth: {
    redirect: false,
    localStorage: false, // REALLY not secure, so nah
    resetOnError: false, // kick the user if any error happens w/ the auth
    strategies: {
      local: {
        scheme: 'refresh', // used for the refreshToken flow
        token: {
          property: 'access',
          maxAge: 60 * 168 // only useful if not detected on the login
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh',
          maxAge: 60 * 168
        },
        user: {
          property: false,
          autoFetch: false // no need to fetch the user, will be done in gql
        },
        endpoints: {
          login: {
            url: '/api/dj-rest-auth/login/',
            method: 'post'
          },
          refresh: {
            url: '/api/dj-rest-auth/token/refresh/',
            method: 'post'
          },
          logout: {
            url: '/api/dj-rest-auth/logout/',
            method: 'post'
          },
          user: {
            url: '/api/dj-rest-auth/user/',
            method: 'get'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    plugins: [{ src: '~/plugins/auth.js', mode: 'client' }]
  },
  router: {
    middleware: []
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: '~/plugins/vuetify.options.js'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  loading: {
    color: '#00BBBF',
    height: '3px'
  },
  loadingIndicator: {
    name: 'fading-circle',
    color: '#00BBBF',
    background: 'white'
  }
}
