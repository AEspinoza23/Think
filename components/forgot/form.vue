<template>
  <v-form ref="form" v-model="form" class="pa-5" lazy-validation>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.logoInicioLight" :style="imgStyle" class="mt-11" min-width="470">
        </v-img>
      </v-col>
    </v-row>
    <v-row align="center" class="mt-10" justify="center">
      <v-col :style="boxStyle" class="mt-10">
        <v-row align="center" class="white--text" justify="center">
          <v-col>
            <span class="app-display-1-bold"> {{ $t('login.recover') }}, </span>
          </v-col>
        </v-row>
        <v-row align="center" class="white--text" justify="center">
          <v-col>
            <span class="app-body-large text-justify">
              {{ $t('login.recoverOne') }}
              {{ $t('login.recoverTwo') }}
              {{ $t('login.recoverThree') }}
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="recoverForm boxBackground pa-5" cols="10">
            <app-password
              :label-style="'black--text'"
              is-register
              @input="edit($event.val, `new_${$event.key}`)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="end" class="my-10" justify="center">
      <v-col class="d-flex justify-center">
        <app-btn
          :loading="loading"
          size="medium"
          press-enter
          @click="changePassword"
        >
          {{ $t('login.change') }}
        </app-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'ForgotForm',
  mixins: [Form],
  layout: 'login',
  props: {
    queryData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    formData: {},
    errorMessages: {},
    form: true,
    loading: false
  }),
  computed: {
    imgStyle() {
      return { left: '200px', top: '50px' }
    },
    boxStyle() {
      return { top: '25%' }
    },
    computedColor() {
      if (this.$vuetify.theme.dark) {
        return { background: 'rgba(7, 7, 7, 0.2)' }
      } else {
        return { background: 'rgba(255, 255, 255, 0.2)' }
      }
    }
  },
  methods: {
    ...mapActions({
      resetConfirm: 'authentication/resetConfirm'
    }),
    async changePassword() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.formData.token = this.queryData?.password_token
        this.formData.uid = this.queryData?.password_uuid
        const { success, data } = await this.resetConfirm(this.formData)
        if (success) {
          this.$flash({
            message: this.$t('login.successful'),
            color: 'success',
            type: 'success'
          })
          await this.$router.push(this.localePath('login'))
        } else {
          this.handleErrorResponse({ register: data })
          this.errorMessages = data
        }
        this.loading = false
      }
    },
    edit(val, key) {
      this.formData[key] = val
      this.errorMessages[key] = ''
    }
  }
}
</script>
