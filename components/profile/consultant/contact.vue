<template>
  <v-card 
    :width="$vuetify.breakpoint.width" 
    class="pa-4 shades-small-card rounded-lg backColor"
  >
    <v-row>
      <v-col class="app-heading-1-bold pl-5">
        Contacta con tu consultor
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid">
      <v-row justify="center">
        <v-col cols="12" lg="4" md="6" class="px-5">
          <app-select
            no-translate
            :items="items"
            :label="'Asunto'"
            :placeholder="'Elige una opción'"
            :rules="[rules.required]"
            @input="edit($event, 'subject')"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="4" md="6" class="px-5">
          <app-textarea
            no-translate
            :label="'Tu Mensaje*'"
            :rules="[rules.required]"
            :placeholder="'Tu mensaje aqui'"
            @input="edit($event, 'message')"
          />
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <v-col cols="auto">
          <span>¿Necesitas adjuntar algún documento?</span>
        </v-col>
      </v-row> -->
      <!-- <v-row justify="center">
        <v-col cols="11">
          <div class="uploadarea"  @click="openFileInput">
            <input
              id="file-input"
              accept="
                application/msword,
                application/vnd.ms-excel,
                application/vnd.ms-powerpoint,
                text/plain,
                application/pdf,
                image/*,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                application/vnd.openxmlformats-officedocument.presentationml.slideshow
              "
              max="1"
              name="name"
              style="display: none"
              type="file"
              @input="onInput"
            />
            <v-icon class="icon--xl">
              {{ $iconsSvg.upload }}
            </v-icon>
          </div>
        </v-col>
      </v-row> -->
      <v-row justify="center">
        <v-col cols="auto">
          <app-btn
            size="medium"
            :loading="loading" 
            class="button-primary" 
            press-enter
            @click="sendContactForm"
          >
            Enviar
          </app-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'Selects',
  mixins: [Form],
  data() {
    return {
      items: [
        { text: 'Incidencia', value: 'Incidencia' },
        { text: 'Ayuda', value: 'Ayuda' },
        { text: 'Sugerencia', value: 'Sugerencia' },
        { text: 'Otro', value: 'Otro' },
      ],
      loading: false,
      document: undefined,
      uploadedFiles: [],
      contactObject: {
        is_consultant_email: true
      },
      valid: true
    }
  },
  computed: {
    userFirstName() {
      return this.$auth.$state.user.first_name || ''
    },
    userLastName() {
      return `${this.$auth.$state.user?.middle_name} ${this.$auth.$state.user?.last_name}` || ''
    }
  },
  mounted() {
    this.edit(this.userFirstName, 'name')
    this.edit(this.userLastName, 'last_name')
  },
  methods: {
    ...mapActions({
      sendContactFormAction: 'profile/sendContactForm'
    }),
    openFileInput() {
      document.getElementById('file-input').click()
    },
    onInput(e) {
      if (this.uploadedFiles.length > 0) {
        this.uploadedFiles = []
      }
      for (let index = 0; index < e.target.files.length; index++) {
        this.uploadedFiles.push(e.target.files[index])
      }
      if (this.uploadedFiles) {
        this.reader(this.uploadedFiles[0])
      }
    },
    async reader(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const fileSize = this.uploadedFiles[0].size
      if (fileSize >= 10485760) {
        this.$flash({
          message: 'El documento es demasiado grande, tiene que ser menor de 10Mg',
          color: 'error'
        })
      } else {
        this.document = await new Promise((resolve) => {
          return (reader.onload = (e) => {
            return resolve(e.target.result)
          })
        })
      }
    },
    edit(val, key) {
      this.contactObject[key] = val
    },
    async sendContactForm() {
      this.loading = true;
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
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.uploadarea {
  border: 1px dashed #c4c4c4;
  height: 67px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>