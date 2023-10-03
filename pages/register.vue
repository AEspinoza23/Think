<template>
  <div class="d-flex justify-center" style="height: 100%">
    <register-form v-if="register" @created="created" @commerce="changeToCommerce"/>
    <div v-else class="d-flex pa-5" style="height: 100%">
      <div v-if="commerce">
        <v-form ref="form" v-model="form" lazy-validation>
          <register-commerce-find 
            v-if="page === 1" 
            :data="commerceData" 
            @edit="edit" 
          />
          <register-commerce-bills 
            v-else-if="page === 2" 
            :data="commerceData" 
            @edit="edit" 
          />
          <register-commerce-direction 
            v-else-if="page === 3" 
            :data="commerceData"
            @edit="edit"
            @changeLatLng="changeLatLng"
          />
          <register-commerce-map 
            v-else-if="page === 4" 
            :data="commerceData"
            :latitude="latitude"
            :longitude="longitude"
            @edit="edit"
            @changeLatLng="changeLatLng"
          />
          <register-commerce-confirmation 
            v-else-if="page === 5"
            :data="commerceData"
            @edit="edit"
          />
        </v-form>
      </div>
      <div v-else>
        <register-success v-if="success" :email="email" />
        <register-failed v-else @retry="register = true" />
      </div>
    </div>
    <v-footer v-if="commerce" color="transparent" app bottom class="pa-0" fixed padless>
      <v-row class="py-5" justify="end">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'Register',
  mixins: [Form], 
  layout: 'login',
  data: () => ({
    register: true,
    success: false,
    commerce: false,
    email: '',
    page: 1,
    form: true,
    commerceData: {
      address: {}
    },
    userInfo: {},
    latitude: '',
    longitude: '',
    loading: false
  }),
  computed: {
    imgStyle() {
      return { left: '125px', top: '0px' }
    },
    boxStyle() {
      return { top: '0%' }
    },
    containerHeight() {
      return this.$vuetify.breakpoint.height
    }
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push(this.localePath('dashboard'));
    }
    await this.changeAppTheme(false)
    await setTimeout(() => {
      this.$vuetify.theme.dark = false
    }, 50)
    await this.fetchGpsPosition();
    await this.getShopsTypes();
  },
  methods: {
    ...mapActions({
      getShopsTypes: 'user/getShopsTypes',
      changeAppTheme: 'app/changeAppTheme',
      registerCommerce: 'user/createCommerce'
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
        if (this.page === 5) {
          this.createCommerce();
        } else if (this.page < 5) {
          this.page = this.page + 1
        }
      }
    },
    substract() {
      if (this.page > 1) {
        this.page = this.page - 1
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
      if (val.address) {
        this.commerceData.address[val.key] = val.val;
      } else {
        this.commerceData[val.key] = val.val;
      }
    },
    changeLatLng(val) {
      this.latitude = val.lat;
      this.longitude = val.lng;
      this.commerceData.latitude = val.lat;
      this.commerceData.longitude = val.lng;
    },
    created(val) {
      this.email = val.email;
      this.success = val.success;
      this.commerce = false;
      this.register = false;
    },
    changeToCommerce(val) {
      this.commerceData = { ...val, address: {} };
      this.commerce = true;
      this.register = false;
    },
    async createCommerce() {
      this.loading = true;
      if (!this.commerceData.referral_code) {
        delete this.commerceData.referral_code;
      }
      const { success, data } = await this.registerCommerce(this.commerceData);
      this.loading = false;
      if (success) {
        this.email = this.commerceData.email;
        this.success = true;
        this.commerce = false;
        this.register = false;
      } else {
        const showErrorAsMessage = false;
        this.handleErrorResponse(data, showErrorAsMessage);
        this.errorMessages = data;
      };
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