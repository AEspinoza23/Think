import Vue from 'vue'

export default ({ $vuetify }) => {
  // currency
  Vue.filter('appCurrency', function (value, um) {
    if (value || value === 0) {
      const m = Number((Math.abs(value) * 100).toPrecision(15));
      const roundValue = Math.round(m) / 100 * Math.sign(value);
      const result1 = parseFloat(roundValue).toFixed(2)
      return isNaN(result1)
        ? value
        : roundValue + '€'
    } else return ''
  })

  // short a word
  Vue.filter('shortenWord', function (value, index) {
    if (value || index === 0) {
      if (value.length >= index) {
        return value.substr(0, index) + '...'
      }
      return value
    } else return value
  })
}
