<template>
  <div v-if="login" class="d-flex justify-center">
    <login-form @changeRecover="login = !login" />
  </div>
  <div v-else class="d-flex align-center justify-center fill-height pa-5">
    <forgot-success v-if="success" :email="email" @changeRecover="login = !login" />
    <forgot-email v-else @changeRecover="login = !login" @changeSuccess="changeSuccess" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Theme from '~/constants/theme'

export default {
  name: 'Login',
  layout: 'login',
  middleware: ['authenticate'],
  data: () => ({
    login: true, // true: login false: recover
    success: false, // false: email form, true: success message
    email: '',
    themeItems: Theme
  }),
  mounted() {
    if (!this.$cookies.keys().includes('firstLogin')) {
      this.$cookies.set('firstLogin', true, Infinity);
    }
    // if (this.$auth.loggedIn) {
    /* const { success, data } = await this.updateProfile({
      theme: this.$auth.$state.user.theme
    })
    const themeValue = this.themeItems.find(
      (item) => item.value === this.$auth.$state.user.theme
    ).value

    if (success) {
      await this.$auth.setUser(data)
      this.changeAppTheme(themeValue === 2 || themeValue === 3)
      await this.$router.push(this.localePath('offers'))
    } else {
      this.handleErrorResponse(data)
    } */
    //   this.$router.push(this.localePath('dashboard'))
    // }
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
      // changeAppTheme: 'app/changeAppTheme',
      // updateProfile: 'profile/update'
    }),
    changeSuccess(val) {
      this.email = val
      this.success = !this.success
    }
  }
}
</script>
