<template>
  <v-form
    ref="form"
    v-model="form"
    lazy-validation
  >
    <v-row align="start" class="position" justify="start">
      <v-col cols="auto">
        <v-img :src="$assets.logoInicioLight" :style="imgStyle" min-width="470"></v-img>
      </v-col>
    </v-row>
    <v-row  align="end" class="mt-16" justify="center">
      <v-sheet light color="transparent">
        <div :style="boxStyle" class="mt-10">
          <div class="white--text pa-3">
            <span class="app-display-1-bold"> {{ $t('login.forgot') }}, </span>
            <br />
            <span class="app-body-large">
              {{ $t('login.introduceEmail') }}
            </span>
          </div>
          <div class="recoverEmail boxBackground pa-7">
            <app-text-field 
              v-model="email"
              type="email"
              :label-style="'black--text'"
              :error-messages="errorMessages.email"
              :label="$t('login.email')"
              :rules="[rules.required, rules.email]"
            />
          </div>
        </div>
      </v-sheet>
    </v-row>
    <v-row :style="{ 'margin-top': '70%' }" align="end" justify="center">
      <app-btn size="medium" press-enter @click="recover">
        {{ $t('login.send') }}
      </app-btn>
    </v-row>
    <v-row align="center" class="mb-2 mt-6" justify="center">
      <span class="white--text">
        {{ $t('login.backTo') }}
      </span>
      <v-btn
        class="white--text pa-0 text-decoration-underline"
        text
        :loading="loading"
        @click="$emit('changeRecover')"
      >
        Login
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'EmailForm',
  mixins: [Form],
  layout: 'login',
  data: () => ({
    email: '',
    form: null,
    errorMessages: {},
    loading: false
  }),
  computed: {
    imgStyle() {
      return { left: '245px', top: '-1px' }
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
      reset: 'authentication/reset'
    }),
    async recover() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const { success, data } = await this.reset({email: this.email})
        if (success) {
          this.$emit('changeSuccess', this.email);
        } else {
          this.handleErrorResponse({ register: data })
          this.errorMessages = data
        }
        this.loading = false
      }
    }
  }
}
</script>
