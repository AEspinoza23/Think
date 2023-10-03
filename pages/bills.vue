<template>
  <div class="fadeIn">
    <v-form ref="formDoc" v-model="validDoc">
      <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
        <v-card-text class="px-6 title--text">
          <v-row no-gutters>
            <v-col cols="auto" class="app-body-exlarge-bold">
              <span>¡Sube tu factura ya!</span>
            </v-col>
          </v-row>
          <v-row v-if="!isOffer" no-gutters class="my-3">
            <v-col cols="auto">
              <span class="app-body-medium">
                Sube tu factura haciéndole una foto o seleccionándola desde tu carpeta de archivos.
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-3" justify="center">
            <v-col v-if="!document" cols="12">
              <div class="uploadarea"  @click="openImageInput">
                <input
                  id="image-input"
                  ref="file"
                  accept="image/*"
                  capture="camera"
                  max="1"
                  style="display: none"
                  type="file"
                  @input="onInput"
                />
                <v-icon class="icon--xl">
                  {{ $iconsSvg.camara }}
                </v-icon>
              </div>
            </v-col>
            <v-col v-if="!document" cols="12" class="mt-2">
              <div class="uploadarea"  @click="openFileInput">
                <input
                  id="file-input"
                  ref="file"
                  accept="
                    application/pdf
                  "
                  max="1"
                  style="display: none"
                  type="file"
                  @input="onInput"
                />
                <v-icon class="icon--xl">
                  {{ $iconsSvg.upload }}
                </v-icon>
              </div>
            </v-col>
            <v-col v-if="!document" cols="auto" class="d-flex mt-3">
              <span class="app-body-medium ">
                Adjunta un archivo PNG, JPG o PDF (máximo 5MB)
              </span>
            </v-col>
            <v-col v-if="document" cols="3" class="d-flex">
              <v-badge
                bordered
                color="error"
                icon="mdi-close"
                overlaps
                @click="deleteDoc()"
              >
                <div class="uploadedImage" @click="deleteDoc()">
                  <v-img width="60px" height="76.6px" :src="document" />
                </div>
              </v-badge>
            </v-col>
            <v-col v-if="document" class="d-flex justify-center mt-5 text-truncate">
              {{ documentName }}
            </v-col>
            <v-col v-if="document" cols="12" class="my-4">
              <span class="app-body-medium">
                Por favor, elige la categoría a la que pertenece esta factura
              </span>
            </v-col>
            <v-col v-if="document" cols="12">
              <app-select
                :items="services"
                :rules="[rules.required]"
                item-text="name"
                item-value="id"
                no-computed
                placeholder="Selecciona la categoría"
                @input="edit($event, 'type')"
              />
            </v-col>
            <v-col v-if="$auth.loggedIn" cols="12" class="d-flex justify-center mt-5">
              <app-btn 
                color="primary"
                size="medium"
                :loading="loading"
                @click="processContactForm"
              >Enviar
              </app-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
    <v-form v-if="!document" ref="form" v-model="valid">
      <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
        <v-card-text class="px-6 title--text">
          <v-row no-gutters>
            <v-col cols="auto" class="app-body-exlarge-bold">
              <span>¿Prefieres enviarnos tu factura por Whatsapp?</span>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-3">
            <v-col cols="auto">
              <span class="app-body-medium mb-8">
                Si prefieres enviarnos tu factura por Whatsapp, primero selecciona 
                a qué sector pertenece la factura y luego presiona el botón 
                <span class="primaryThree--text">Enviar por Whatsapp</span>
              </span>
            </v-col>
            <v-col cols="auto">
              <span class="app-body-medium">
                Una vez allí, podrás añadir el archivo o abrir la cámara para sacar una foto pinchando 
                en el símbolo + (iOS) o en el clip (Android) en la parte inferior de la conversación de 
                Whatsapp.
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-3">
            <v-col cols="12">
              <app-select
                :items="services"
                :rules="[rules.required]"
                item-text="name"
                item-value="name"
                label="Sector"
                no-computed
                placeholder="Selecciona la categoría"
                @input="edit($event, 'service')"
              />
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" class="my-3">
            <app-btn class="button-primary white--text" @click="openLink">
              Enviar por Whatsapp
              <v-icon class="icon--xs ma-0 pa-0">
                {{ $iconsSvg.whatsapp }}
              </v-icon>
            </app-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'Offers',
  mixins: [Form],
  layout: 'app',
  data:() => ({
    valid: true,
    validDoc: true,
    loading: false,
    formData: null,
    data: {},
    uploadedFiles: [],
    errorMessages: {},
    documentName: '',
    documentType: '',
    document: null
  }),
  computed: {
    ...mapGetters({
      offer: 'offers/offer',
      servicesList: 'services/servicesList',
    }),
    isOffer() {
      return this.$route.query.offer;
    },
    services() {
      return this.servicesList.results
    }
  },
  mounted() {
    this.formData = new FormData();
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Sube tu factura',
      isNotification: this.$auth.loggedIn,
      isMenu: !this.$auth.loggedIn,
      isBack: true
    })
  },
  methods: {
    ...mapActions({
      freeStudyApply: 'offers/freeStudyApply'
    }),
    async sendContactForm(info) {
      this.loading = true;
      const { success, data } = await this.freeStudyApply(info)
      if (success) {
        this.$flash({
          message: data.details,
          color: 'success'
        })
        this.loading = false;
        await this.$router.push(this.localePath('/dashboard'))
      } else if (!success) {
        try {
          let message = ''
          if (data?.phone_number) {
            message = data.phone_number[0];
          } else if (data.phone_code ) {
            message = data.phone_code[0];
          } else if (data.offer_request ) {
            message = data.offer_request[0];
          } else if (data.detail) {
            message = data.detail;
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
    processContactForm() {
      this.loading = true;
      if (this.document && this.$refs.formDoc.validate()) {
        if (this.$auth.loggedIn) {
          const fullname = `${this.$auth.$state.user?.first_name} ${this.$auth.$state.user?.middle_name}`
          const phoneNumber = this.$auth.$state.user.phone_number
          const phoneCode = this.$auth.$state.user.phone_code
          const email = this.$auth.$state.user.email

          phoneNumber ? this.formData.set('phone_number', phoneNumber) : this.formData.delete('phone_number');
          phoneCode ? this.formData.set('phone_code', phoneCode) : this.formData.delete('phone_code');
          this.formData.set('name', fullname);
          this.formData.set('email', email);
        }
        if (this.isOffer) {
          this.formData.set('service_id', this.offer.service.id);
          this.formData.set('description', this.offer.title );
        }
        const info = {
          data: this.formData,
          id: this.offer.id
        }
        this.sendContactForm(info);
      } else {
        if (!this.document) {
          this.$flash({
            message: this.$auth.loggedIn 
            ? 'Suba un documento para continuar' 
            : 'Suba un documento e Introduzca un Mail para continuar',
            color: 'error'
          })
        } else {
          this.$flash({
            message: 'Complete los campos requeridos',
            color: 'error'
          })
        }
        this.loading = false;
      }
    },
    openFileInput() {
      document.getElementById('file-input').click()
    },
    openImageInput() {
      document.getElementById('image-input').click()
    },
    onInput(e) {
      const example = this.$refs.file.files[0];
      console.log(this.$refs.file.files);
      console.log(this.$refs.file.files.filelist);
      if (example) {
        this.documentName = example.name;
        this.documentType = example.type;
      } else {
        this.documentName = 'image.jpeg';
        this.documentType = 'image/png';
      }
      this.document = null;
      
      if (this.uploadedFiles.length > 0) {
        this.uploadedFiles = []
      }
      for (let index = 0; index < e.target.files.length; index++) {
        this.uploadedFiles.push(e.target.files[index])
      }
      if (this.uploadedFiles) {
        this.reader(this.uploadedFiles[0])
      }
      this.$refs.file.files = null;
    },
    dataURLtoFile(dataUrl) {
      const arr = dataUrl.split(',')
      const blob = atob(arr[1])
      let n = blob.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = blob.charCodeAt(n)
      }
      return new File([u8arr], this.documentName, { type: this.documentType })
    },
    async reader(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      const fileSize = this.uploadedFiles[0].size
      console.log(fileSize);
      if (fileSize > 5245329) {
        this.$flash({
          message: 'El documento es demasiado grande, tiene que ser menor de 5Mb',
          color: 'error'
        })
      } else {
        const document = await new Promise((resolve) => {
          return (reader.onload = (e) => {
            return resolve(e.target.result)
          })
        })
        this.document = document;
        const file = this.dataURLtoFile(document);
        this.formData.set('invoice', file);
      }
    },
    edit(val, key) {
      if (key === "type") {
        const index = this.services.findIndex(({ id }) => id === val);
        this.formData.set('service_id', this.services[index].id);
        this.formData.set('description', this.services[index].name);
      } else {
        this.data[key] = val;
      }
    },
    openLink() {
      if (this.$refs.form.validate()) {
        let link;
        if (this.$auth.$state.user.consultant?.contact_link) {
          const whatsapp = this.$auth.$state.user.consultant.contact_link
          if (whatsapp.includes('https')) {
            link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
          } else {
            link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20un%20estudio%20en%20${this.data.type}%20del%20siguiente%20documento:`
          }
          window.open(link, '_blank')
        } else if (
          this.$auth.$state.user.consultant?.phone_code &&
          this.$auth.$state.user.consultant?.phone_number
        ) {
          const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
          link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20un%20estudio%20en%20${this.data.type}%20del%20siguiente%20documento:`
          window.open(link, '_blank')
        } else {
          this.$flash({
            message:
              'Tú consultor no tiene número de whatsapp asociado para contacto',
            color: 'warning',
            type: 'warning'
          })
        }
      } else {
        this.$flash({
          message: 'Complete los campos requeridos',
          color: 'error'
        })
      }
    },
    deleteDoc() {
      this.document = null;
      this.uploadedFiles = [];
      this.documentName = '';
    }
  }
}
</script>

<style scoped>
.uploadarea {
  border: 1px dashed #c4c4c4;
  height: 127px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.uploadedImage {
  width: 80px;
  height: 80px;
  padding-left: 9px;
  justify-content: center;
  border-radius: 10px;
  border: 1px dashed var(--common-colors-piensa-colors-variant-1, #33C9CC);
  backdrop-filter: blur(12px);
}
</style>
