<template>
  <div class="py-2 backColor rounded-lg" style="height: 100%">
    <v-card :width="$vuetify.breakpoint.width" elevation="0" class="rounded-lg backColor">
      <v-card-text class="px-6">
        <v-form ref="form" v-model="valid">
          <app-select
            :items="items"
            :label="'Asunto'"
            :placeholder="'Elige una opción'"
            :rules="[rules.required]"
            item-text="text"
            item-value="value"
            @input="edit($event, 'subject')"
          />
          <app-text-field
            :label="`${$t('login.name')}*`"
            :rules="[rules.required]"
            :value="userFirstName"
            @input="edit($event, 'first_name')"
          />
          <app-text-field
            :rules="[rules.required]"
            :value="userLastName"
            label="Apellidos*"
            @input="edit($event, 'last_name')"
          />
          <app-textarea
            :label="'Mensaje*'"
            :placeholder="'Tu mensaje aqui'"
            :rules="[rules.required]"
            @input="edit($event, 'message')"
          />
        </v-form>
        <!--        <span>¿Necesitas adjuntar algún documento?</span>-->

        <!--        <div class="uploadArea">-->
        <!--          <input-->
        <!--            id="file-input"-->
        <!--            accept="image/png, image/gif, image/jpeg"-->
        <!--            max="1"-->
        <!--            name="name"-->
        <!--            style="display: none"-->
        <!--            type="file"-->
        <!--          />-->
        <!--          <v-icon class="iconxl">-->
        <!--            {{ $iconsSvg.upload }}-->
        <!--          </v-icon>-->
        <!--        </div>-->

        <v-col class="d-flex justify-center">
          <app-btn color="primary" size="medium" @click="sendContactForm"> Enviar</app-btn>
        </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'MenuContact',
  mixins: [Form],
  layout: 'app',
  auth: true,
  data() {
    return {
      items: [
        { value: 'Hablar con Experto', text: 'Hablar con Experto' },
        { value: 'Incidencia', text: 'Incidencia' },
        { value: 'Sugerencia', text: 'Sugerencia' },
        { value: 'Otros', text: 'Otros' }
      ],
      contactObject: {
        is_consultant_email: false
      },
      valid: false
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    }),
    userFirstName() {
      return this.$auth.$state.user.first_name || ''
    },
    userLastName() {
      return `${this.$auth.$state.user?.middle_name} ${this.$auth.$state.user?.last_name}` || ''
    }
  },

  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.setHeaderConfig({
      isTitle: true,
      title: 'Contacto',
      isNotification: true,
      isBack: true
    })

    this.edit(this.userFirstName, 'name')
    this.edit(this.userLastName, 'last_name')
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      sendContactFormAction: 'profile/sendContactForm'
    }),
    ...mapMutations({
      setHeaderConfig: 'app/SET_HEADER_CONFIG'
    }),
    edit(val, key) {
      this.contactObject[key] = val
    },
    async sendContactForm() {
      if (this.$refs.form.validate()) {
        const { success } = await this.sendContactFormAction(this.contactObject)
        if (success) {
          this.$flash({
            message: this.$t('appMessages.messageSend'),
            color: 'success'
          })
        } else {
          this.$flash({
            message: this.$t('appMessages.messageError'),
            color: 'error'
          })
        }
      }
    }
  }
}
</script>

<!--<style scoped>-->
<!--/*.uploadArea {*/-->
<!--/*  border: 1px dashed #c4c4c4;*/-->
<!--/*  height: 67px;*/-->
<!--/*  border-radius: 10px;*/-->
<!--/*  display: flex;*/-->
<!--/*  align-content: center;*/-->
<!--/*  justify-content: center;*/-->
<!--/*}*/-->
<!--</style>-->
