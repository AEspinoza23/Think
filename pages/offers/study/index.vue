<template>
  <div class="fadeIn">
    <v-form ref="form" v-model="valid">
      <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
        <v-card-text class="px-6 title--text">
          <v-row no-gutters>
            <v-col cols="auto" class="app-body-exlarge-bold">
              <span>Solicita un estudio gratis ahora</span>
            </v-col>
          </v-row>
          <v-row v-if="!isOffer" no-gutters class="my-3">
            <v-col cols="auto">
              <span class="app-body-medium">
                Te realizamos un estudio de ahorro gratuito de tus servicios cotidianos 
                (luz, telefonía, seguros, etc) para ofrecerte la mejor opción y oportunidad de ahorro. 
              </span>
            </v-col>
          </v-row>
          <v-row v-if="!isOffer" no-gutters class="my-3">
            <v-col cols="12">
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
          </v-row>
          <v-row no-gutters class="my-3">
            <v-col cols="auto">
              <span class="app-body-large">
                Sube tu última factura/póliza o documento de tu proveedor actual 
                y te hacemos un estudio de ahorro GRATIS
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-3" justify="center">
            <v-col cols="11">
              <div class="uploadarea"  @click="openFileInput">
                <input
                  id="file-input"
                  ref="file"
                  accept="
                    application/pdf,
                    image/*,
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
            <v-col cols="auto" class="d-flex mt-3">
              <span class="app-body-medium ">
                Adjunta un archivo PNG, JPG o PDF (máximo 5MB)
              </span>
            </v-col>
            <v-col v-if="document" cols="12" class="d-flex justify-center mt-5">
              Documento adjuntado:{{ documentName }}
            </v-col>
            <v-col v-if="$auth.loggedIn" class="d-flex justify-center mt-5">
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
      <v-card v-if="!$auth.loggedIn" :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
        <v-card-text class="px-6 title--text">
          <v-row no-gutters class="mb-4">
            <v-col cols="auto" class="app-body-exlarge-bold title--text">
              <span>Datos de contacto</span>
            </v-col>
          </v-row>
          <app-text-field
            :label="`Nombre completo`"
            :error-messages="errorMessages.name"
            @input="edit($event, 'name')"
          />
          <app-text-field
            class="my-2"
            :rules="[rules.required]"
            :error-messages="errorMessages.email"
            label="Mail*"
            @input="edit($event, 'email')"
          />
          <v-row class="my-1" no-gutters>
            <v-col class="pb-0 pr-3" cols="auto">
              <app-select
                :error-messages="errorMessages.phone_code"
                :items="countriesCodes"
                item-text="name_es"
                item-value="dial_code"
                no-computed
                label="Prefijo País"
                small
                @input="edit($event, 'phone_code')"
              >
              </app-select>
            </v-col>
            <v-col class="pb-0 pl-0">
              <app-text-field
                :error-messages="errorMessages.phone_number"
                :disabled="!formData.phone_code"
                :rules="[validateNumber]"
                label="Teléfono"
                :type="'number'"
                :prefix="formData.phone_code"
                @input="edit($event, 'phone_number')"
              />
            </v-col>
          </v-row>
          <v-col class="d-flex justify-center">
            <app-btn 
              color="primary"
              size="medium"
              :loading="loading"
              @click="processContactForm"
            >Enviar
            </app-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-form>
    <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
      <v-card-text class="px-6 title--text">
        <v-row no-gutters class="mb-4">
          <v-col cols="auto" class="app-body-exlarge-bold title--text">
            <span>¿Tienes Dudas?</span>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="auto" class="app-body-exlarge-bold title--text">
            <app-btn
              class="mr-1 px-6"
              outlined
              @click="openLink"
            >
              Tengo dudas
            </app-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-form v-if="!document" ref="form_whatsapp" v-model="valid">
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
                placeholder="Selecciona la categoría"
                no-computed
                @input="edit($event, 'service')"
              />
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" class="my-3">
            <app-btn class="button-primary white--text" @click="documentWhatsapp">
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
import { isPossiblePhoneNumber } from 'libphonenumber-js'
import { mapActions, mapGetters } from 'vuex'
import Form from '~/mixins/form'
import CountriesCodes from '~/constants/countries-code'

export default {
  name: 'Offers',
  mixins: [Form],
  layout: 'app',
  data:() => ({
    valid: true,
    loading: false,
    formData: null,
    uploadedFiles: [],
    errorMessages: {},
    documentName: '',
    documentType: '',
    document: null,
    data: {},
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
    },
    countriesCodes() {
      return CountriesCodes
    },
    validateNumber() {
      if (this.formData.phone_number && this.formData.phone_code) {
        const phoneNumber = isPossiblePhoneNumber(
          this.formData.phone_code + this.formData.phone_number,
          this.findCountryPhone(this.formData.phone_code)?.code
        )
        return (
          phoneNumber ||
          `El número de teléfono no pertenece a 
          ${this.findCountryPhone(this.formData.phone_code)?.name_es}`
        )
      }
      return true
    }
  },
  mounted() {
    this.formData = new FormData();
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Solicitud estudio gratis',
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
    processContactForm() {
      this.loading = true;
      if (this.$refs.form.validate() && this.document) {
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
    edit(val, key) {
      if (key === 'service') {
        this.data[key] = val;
      } else if (key === "type") {
        const index = this.services.findIndex(({ id }) => id === val);
        this.formData.set('service_id', this.services[index].id);
        this.formData.set('description', this.services[index].name);
      } else {
        this.formData.set(key, val);
        this.errorMessages[key] = ''
      }
    },
    findCountryPhone(code) {
      return CountriesCodes.find((item) => {
        return item.dial_code === code
      })
    },
    openFileInput() {
      document.getElementById('file-input').click()
    },
    onInput(e) {
      const example = this.$refs.file.files[0]
      this.documentName = example.name;
      this.documentType = example.type;
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
    openLink() {
      let link;
      if (this.$auth.$state.user?.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link;
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Tengo%20dudas%sobre%20estudio%20gratuito`;
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Tengo%20dudas%20sobre%20estudio%20gratuito`;
        }
        window.open(link, '_blank');
      } else if (this.$auth.$state.user?.consultant?.phone_code && this.$auth.$state.user?.consultant?.phone_number) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Tengo%20dudas%20sobre%20estudio%20gratuito` ; 
        window.open(link, '_blank');
      } else if (this.offer.contact_link) {
        const whatsapp = this.offer.contact_link;
        link = `${whatsapp}&text=Tengo%20dudas%20sobre%20estudio%20gratuito` ; 
        window.open(link, '_blank');
      } else {
        this.$flash({
          message: 'El consultor y/o el experto del area no tienen link de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    },
    documentWhatsapp() {
      if (this.$refs.form_whatsapp.validate()) {
        console.log('====================================');
        console.log(this.data);
        console.log('====================================');
        let link;
        if (this.$auth.$state.user.consultant?.contact_link) {
          const whatsapp = this.$auth.$state.user.consultant.contact_link
          if (whatsapp.includes('https')) {
            link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
          } else {
            link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20un%20estudio%20en%20${this.data.service}%20del%20siguiente%20documento:`
          }
          window.open(link, '_blank')
        } else if (
          this.$auth.$state.user.consultant?.phone_code &&
          this.$auth.$state.user.consultant?.phone_number
        ) {
          const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
          link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20un%20estudio%20en%20${this.data.service}%20del%20siguiente%20documento:`
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
</style>
