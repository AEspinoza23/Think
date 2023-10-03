<template>
  <v-card color="card">
    <v-card-title>{{ offer.title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <span>
            Déjanos tu preferencia de contacto y un consultor de Piensa te gestionará la
            contratación en los términos que nos indiques.
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <span class="app-body-medium-bold">Horario de contacto preferido</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-radio-group
            v-model="hireObject.contact_schedule"
            mandatory
            class="py-0"
            @input="removeActive"
          >
            <app-radio :value="1" label="Mañana" />
            <app-radio :value="2" label="Tarde" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <span class="app-body-medium-bold">Datos de Contacto</span>
        </v-col>
        <v-col cols="auto">
           <div v-ripple @click="form = !form">
              <v-icon v-ripple size="small" color="primary">{{ $icons.edit }}</v-icon>
            </div>
        </v-col>
      </v-row>
      <v-row v-if="!form">
        <v-col class="py-0">
          <span>{{ $auth.$state.user.email }} </span>
        </v-col>
      </v-row>
      <v-row v-if="!form">
        <v-col v-if="$auth.$state.user.phone_code && $auth.$state.user.phone_number" class="py-0">
          <span> 
            {{ $auth.$state.user.phone_code }} {{ $auth.$state.user.phone_number }} 
          </span>
        </v-col>
        <v-col v-else class="py-0">
          <span class="red--text"> 
            Inserta teléfono para continuar
          </span>
        </v-col>
      </v-row>
      <v-row v-else class="my-0">
        <v-col class="pb-0" cols="auto">
          <app-select
            v-model="phone_data.phone_code"
            :error-messages="errorMessages.phone_code"
            :items="countriesCodes"
            :rules="[rules.required]"
            item-text="name_es"
            item-value="dial_code"
            no-computed
            label="Prefijo País"
            small
          >
          </app-select>
        </v-col>
        <v-col class="pb-0 pl-0">
          <app-text-field
            v-model="phone_data.phone_number"
            :error-messages="errorMessages.phone_number"
            :disabled="!phone_data.phone_code"
            :rules="[rules.required, validateNumber]"
            label="Teléfono"
            number
            :prefix="phone_data.phone_code"
          />
        </v-col>
      </v-row>
      <v-row v-if="!form" justify="center">
        <v-col cols="auto">
          <app-btn 
            :loading="loading" 
            class="button-primary" 
            press-enter
            :disabled="disableBtn"
            @click="hireOffer"
          >
            Enviar
          </app-btn>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="auto">
          <app-btn
            :loading="loading"
            class="button-primary"
            press-enter
            @click="savePhone"
          >
            Guardar
          </app-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isPossiblePhoneNumber } from 'libphonenumber-js'
import CountriesCodes from '~/constants/countries-code'
import Form from '~/mixins/form'

export default {
  name: 'OffersHire',
  mixins: [Form],
  layout: 'app',
  data() {
    return {
      hireObject: {
        contact_schedule: 1
      },
      loading: false,
      form: false,
      phone_data: {
        phone_code: null,
        phone_number: null
      },
      errorMessages: []
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue',
      offer: 'offers/offer'
    }),
    disableBtn() {
      if (this.$auth.$state.user.phone_code && this.$auth.$state.user.phone_number) {
        return false;
      } else {
        return true;
      }
    },
    havePhone() {
      return this.$auth.$state.user.phone_number;
    },
    phoneLabel() {
      return this.$auth.$state.user.phone_number? 'Teléfono' : 'Sin teléfono registrado' ;
    },
    countriesCodes() {
      return CountriesCodes
    },
    validateNumber() {
      if (this.phone_data.phone_number && this.phone_data.phone_code) {
        const phoneNumber = isPossiblePhoneNumber(
          this.phone_data.phone_code + this.phone_data.phone_number,
          this.findCountryPhone(this.phone_data.phone_code)?.code
        )
        return (
          phoneNumber ||
          `El número de teléfono no pertenece a ${this.findCountryPhone(this.phone_data.phone_code)?.name_es}`
        )
      }
      return true
    }
  },
  mounted() {
    this.phone_data = {
      phone_code: this.$auth.$state.user.phone_code,
      phone_number: this.$auth.$state.user.phone_number
    }
    this.edit(this.$auth.$state.user.id, 'client')
    this.edit(this.offer.id, 'offer')
    this.edit(1, 'request_status')
    this.edit(this.$auth.$state.user.email, 'email')
    this.edit(this.$auth.$state.user.phone_number, 'phone_number')
    this.edit(this.$auth.$state.user.phone_code, 'phone_code')
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    const menu = !this.$auth.loggedIn
    this.$headerConfig({
      isTitle: true,
      title: 'Contratación',
      isBack: true,
      isMenu: menu
    }, true)
  },

  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      updateProfile: 'profile/update',
      hireOfferAction: 'offers/hireOffer'
    }),
    edit(val, key) {
      this.hireObject[key] = val
    },
    findCountryPhone(code) {
      return CountriesCodes.find((item) => {
        return item.dial_code === code
      })
    },
    async savePhone() {
      this.loading = true
      const { success, data } = await this.updateProfile(this.phone_data)
      if (success) {
        await this.$auth.setUser(data)
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
        this.edit(this.$auth.$state.user.phone_number, 'phone_number')
        this.edit(this.$auth.$state.user.phone_code, 'phone_code')
        this.form = false
      } else {
        const showErrorAsMessage = false;
        this.handleErrorResponse(data, showErrorAsMessage)
      }
      this.loading = false
    },
    async hireOffer() {
      this.loading = true;
      const { success, data } = await this.hireOfferAction(this.hireObject)
      if (success) {
        this.$flash({
          message: this.$t('offers.hireSuccess'),
          color: 'success'
        })
        this.loading = false;
        await this.$router.push(this.localePath('/offers'))
      } else if (!success) {
        try {
          let message = ''
          if (data?.phone_number) {
            message = data.phone_number[0];
          } else if (data.phone_code ) {
            message = data.phone_code[0];
          } else if (data.offer_request ) {
            message = data.offer_request[0];
          } else if (data.details) {
            message = data.details;
          }
          this.$flash({
            message,
            color: 'error'
          })
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    removeActive() {
      document.activeElement.blur();
    }
  }
}
</script>

<style scoped></style>
