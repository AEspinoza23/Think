<template>
  <v-row class="my-0" no-gutters>
    <v-col>
      <app-password-field
        v-if="changePassword"
        v-model="actualPassword"
        :error-messages="errorMessages.old_password"
        :label="`${$t('login.actualPassword')}*`"
        :label-style="labelStyle"
        :recover="recover"
        :rules="[rules.required]"
        @changeRecover="$emit('changeRecover')"
        @input="checkPassword"
      />
      <app-password-field
        v-model="password1"
        class="my-2"
        :error-messages="errorMessages"
        :label="changePassword ? 'Nueva contraseña*' : `${$t('login.password')}*`"
        :label-style="labelStyle"
        :recover="recover"
        :rules="[rules.required]"
        @changeRecover="$emit('changeRecover')"
        @input="checkPassword"
      />
      <app-password-field
        v-if="isRegister"
        v-model="password2"
        :disabled="!password1"
        :error-messages="errorMessages"
        :label="changePassword ? 'Repita nueva contraseña*' : `${$t('login.repeat')}*`"
        :label-style="labelStyle"
        :rules="[rules.required, rules.password, validatePassword]"
        @input="checkPassword"
      />
      <div v-if="password1 && isRegister">
        <v-row>
          <v-col class="pb-0">
            <span class="app-body-medium white--text">
              {{ $t('login.yourPasswordIs') }} {{ passwordStrengthText }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <v-progress-linear v-model="passwordStrengthValue" :color="strengthPasswordColor" />
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { passwordStrength } from 'check-password-strength'
import Form from '~/mixins/form'

export default {
  name: 'Password',
  mixins: [Form],
  props: {
    errorMessages: { type: [String, Array], default: () => [] },
    isRegister: { type: Boolean, default: false },
    labelStyle: {
      type: String,
      default: ''
    },
    value: { type: String, default: '' },
    recover: { type: Boolean, default: false },
    changePassword: { type: Boolean, default: false },
    deletePass: { type: Boolean, default: false }
  },
  data: () => ({
    actualPassword: null,
    password1: null,
    password2: null,
    passwordStrengthValue: 0,
    passwordStrengthText: ''
  }),
  computed: {
    validatePassword() {
      return this.password1 === this.password2 || this.$t('validation.passwordNotMatch')
    },
    strengthPasswordColor() {
      switch (this.passwordStrengthValue) {
        case 25:
          return 'red'
        case 50:
          return 'yellow'
        case 75:
          return 'orange'
        case 100:
          return 'green'
        default:
          return 'grey'
      }
    }
  },
  watch: {
    value(val) {
      this.password1 = val
    },
    deletePass() {
      this.password1 = null;
      this.password2 = null;
    }
  },
  methods: {
    checkPassword() {
      this.passwordStrengthText = passwordStrength(this.password1).value
      switch (this.passwordStrengthText) {
        case 'Too weak':
          this.passwordStrengthText = this.$t('login.tooWeak')
          this.passwordStrengthValue = 25
          break
        case 'Weak':
          this.passwordStrengthText = this.$t('login.weak')
          this.passwordStrengthValue = 50
          break
        case 'Medium':
          this.passwordStrengthText = this.$t('login.medium')
          this.passwordStrengthValue = 75
          break
        case 'Strong':
          this.passwordStrengthText = this.$t('login.strong')
          this.passwordStrengthValue = 100
          break
        default:
          this.passwordStrengthValue = 0
      }
      if (this.validatePassword) {
        if (this.changePassword) {
          this.$emit('input', { val: this.actualPassword, key: 'old_password' })
          this.$emit('input', { val: this.password1, key: 'new_password1' })
          this.$emit('input', { val: this.password2, key: 'new_password2' })
        } else {
          this.$emit('input', { val: this.password1, key: 'password1' })
          this.$emit('input', { val: this.password2, key: 'password2' })
        }
      }
    }
  }
}
</script>

<style scoped></style>
