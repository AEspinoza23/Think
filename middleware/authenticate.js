export default async function ({ $auth, redirect, app, route, $axios }) {
  if (!$auth?.$state?.loggedIn) {
    const isInOffersPage = route?.name?.indexOf('offers') === 0
    const isInOfferPage = route?.name?.indexOf('offer') === 0
    const isInLoginPage = route?.name?.indexOf('login') === 0
    const isInDashboardPage = route?.name?.indexOf('dashboard') === 0
    const isInProfilePage = route?.name?.indexOf('profile') === 0
    const isInComponentsPage = route?.name?.indexOf('components') === 0
    if (
      !isInOffersPage && !$auth?.$state?.loggedIn && $auth?.strategy?.token?.get() 
      || !isInOfferPage && !$auth?.$state?.loggedIn && $auth?.strategy?.token?.get()
      || !isInDashboardPage && !$auth?.$state?.loggedIn && $auth?.strategy?.token?.get()
      || !isInProfilePage && !$auth?.$state?.loggedIn && $auth?.strategy?.token?.get()
      || !isInComponentsPage && !$auth?.$state?.loggedIn && $auth?.strategy?.token?.get()
    ) {
      try {
        const url =
          process.env.NODE_ENV === 'development'
            ? 'https://piensa-pre.sfsl.es/api/dj-rest-auth/user/'
            : '/api/dj-rest-auth/user/'
        const { data } = await $axios.get(url, {
          headers: { Authorization: $auth.strategy.token.get() }
        })
        await $auth.setUser(data)

        if (!$auth.$state.loggedIn && !isInLoginPage) {
          return redirect(app.localePath('/login'))
        } else if ($auth.$state.loggedIn && isInLoginPage) {
          return redirect(app.localePath('/dashboard'))
        }
      } catch (err) {
       
      }
      return true
    }
  }
}
