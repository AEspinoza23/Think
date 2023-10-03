<template>
  <div>
    <v-card :width="$vuetify.breakpoint.width" class="backColor my-5 rounded-lg shades-general pa-4">
      <v-row no-gutters>
        <div class="app-body-exlarge-bold">
          Haz que tu saldo crezca aún más
        </div>
      </v-row>
      <v-row no-gutters class="my-3">
        <div class="app-body-large">
          <span class="font-weight-bold">Gana hasta 500€</span> 
          directos a tu saldo si la persona 
          a la que recomiendes adquiere una franquicia PIENSA
        </div>
      </v-row>
      <v-row class="copyBox card px-3" no-gutters justify="space-between">
        <v-col cols="8" class="text-truncate">
          <span class="app-body-large secondary--text text-truncate">
            {{ url }}
          </span>
        </v-col>
        <v-col cols="auto" @click="copyToClipboard">
          <span>
            <v-icon class="icon--xl">{{ $iconsSvg.copy }}</v-icon>
            <span class="app-body-large-bold">Copiar</span>
          </span>
        </v-col>
      </v-row>
      <v-row class="my-3 text-center" justify="space-around" no-gutters>
        <v-col v-for="(network, i) in networks" :key="i" cols="2">
          <ShareNetwork
            :network="network.name"
            :url="url"
            description="Ver oferta"
            title="Mira lo que acabo de encontrar en Piensa:"
            quote="Mira lo que acabo de encontrar en Piensa:"
          >
            <v-row no-gutters>
              <v-col class="py-0">
                <v-avatar rounded size="46px">
                  <img :alt="network.name" :src="network.image" />
                </v-avatar>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="app-label mt-2 title--text">
                <span>{{ network.name }}</span>
              </v-col>
            </v-row>
          </ShareNetwork>
        </v-col>
      </v-row>
    </v-card>
    <v-card :width="$vuetify.breakpoint.width" class="backColor my-3 rounded-lg shades-general pa-4">
      <v-row no-gutters>
        <div class="app-body-exlarge-bold">
          Envía por email todos los detalles
        </div>
      </v-row>
      <v-row no-gutters class="my-3">
        <div class="app-body-large">
          Añade todos los emails de quienes quieras que reciban tu oferta 
          presionando enter cada vez que se termine de ingresar uno
        </div>
      </v-row>
      <v-row no-gutters class="my-3">
        <v-col cols="12">
          <v-form
            ref="form"
            v-model="form"
            lazy-validation
          >
            <app-combobox 
              v-model="info.contacts" 
              :label="'Email'"
              :placeholder="'Introduzca los correos (Se separan con enter)'"
              :items="items"
              multiple
              chips
              :append-icon="''"
            />
          </v-form>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" class="mb-3">
        <v-col cols="auto">
          <app-btn class="px-13" @click="logdata">
            Enviar
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>


<script>
import { Clipboard } from '@capacitor/clipboard';
import { mapActions } from 'vuex';
import Form from '~/mixins/form'
export default {
  name: 'Recommend',
  mixins: [Form],
  layout: 'app',
  props: {},
  data: () => ({
    networks: [],
    info: {
      contacts: [],
    },
    items: [],
    form: true
  }),
  computed: {
    referralCode() {
      if (this.$auth.loggedIn) {
        return this.$auth.$state.user.referral_code
      } 
      return '';
    },
    url() {
      if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
        return `https://piensa-pre.sfsl.es/es/pre-register/?referral_code=${this.referralCode}&commerce=true`;
      }
      return `https://piensa-pre.sfsl.es/es/pre-register/?referral_code=${this.referralCode}&commerce=true`;
    }
  },
  mounted() {
    this.$headerConfig({
      isTitle: true,
      title: 'Recomendar franquicia',
      isBack: true,
      isNotificationSearch: true
    }, true);

    this.networks = [
      {
        name: 'Facebook',
        image: this.$assets.facebook
      },
      {
        name: 'Twitter',
        image: this.$assets.twitter
      },
      {
        name: 'Whatsapp',
        image: this.$assets.whatsapp
      },
      {
        name: 'Telegram',
        image: this.$assets.telegram
      },
      {
        name: 'Email',
        image: this.$assets.mail
      }
    ]
  },
  methods: {
    ...mapActions({
      sendEmail: 'user/sendEmail'
    }),
    copyToClipboard() {
      let success = false;
      success = navigator.clipboard.writeText(this.url);
      try {
        Clipboard.write({
          string: this.url
        });
      } catch (error) {
        console.log(error);
      }
      try {
        // eslint-disable-next-line no-undef
        NativeAndroid.copyToClipboard(this.url);
      } catch (error) {
        console.log(error);
      }
      if (success) {
        this.$flash({
          message: 'Url copiada satisfactoriamente',
          color: 'success'
        })
      } else {
        this.$flash({
          message: 'No se pudo copiar url',
          color: 'error'
        })
      }
    },
    async logdata() {
      if (this.$refs.form.validate()) {
        if (this.info.contacts) {
          const { success, data } = await this.sendEmail(this.info);
          if (success) {
            this.$flash({
              message: 'Email enviado exitosamente',
              color: 'success'
            })
          } else {
            this.$flash({
              message: data.details | 'Hubo un error con el envío del email, intente nuevamente.',
              color: 'error'
            })
          }
        } else {
          this.$flash({
              message: 'Debe introducir al menos un email',
              color: 'warning'
            })
        }
      }
    }
  }
}
</script>

<style>
.copyBox {
  width: auto;
  height: 42px;
  border-radius: 5px;
  align-items: center;
}
</style>