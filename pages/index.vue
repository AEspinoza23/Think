<template>
  <div class="app" style="height: 100%">
    <div
      v-if="$route.query.verification_key"
      class="d-flex align-center justify-center"
      style="height: 100%"
    >
      <div class="d-flex align-center pa-3">
        <v-row v-if="!emailVerificationResponse.error" class="boxLogin">
          <v-col>
            <v-row v-if="loading" class="mt-10" justify="center" no-gutters>
              <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
            </v-row>
            <v-row class="app-body-large-bold" justify="center">
              {{ $t('login.verified') }}
            </v-row>
            <v-row justify="center">
              <div class="app-body-medium text-center my-2">
                {{ $t('login.thanks') }}
              </div>
            </v-row>
          </v-col>
        </v-row>
        <register-failed v-else class="pa-5" @retry="verifyEmail" />
      </div>
    </div>
    <!--    TRANSITION-->
    <!--    <transition v-else name="fade">-->
    <!--      <login-splash v-if="splashFinish" @finish="transitions" />-->
    <!--    </transition>-->
    <login-welcome v-else />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
import endpoints from '~/endpoints/user'

export default {
  name: 'Index',
  layout: 'login',
  data() {
    return {
      splashFinish: true,
      loginStart: false,
      loading: false,
      emailVerificationResponse: {}
    }
  },
  beforeMount() {
    // eslint-disable-next-line import/no-named-as-default-member
    Vue.nextTick(function () {
      Vue.prototype.$isIOS = navigator
        ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
        : ''
    })
  },
  async mounted() {
    if (!this.$cookies.keys().includes('firstLogin')) {
      this.$cookies.set('firstLogin', true, Infinity);
    }
    const { token } = this.$route.query;
    if (token) {
      this.$auth.$storage.setUniversal('auth_token_push', token);
    }
    await this.changeAppTheme(false);
    await this.verifyEmailOrPassword();
    if(!this.$auth.loggedIn) {
      await this.autoLogin();
    }
  },
  methods: {
    ...mapActions({
      verifyEmailAction: 'authentication/verifyEmail',
      changeAppTheme: 'app/changeAppTheme'
    }),
    async autoLogin() {
      let email = '';
      let password = '';
      if (this.$cookies.keys().includes('credentials')) {
        try {
          let credentials = this.$cookies.get('credentials');
          credentials = window.atob(credentials);
          credentials = JSON.parse(credentials);
          email = credentials.email;
          password = credentials.password;
          const { data } = await this.$auth.loginWith('local', {
            data: { email, password }
          })
          if (data.access_token) {
            await this.$auth.strategy.token.set(data.access_token)
            await this.$auth.setUser(data.user)
          }
        } catch (e) {
          console.error(e);
        }
        try {
        const authTokenPush = this.$auth.$storage.getUniversal('auth_token_push')
        if (authTokenPush)
          this.$axios.post(endpoints.pushNotifications, {
            device_token: authTokenPush
          })
        } catch (e) {
          this.handleErrorResponse(e.response)
        }

        this.loading = false
        let page;

        this.$cookies.get('firstLogin') === 'true' ? page = 'onboarding': page = 'dashboard';
        
        if(this.$auth.loggedIn) {
          await this.$router.push(this.localePath({ name: page }))
        }
      }
    },
    async verifyEmailOrPassword() {
      this.emailVerificationResponse = {}
      if (this.$route.query.verification_key) {
        this.loading = true
        this.emailVerificationResponse = await this.verifyEmailAction(
          this.$route.query.verification_key
        )
        this.loading = false
        if (this.emailVerificationResponse.detail) {
          await this.$router.push(
            this.localePath({
              name: `verified`
            })
          )
        } else {
          this.$flash({
            message: this.emailVerificationResponse.object.detail,
            color: 'error'
          })
        }
      } else if (this.$route.query.password_token && this.$route.query.password_uuid) {
        await this.$router.push(
          this.localePath({
            name: 'recover',
            query: this.$route.query
          })
        )
      }
    },
    transitions() {
      this.splashFinish = false
      setTimeout(() => {
        this.loginStart = true
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.app {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  //FADE IN AND OUT FOR SPLASH
  .fade-enter-active {
    transition: all 1s ease;
  }

  .fade-leave-active {
    transition: all 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
