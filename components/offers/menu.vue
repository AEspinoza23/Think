<template>
  <v-navigation-drawer
    v-model="dialog"
    :width="$vuetify.breakpoint.width"
    app
    @click:outside="changeDialogValue"
  >
    <v-card class="header-notch" color="card">
      <v-app-bar class="px-0" color="header-notch" flat height="55">
        <v-row :class="$isIOS ? 'pb-5' : ''" justify="space-between">
          <v-col cols="auto">
            <v-btn icon text @click="changeDialogValue">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mt-3">
            <span>Menú</span>
          </v-col>
          <v-col cols="auto" class="mt-2">
            <div
              @click="openLink()"
            >
              <v-icon class="icon--md">{{ $iconsSvg.contacto }}</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-card-text class="mt-2 pt-5 container rounded-lg">
        <v-list color="transparent">
          <app-list-item
            v-if="$auth.$state.user.profile === 6"
            :icon="'$iconsSvg.moneyBox'"
            :icon-right="'mdi-chevron-right'"
            :name="'Realizar Venta'"
            :to="localePath('/menu/qr-code')"
            class="my-3 card"
            @click="changeDialogValue"
          />
          <app-list-item
            :icon="'$iconsSvg.cart'"
            :icon-right="'mdi-chevron-right'"
            :name="'Realizar compra'"
            :to="localePath('/menu/make-sale')"
            class="my-3 card"
            @click="changeDialogValue"
          />
          <app-list-item
            :icon="'$iconsSvg.adjust'"
            :icon-right="'mdi-chevron-right'"
            :name="'Ajustes'"
            :to="localePath('/menu/adjust')"
            class="my-3 card"
            @click="changeDialogValue"
          />
          <!-- <div>
            <app-list-item
              :icon="'$iconsSvg.profile'"
              :name="'Perfil'"
              :to="localePath('profile')"
              class="card"
              @click="changeDialogValue"
            />
          </div> -->
          <div v-if="!$auth.loggedIn" @click="goTo('login')">
            <app-list-item
              :icon="'$iconsSvg.logIn'"
              :name="'Entrar'"
              class="my-3 card"
            />
          </div>
          <div v-if="!$auth.loggedIn" @click="goTo('pre-register')">
            <app-list-item
              :icon="'$iconsSvg.register'"
              :name="'Regístrate'"
              class="card"
            />
          </div>
          <div v-if="$auth.loggedIn" v-ripple @click="logout">
            <app-list-item :icon="'$iconsSvg.logIn'" :name="'Salir'" class="my-3" />
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import menu from '~/assets/icons/lottie_icons/menu.json'
export default {
  name: 'OffersMenu',
  data() {
    return {
      defaultOptions: { animationData: menu, loop: false }
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    }),
    dialog() {
      return this.dialogValue;
    }
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    }),
    async logout() {
      try {
        await this.changeDialogValue();
        await this.$cookies.remove('credentials');
        await this.$auth.logout();
        await this.$router.push(this.localePath('/login'));
      } catch (e) {
        this.handleErrorResponse(e.response.data);
      }
    },
    goTo(page) {
      this.changeDialogValue();
      this.$router.push(
        this.localePath({
          name: page
        })
      );
    },
    openLink() {
      let link
      if (this.$auth.$state.user.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        }
        window.open(link, '_blank')
      } else if (
        this.$auth.$state.user.consultant?.phone_code &&
        this.$auth.$state.user.consultant?.phone_number
      ) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola%20me%20gustaría%20contratar%20una%20oferta`
        window.open(link, '_blank')
      } else {
        this.$flash({
          message:
            'Tú consultor no tiene número de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped></style>
