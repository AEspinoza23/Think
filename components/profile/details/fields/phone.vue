<template>
  <v-row class="my-0">
    <v-col class="pb-0" cols="auto">
      <app-select
        v-model="phone_code"
        :error-messages="errorMessages.phone_code"
        :items="countriesCodes"
        :rules="[rules.required]"
        item-text="name_es"
        item-value="dial_code"
        no-computed
        label="Prefijo País"
        small
        @input="$emit('edit', { val: $event, key: 'phone_code' })"
      >
      </app-select>
    </v-col>
    <v-col class="pb-0 pl-0">
      <app-text-field
        v-model="phone_number"
        :error-messages="errorMessages.phone_number"
        :disabled="!phone_code"
        :rules="[rules.required, validateNumber]"
        label="Teléfono"
        :type="'number'"
        :prefix="phone_code"
        @input="$emit('edit', { val: $event, key: 'phone_number' })"
      />
    </v-col>
  </v-row>
</template>

<script>
import { isPossiblePhoneNumber } from 'libphonenumber-js'
import CountriesCodes from '~/constants/countries-code'
import Form from '~/mixins/form'

export default {
  name: 'Phone',
  mixins: [Form],
  props: {
    errorMessages: { type: Array, default: () => [] },
    value: {
      type: Object,
      default: () => {
        return {
          phone_code: null,
          phone_number: null
        }
      }
    }
  },
  data() {
    return {
      phone_number: null,
      phone_code: null
    }
  },
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
    }
  },
  mounted() {
    if (this.value.phone_code) {
      this.phone_code = this.findCountryPhone(this.value.phone_code)?.dial_code
    } else {
      this.phone_code = null
    }
    this.phone_number = this.value.phone_number
  },
  methods: {
    findCountryPhone(code) {
      return CountriesCodes.find((item) => {
        return item.dial_code === code
      })
    }
  }
}
</script>

<style scoped></style>
