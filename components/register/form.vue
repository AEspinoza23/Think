<template>
  <div class="light">
    <v-row class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.logoInicioLight" :style="imgStyle" class="mt-11" min-width="470" />
      </v-col>
    </v-row>
    
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row justify="center" no-gutters>
          <v-col cols="10">
            <span class="app-display-1-bold white--text"> {{ $t('login.welcome') }}, </span>
            <br />
            <span class="app-body-large white--text">
              {{ $t('login.savingsStart') }}
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <v-form
              ref="form"
              v-model="form"
              class="boxRegister boxBackground pa-5"
              lazy-validation
            >
              <v-row no-gutters>
                <v-tabs 
                  v-model="tab" 
                  class="app-tabs rounded-lg my-5"
                  background-color="transparent"
                  hide-slider
                  grow
                  center-active
                  light
                >
                  <v-tab 
                    v-for="item in items" 
                    :key="item" 
                    class="text-capitalize px-10"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
                <v-col cols="12">
                  <app-text-field
                    :value="userDataObject.email"
                    :error-messages="errorMessages.email"
                    :label="`${$t('login.email')}*`"
                    :label-style="'black--text'"
                    :rules="[rules.required, rules.email]"
                    type="email"
                    autocomplete="off"
                    @input="edit($event, 'email')"
                  />
                </v-col>
                <v-col cols="12">
                  <app-text-field
                    :value="userDataObject.zip_code"
                    :error-messages="errorMessages.zip_code"
                    :label="$t('login.postalCode')+'*'"
                    :label-style="'black--text'"
                    :rules="[postalCodeRule, rules.required]"
                    :type="'number'"
                    autocomplete="off"
                    @input="edit($event, 'zip_code')"
                  />
                </v-col>
                <v-col cols="12">
                  <app-select
                    :value="userDataObject.cityAndProvince"
                    :error-messages="errorMessages.city || errorMessages.province"
                    :rules="[rules.required]"
                    :items="zipData"
                    :label-style="'black--text'"
                    :label="$t('login.cityAndProvince')+'*'"
                    no-translate
                    no-computed
                    @input="edit($event, 'city')"
                  />
                </v-col>
                <v-col cols="12">
                  <app-password
                    :delete-pass="deletePass"
                    :error-messages="errorMessages.password1"
                    :label-style="'black--text'"
                    is-register
                    autocomplete="off"
                    @input="edit($event.val, $event.key)"
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="userDataObject.accept_term"
                    :error-messages="errorMessages.accept_term"
                    hide-details="auto"
                    :label-style-class="'black--text'"
                    :rules="[rules.required]"
                    color="black"
                    autocomplete="off"
                    @input="edit($event, 'accept_term')"
                  >
                    <template #label>
                      <div class="app-body-small">
                        {{ $t('login.policy')}}
                        <v-tooltip color="transparent">
                          <template #activator="{ on }">
                            <a
                              class="black--text"
                              target="_blank"
                              href="https://piensanetwork.com/politica-de-privacidad" 
                              @click.stop
                              v-on="on"
                            >
                              {{ $t('login.privacy')}}
                            </a>
                          </template>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="12">
                  <span class="black--text app-body-small d-flex my-3">
                    {{ $t('login.lopdText')}}
                  </span>
                  <a
                    class="blue--text"
                    target="_blank"
                    href="https://clientes.protecciondatos.online/privacidad/piensa-network-sl" 
                    @click.stop
                  >
                    <span class="blue--text text--darken-3 app-body-small-bold d-flex my-3">
                      https://clientes.protecciondatos.online/privacidad/piensa-network-sl
                    </span>
                  </a>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <v-btn
          class="pa-0 text-decoration-underline"
          color="white"
          text
          @click="referralInput = !referralInput"
        >
          <span class="app-body-medium">
            ¿Tienes un código de referido?
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="referralInput" class="pl-1 pt-1" no-gutters>
      <v-col class="d-flex justify-center">
        <div class="boxRegister boxBackground pa-5">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-end" >
              <v-icon size="25" @click="referralInput = !referralInput">mdi-close</v-icon>
            </v-col>
            <v-col cols="12">
              <app-text-field
                :value="referral_code"
                :error-messages="errorMessages.referral_code"
                :label="`${$t('login.referCode')}`"
                :label-style="'black--text'"
                autocomplete="off"
                @input="edit($event, 'referral_code')"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center pb-4">
        <app-btn
          :loading="loading"
          size="small"
          press-enter
          @click="createAccount"
        >
          {{ $t('login.create') }}
        </app-btn>
      </v-col>
    </v-row>
    <v-row v-if="!$route.query.referral_code">
      <v-col class="d-flex justify-center align-center">
        <span class="white--text"> {{ $t('login.gotAccount') }}, &nbsp; </span>
        <v-btn
          :to="localePath('login')"
          class="pa-0 text-decoration-underline"
          color="white"
          exact
          router
          text
        >
          {{ $t('login.access') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { isPossiblePhoneNumber } from 'libphonenumber-js'
import { mapActions } from 'vuex'
import Form from '~/mixins/form'
import CountriesCodes from '~/constants/countries-code'

export default {
  name: 'RegisterIndex',
  mixins: [Form],
  layout: 'RegisterForm',
  data: () => ({
    form: null,
    userDataObject: {
      accept_term: false,
      zip_code: '',
      cityAndProvince: null,
      referral_code: null
    },
    referral_code: null,
    referralInput: false,
    errorMessages: {},
    loading: false,
    dialog: false,
    zipData: [],
    phone_code: '+34',
    phone_number: null,
    tab: 0,
    items: ['Usuario', 'Comercio'],
    deletePass: false
  }),
  computed: {
    countriesCodes() {
      return CountriesCodes
    },
    validateNumber() {
      if (this.phone_number && this.phone_code) {
        const phoneNumber = isPossiblePhoneNumber(
          this.phone_code + this.phone_number,
          this.findCountryPhone(this.phone_code)?.code
        )
        return (
          phoneNumber ||
          `El número de teléfono no pertenece a ${this.findCountryPhone(this.phone_code)?.name_es}`
        )
      }
      return true
    },
    imgStyle() {
      return { left: '12px', top: '0px' }
    },
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { background: 'rgba(7, 7, 7, 0.2)' }
      } else {
        return { background: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  },
  watch: {
    tab() {
      this.userDataObject = {
        email: '',
        zip_code: '',
        accept_term: false,
        cityAndProvince: null
      };
      this.deletePass = !this.deletePass;
    }
  },
  mounted() {
    if (this.$route.query.referral_code) {
      this.referralInput = true;
      this.userDataObject.referral_code = this.$route.query.referral_code;
      this.referral_code = this.$route.query.referral_code;
    };
    if (this.$route.query.commerce === 'true') {
      this.tab = 1
    };
  },
  methods: {
    ...mapActions({
      register: 'authentication/register',
      postalCodeVerify: 'authentication/postalCodeVerify'
    }),
    findCountryPhone(code) {
      return CountriesCodes.find((item) => {
        return item.dial_code === code
      })
    },
    async createAccount() {
      if (this.tab === 0) {
        if (this.$refs.form.validate()) {
          this.errorMessages = {
            first_name: [],
            middle_name: [],
            last_name: [],
            email: [],
            referral_code: [],
            password1: [],
            accept_term: []
          }
          this.loading = true;
          if (
            this.userDataObject.referral_code === '' ||
            this.userDataObject.referral_code === null
          ) {
            delete this.userDataObject.referral_code;
          }
          const { success, data } = await this.register(this.userDataObject)
          if (success) {
            this.$emit('created', {
              success: true,
              email: this.userDataObject.email
            })
          } else {
            let showErrorAsMessage = true;
            if (data.detail || data.error) {
              showErrorAsMessage = false;
            }
            this.handleErrorResponse(data, showErrorAsMessage);
            this.errorMessages = data;
          }
          this.loading = false;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.$refs.form.validate()) {
          this.$emit('commerce', this.userDataObject);
        }
      }
    },
    edit(val, key) {
      if (key === 'accept_term') {
        document.activeElement.blur();
      } else if (key === 'zip_code' && val.length === 5) {
        this.userDataObject.city = '';
        this.errorMessages.city = '';
        this.userDataObject.province = '';
        this.errorMessages.province = '';
        this.userDataObject.cityAndProvince = '';
        this.errorMessages.cityAndProvince = '';
        this.postalCodeCheck(val);
        this.userDataObject[key] = val;
        this.errorMessages[key] = ''
      } else if (key === 'city') {
        this.userDataObject.city = val[0]
        this.errorMessages.city = ''
        this.userDataObject.province = val[1]
        this.errorMessages.province = ''
        this.userDataObject.cityAndProvince = val
        this.errorMessages.cityAndProvince = ''
      } else {
        this.userDataObject[key] = val
        this.errorMessages[key] = ''
      }
    },
    async postalCodeCheck(code) {
      this.zipData = [];
      const { success, data } = await this.postalCodeVerify(code);
      if (success) {
        if (data.cities) {
          this.zipData = [];
          this.zipData = [...data.cities];
        }
        if (data.not_found) {
          this.$flash({
            message: data.not_found,
            color: 'error',
            type: 'error'
          })
        }
      }
    },
    postalCodeRule() {
      let result = true;
      const string = this.userDataObject.zip_code;
      if (string.length > 5 || string.length < 5) {
        result = this.$t('login.postalCodeError');
      }
      return result;
    }
  }
}
</script>

<style>
/* unvisited link */
a:link {
  color: #009699;
}

/* visited link */
a:visited {
  color: #007073;
} 
</style>
