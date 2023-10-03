<template>
  <div :class="$isIOS ? 'mt-6' : ''">
    <v-app-bar class="mb-5" color="transparent" elevation="0" height="50">
      <v-row justify="space-between">
        <v-col class="d-flex justify-start" cols="4"></v-col>
        <v-col class="d-flex justify-center" cols="4">
          <v-icon class="icon--lg">{{ $iconsSvg.icon }}</v-icon>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
          <app-btn
            :to="localePath('menu')"
            class="text-decoration-underline pa-0"
            color="primary"
            exact
            router
            text
          >
            <span class="app-body-small">
              {{ $t('login.skip') }}
            </span>
          </app-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card 
      :width="$vuetify.breakpoint.width"
      class="my-3"
      color="transparent"
      elevation="0"
    >
      <v-form ref="form" v-model="form" lazy-validation>
        <register-commerce-find 
          v-if="page === 1" 
          :data="formData" 
          @edit="edit" 
        />
        <register-commerce-bills 
          v-else-if="page === 2" 
          :data="formData" 
          @edit="edit" 
        />
        <register-commerce-direction 
          v-else-if="page === 3" 
          :data="formData"
          @edit="editAddress"
          @changeLatLng="changeLatLng"
        />
        <register-commerce-map 
          v-else-if="page === 4" 
          :data="formData"
          :latitude="latitude"
          :longitude="longitude"
          @edit="edit"
          @changeLatLng="changeLatLng"
        />
        <register-commerce-confirmation 
          v-else-if="page === 5"
          :data="formData"
          @edit="edit"
        />
        <register-commerce-last-page
          v-else-if="page === 6"
          :data="formData"
          @edit="edit"
        />
      </v-form>
      <v-footer v-if="page < 6" color="transparent" bottom elevation="0" class="pa-0 mt-2" padless>
        <v-row class="py-5">
          <v-col class="d-flex justify-end" cols="3">
            <app-btn
              v-if="false"
              fab
              icon="mdi-chevron-left clas"
              outlined
              small
              @click="substract"
            />
          </v-col>
          <v-col class="d-flex justify-center align-center" cols="6">
            <div :style="color(1)" class="steps mx-1"></div>
            <div :style="color(2)" class="steps mx-1"></div>
            <div :style="color(3)" class="steps mx-1"></div>
            <div :style="color(4)" class="steps mx-1"></div>
            <div :style="color(5)" class="steps mx-1"></div>
          </v-col>
          <v-col class="d-flex justify-start" cols="3">
            <app-btn :loading="loading" fab icon="mdi-chevron-right" small @click="add" />
          </v-col>
        </v-row>
      </v-footer>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CommerceWizard',
  layout: 'login',
  data: () => ({
    form: true,
    page: 1,
    formData: {
      address: {}
    },
    latitude: '',
    longitude: '',
    loading: false
  }),
  async mounted() {
    await this.fetchGpsPosition();
    await this.getShopsTypes();
  },
  methods: {
    ...mapActions({
      getShopsTypes: 'user/getShopsTypes',
      registerCommerce: 'user/createOwnCommerce'
    }),
    async fetchGpsPosition() {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude =  position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.error(error);
          this.$flash({
            message: 'No hemos podido establecer su ubicación'
          });
        }
      );
    },
    add() {
      if (this.$refs.form.validate()) {
        if (this.page === 6) {
          this.createOwnCommerce();
        } else if (this.page < 6) {
          this.page = this.page + 1;
        }
      }
    },
    substract() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
    color(val) {
      if (val === this.page) {
        return { 'background-color': '#FFF' }
      } else {
        return { 'background-color': '#007073' }
      }
    },
    edit(val) {
      this.formData[val.key] = val.val;
    },
    editAddress(val) {
      this.formData.address[val.key] = val.val;
    },
    changeLatLng(val) {
      this.latitude = Number(val.lat);
      this.longitude = Number(val.lng);
      this.formData.address.latitude = val.lat;
      this.formData.address.longitude = val.lng;
    },
    async createOwnCommerce() {
      this.loading = true;
      const info = {...this.formData, creation_stage: true };
      const { success, data } = await this.registerCommerce(info);
      if (success) {
        await this.$auth.fetchUser()
        this.page = 7;
      } else {
        let showErrorAsMessage = true;
        if (data.details || data.detail || data.error) {
          showErrorAsMessage = false;
        };
        this.handleErrorResponse(data, showErrorAsMessage);
        this.errorMessages = data;
      };
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  display: inline-block;
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid #007073;
}
</style>
