/* eslint-disable camelcase */
<template>
  <div>
    <v-row class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.logoInicioLight" :style="imgStyle" class="mt-11" min-width="470">
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row justify="center" no-gutters>
          <v-col cols="10">
            <span class="app-display-1-bold white--text"> {{ $t('login.hello') }}, </span>
            <br />
            <span class="app-body-large">
              {{ $t('login.savingsStart') }}
            </span>
          </v-col>
        </v-row>
        <v-card light color="transparent" elevation="0">
          <v-row>
            <v-col class="d-flex justify-center">
              <v-form
                ref="form"
                v-model="formValid"
                class="boxLogin boxBackground pa-5"
                lazy-validation
              >
                <v-row light>
                  <v-col>
                    <app-text-field
                      v-model="email"
                      ligth
                      :label="$t('login.email')"
                      :label-style="'black--text'"
                      :rules="[rules.required, rules.email]"
                      type="email"
                    />
                    <app-password
                      :label="$t('login.password')"
                      :label-style="'black--text'"
                      :rules="[rules.required]"
                      :value="password"
                      recover
                      @changeRecover="$emit('changeRecover')"
                      @input="editPassword($event.key, $event.val)"
                    />
                    <v-checkbox
                      v-model="remember"
                      off-icon="mdi-checkbox-blank-outline"
                      on-icon="mdi-checkbox-marked-outline"
                      :color="'white'"
                      class="py-0 my-0"
                      @input="removeActive"
                    >
                    <template #label>
                      <span class="app-body-large black--text">
                        {{ $t('login.rememberMe') }}
                      </span>
                    </template>
                    </v-checkbox>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row :style="{ 'margin-top': '55%' }" justify="center">
      <app-btn
        :disabled="disabled"
        :loading="loading"
        size="medium"
        press-enter
        @click="userLogin"
      >
        {{ $t('login.access') }}
      </app-btn>
    </v-row>
    <v-row bottom class="mt-5" align="center" justify="center">
      <span class="white--text"> {{ $t('login.dontHave') }}, &nbsp; </span>
      <v-btn
      :to="localePath('pre-register')"
        class="pa-0 text-decoration-underline"
        color="white"
        exact
        router
        text
      >
        {{ $t('login.registerLogin') }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Form from '~/mixins/form'
import codes from '~/constants/codes'
import endpoints from '~/endpoints/user'

export default {
  name: 'LoginForm',
  mixins: [Form],
  layout: 'login',
  data: () => ({
    formValid: true,
    remember: false,
    email: '',
    password: '',
    loading: false,
    cookieCodes: codes
  }),
  computed: {
    imgStyle() {
      return { left: '125px', top: '0px' };
    },
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { top: '25%', background: 'rgba(7, 7, 7, 0.2)' };
      } else {
        return { top: '25%', background: 'rgba(255, 255, 255, 0.2)' };
      }
    },
    disabled() {
      return this.email === '' || this.password === '';
    }
  },
  mounted() {
    this.email = '';
    this.password = '';
    if (this.$cookies.keys().includes('credentials')) {
      try {
        let credentials = this.$cookies.get('credentials');
        credentials = window.atob(credentials);
        credentials = JSON.parse(credentials);
        this.email = credentials.email;
        this.password = credentials.password;
      } catch (e) {
        console.error(e);
      }
    }
  },
  methods: {
    async userLogin() {
      if (this.remember) {
        try {
          let credentials = JSON.stringify({
            email: this.email,
            password: this.password
          });
          credentials = window.btoa(credentials);
          this.$cookies.set('credentials', credentials, Infinity);
        } catch (e) {
          console.error(e);
        }
      }
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const { email, password } = this;
          const { data } = await this.$auth.loginWith('local', {
            data: { email, password }
          });
          if (data.access_token) {
            await this.$auth.strategy.token.set(data.access_token);
            await this.$auth.setUser(data.user);
          }
        }
      } catch (e) {
        console.error('error en login', e)
        const showErrorAsMessage = false
        this.errorMessages =
          this.handleErrorResponse((e.response || {}).data, showErrorAsMessage) || {}
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

      this.loading = false;
      let page;

      this.$cookies.get('firstLogin') === 'true' ? page = 'onboarding': page = 'dashboard';
      
      if(this.$auth.loggedIn) {
        await this.$router.push(this.localePath({ name: page }))
      }
    },
    editPassword(key, val) {
      if (key === 'password1') {
        this.password = val
      }
    },
    removeActive() {
      document.activeElement.blur();
    }
  }
}
</script>
