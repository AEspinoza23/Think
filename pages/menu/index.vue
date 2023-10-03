<template>
  <div class="py-3 background">
    <v-card
      :width="$vuetify.breakpoint.width"
      class="rounded-lg shades-small-card backColor"
      color="backColor"
      elevation="0"
      height="auto"
    >
      <v-card-text>
        <app-list-item
          :icon="'$iconsSvg.adjust'"
          :icon-right="'mdi-chevron-right'"
          :name="'Ajustes'"
          :to="localePath('/menu/adjust')"
          class="my-3 card"
          @click="changeDialogValue"
        />
        <app-list-item
          :icon="'$iconsSvg.message'"
          :icon-right="'mdi-chevron-right'"
          :name="'Contacto'"
          :to="localePath('/menu/contact')"
          class="my-3 card"
          @click="changeDialogValue"
        />
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
          :icon="'$iconsSvg.commerce'"
          :icon-right="'mdi-chevron-right'"
          :name="'Comercios Piensa'"
          :to="localePath('/menu/shops')"
          class="my-3 card"
          @click="changeDialogValue"
        />
        <app-loading v-if="loading" />
        <div v-else v-ripple class="rounded" @click="logout">
          <app-list-item 
            :icon="'$iconsSvg.logIn'" 
            :name="'Salir'" 
            class="my-3 card"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  layout: 'app',
  auth: true,
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    })
  },
  async mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Menú',
      isNotification: true
    }, true)
    await this.fetchGpsPosition();
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue'
    }),
    ...mapMutations({
      changeLocation: 'user/SET_LOCATION'
    }),
    async fetchGpsPosition() {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.changeLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error(error);
          this.$flash({
            message: 'No hemos podido establecer su ubicación'
          });
        }
      );
    },
    async logout() {
      this.loading = true;
      try {
        await this.$cookies.remove('credentials');
        await this.$auth.logout()
        this.loading = false;
        this.$router.push(this.localePath('/login'))
      } catch (e) {
        this.loading = false;
        this.handleErrorResponse(e.response.data)
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped></style>
