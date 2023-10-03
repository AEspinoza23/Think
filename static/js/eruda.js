if (window) {
  window.addEventListener('load', function (event) {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // eslint-disable-next-line no-undef
    if (eruda) {
      // eslint-disable-next-line no-undef
      eruda.init({
        container: el,
        tool: ['console', 'elements']
      })
    }
  })
}
