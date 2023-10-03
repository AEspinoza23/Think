import UserConstants from '~/constants/users/index'

RegExp.quote = function (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

export default {
  data() {
    return {
      rules: {
        required: (value) => {
          return !!value || this.$t('validation.required')
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('validation.emailValidation')
        },
        password: (value) => {
          return !value || value.length > 7 || this.$t('validation.passwordShort')
        },
        phone: (value) => {
          const pattern = /^\+?1?\d{9,15}$/
          return pattern.test(value) || this.$t('profile.phoneValidation')
        }
      }
    }
  },
  computed: {
    setSelect() {
      return (value) => {
        const val = UserConstants[value]
        const result = []
        const items = { ...val }
        Object.keys(items).forEach((key) => {
          result.push({
            value: items[key].value,
            // text: this.$t(items[key].text)
            text: items[key].text
          })
        })
        return result
      }
    }
  },
  methods: {
    autocompleteField() {
      return `${Math.random()}_random_field`
    },
    handleErrorResponse(data, showErrorAsMessage) {
      if (!data) {
        return {}
      }
      let message = ''
      if (showErrorAsMessage) {
        message = 'Complete los campos obligatorios'
      } else if (data.error) {
        message = data.error
      } else if (data.details) {
        message = data.details
      } else if (data.detail || data.non_field_errors) {
        message = data.detail || data.non_field_errors[0]
      } else {
        message = this.showFirstFieldMessage(data)
      }

      this.$flash({
        message,
        color: 'error'
      })
      return data
    },
    handleActionResponse({ success, data, successMessage, showErrorAsMessage }) {
      if (success) {
        successMessage && this.$flash(successMessage)
        return {}
      } else {
        return this.handleErrorResponse(data, showErrorAsMessage)
      }
    },
    showFirstFieldMessage(data) {
      const defaultMessage = this.$t('appMessages.unknownError')
      let message = ''
      try {
        message = Object.values(data)[0]
      } catch {
        console.warn(message)
      }
      return message[0] || defaultMessage
    }
  }
}
