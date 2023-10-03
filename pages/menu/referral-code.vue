<template>
  <v-row no-gutters class="background fadeIn">
    <v-card 
      :width="$vuetify.breakpoint.width" 
      class="rounded-lg backColor shades-general mt-4 mx-5 py-4"
    >
      <v-row no-gutters class="mt-0">
        <v-col class="d-flex justify-center">
          <div style="height: 165px; width: 182px">
            <v-img :src="$assets.link" height="auto" width="auto" />
          </div>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row no-gutters class="title--text app-body-large mb-1">
          <v-col cols="auto">
            {{ $t('affiliates.refer') }}
          </v-col>
        </v-row>
        <v-row no-gutters class="whiteblue title--text pa-2" justify="center">
          <span class="black--text"> {{ $auth.$state.user.referral_code }}</span>
        </v-row>
        <v-row no-gutters justify="center" class="my-4">
          <v-col cols="auto" class="d-flex justify-center">
            <profile-affiliates-share-dialog />
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <v-col cols="12" class="app-body-medium title--text">
            <div>
              <span class="font-weight-bold">Comparte tu enlace 🔗 de referido</span>
              con todos tus amigos y familiares.
            </div>
          </v-col>
          <v-col cols="12" class="app-body-medium title--text my-2">
            <div>
              Tú les
              <span class="font-weight-bold">ayudas a ahorrar 💰</span>
              en todos sus servicios y ellos
              <span class="font-weight-bold">te ayudan a ganar dinero 💸.</span>
              Por cada persona que se registre en PIENSA con tu código de referido,
              <span class="font-weight-bold">recibirás dinero</span>
              cada vez que contrate un servicio. 
            </div>
          </v-col>
          <v-col cols="12" class="app-body-medium title--text my-2">
            <div>
              Podrás visualizar tus referidos desde la sección 
              <span 
                class="primary--text text-decoration-underline click"
                @click="goTo"
              >
                Tus afiliados
              </span> 
              en tu Perfil.
              <span class="font-weight-bold">Recibirás una notificación 🔔</span> 
              cada vez que alguno de tus referidos contraten un servicio, indicando el servicio contratado 
              y la cantidad de dinero recibida en cada caso, que se añadirá automáticamente a
              <span class="font-weight-bold">tu Saldo Virtual 👛.</span>
            </div>
          </v-col>
          <v-col cols="12" class="app-body-medium title--text">
            <div>
              <span class="font-weight-bold">
                ¡Empieza ya a generar ingresos adicionales de forma sencilla y 
                sin apenas esfuerzo con PIENSA!
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      :width="$vuetify.breakpoint.width" 
      class="rounded-lg backColor mt-5 mx-5 shades-general"
    >
      <v-card-title class="app-body-large-bold">
        <v-row class="title--text" justify="center">
          <v-col cols="auto" class="text-center" :style="{'word-break': 'normal'}">
            Este es tu QR con tu link de referido
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row 
          no-gutters 
          justify="center" 
          class="py-3 mx-5"
          :style="{'background': '#FFF'}"
        >
          <v-col cols="auto">
            <qr-code :text="url"></qr-code>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="app-body-medium title--text" cols="auto">
            <div>
              Pide a tus amigos que
              <span class="font-weight-bold">escaneen este QR</span> o
              <span class="font-weight-bold">descárgalo</span>
              y ponlo en un lugar visible para que se registren en PIENSA con 
              <span class="font-weight-bold">
                tu código de referido y empieza a ganar dinero.
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-2" no-gutters>
          <v-col cols="auto">
            <app-btn dark :loading="loading" @click="downloadPDF">
              <v-icon class="icon--md">
                {{ $iconsSvg.download }}
              </v-icon>
              Descargar en PDF
            </app-btn>
          </v-col>
          <vue-html2pdf
            v-if="$auth.$state.user.profile === 6"
            ref="pdf"
            :show-layout="false"
            :enable-download="true"
            :preview-modal="false"
            :manual-pagination="true"
            :pdf-quality="2"
            :filename="'Piensa PDF'"
            @startPagination="loading = true"
            @hasDownloaded="hasDownloaded($event)"
          >
            <section slot="pdf-content">
              <section class="pdf-item promotionOne">
                <v-card
                  :style="{
                    left: '64.9%', 
                    top: '17.6%',
                    width: '220px',
                    height: '220px',
                  }"
                  color="transparent"
                ></v-card>
                <qr-code
                  class="qrCode"
                  :size="200"
                  :text="url"
                ></qr-code>
              </section>
            </section>
          </vue-html2pdf>
          <vue-html2pdf
            v-else
            ref="pdf"
            :show-layout="false"
            :enable-download="true"
            :preview-modal="false"
            :manual-pagination="true"
            :pdf-quality="2"
            pdf-format="a5"
            pdf-orientation="landscape"
            :filename="'Piensa PDF'"
            @startPagination="loading = true"
            @hasDownloaded="hasDownloaded($event)"
          >
            <section slot="pdf-content">
              <section class="pdf-item promotionTwo">
                <!-- <v-card
                  :style="{
                    left: '64.9%', 
                    top: '17.6%',
                    width: '220px',
                    height: '220px',
                  }"
                  color="transparent"
                ></v-card> -->
                <qr-code
                  class="qrCodeTwo"
                  :size="200"
                  :text="url"
                ></qr-code>
              </section>
            </section>
          </vue-html2pdf>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Affiliate List -->
    <app-loading v-if="loadingRef" class="pt-5" />
    <profile-affiliates-list v-else class="mt-3" :affiliates="affiliates" />
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MenuReferralCode',
  layout: 'app',
  auth: true,
  data: () => ({
    loading: false,
    loadingRef: false,
    formData: {
      commerce_pdf: null
    }
  }),
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    affiliates() {
      return this.user.referrals
    },
    referralCode() {
      if (this.$auth.$state.user.referral_code) {
        return this.$auth.$state.user.referral_code
      } 
      return '';
    },
    url() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/pre-register/?referral_code=${this.referralCode}`
      }
      return `https://app.piensanetwork.com/es/pre-register/?referral_code=${this.referralCode}`
    }
  },
  async mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    console.log(this.$auth.$state.user);
    const title = 'Qr y Referidos'
    this.$headerConfig({
      isTitle: true,
      title,
      isNotification: true,
      isBack: true
    }, true)
    this.loadingRef = true;
    const id = this.$auth.$state.user.id;
    await this.getUser(id)    
    this.loadingRef = false
  },
  methods: {
    ...mapActions({
      savePdf: 'user/savePdf',
      savePdfClient: 'user/savePdfClient',
      getUser: 'user/getUser'
    }),
    goTo() {
      this.$router.push(
        this.localePath({
          name: 'profile-affiliates'
        })
      );
    },
    downloadPDF() {
      this.$refs.pdf.generatePdf();
    },
    dataURLtoFile(dataUrl) {
      const arr = dataUrl.split(',')
      const blob = atob(arr[1])
      let n = blob.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = blob.charCodeAt(n)
      }
      return new File([u8arr], 'qr.pdf', { type: 'application/pdf' })
    },
    async hasDownloaded(val) {
      const reader = new FileReader();
      reader.readAsDataURL(val);
      const urlPdf = await new Promise((resolve) => {
        return (reader.onload = (e) => {
          return resolve(e.target.result)
        })
      })
      const file = this.dataURLtoFile(urlPdf);
      const fd = new FormData();
      fd.append('relation', this.$auth.$state.user.id)
      let response
      if(this.$auth.$state.user.profile === 6) {
        fd.append('commerce_pdf', file)
        response = await this.savePdf(fd);
      } else {
        fd.append('client_pdf', file)
        response = await this.savePdfClient(fd);
      }
      if (this.$vuetify.breakpoint.mobile) {
        if (response.success) {
          const url = `${response.data}@download@`;
          try {
            window.location = url;
          } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
          }
        } else {
          this.$flash({
            message: 'Ocurrió un error al descargar tu pdf por favor intentalo de nuevo',
            color: 'warning',
            type: 'warning'
          })
        }
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.click {
  cursor: pointer;
}

.qrCode {
  position: fixed;
  margin-left: 530px;
  margin-top: -12px;
  z-index: 1;
}

.qrCodeTwo {
  position: fixed;
  margin-left: 462px;
  margin-top: 45px;
  z-index: 1;
}

.promotionOne {
  background-color: #ccc;
  height: 1122px;
  widows: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-image: url("~/assets/images/ilustrations/qrcomercios.png");
}

.promotionTwo {
  background-color: #ccc;
  height: 550px;
  widows: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-image: url("~/assets/images/ilustrations/qrcliente.png");
}
</style>
