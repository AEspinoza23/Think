<template>
  <v-card :width="$vuetify.breakpoint.width" class="mt-4 mb-3 shades-small-card rounded-lg backColor">
    <v-card-text class="title--text">
      <div class="d-flex pa-3">
        <div dark>
          <v-avatar  class="shades-small-card" :style="{'border-radius': '10px'}" size="70.75">
            <!-- <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" /> -->
            <v-icon
              dark
              :style="{background: '#101D25'}"
              class="icon--exl pa-0"
            >{{ $iconsSvg.consultant }}</v-icon>
          </v-avatar>
        </div>
        <div class="ml-2">
          <v-row class="my-2" justify="start" no-gutters>
            <v-col cols="auto">
              <v-icon class="icon--sm">{{ $iconsSvg.message }}</v-icon>
            </v-col>
            <v-col cols="auto" class="ml-2">
              <span class="app-body-small">{{ email || '' }}</span>
            </v-col>
          </v-row>
          <v-row class="" justify="start" no-gutters>
            <v-col cols="auto">
              <v-icon class="icon--sm">{{ $iconsSvg.user }}</v-icon>
            </v-col>
            <v-col cols="auto" class="ml-2">
              <span v-if="$auth.user.consultant !== null" class="app-body-small">
                <span v-if="$auth.user.consultant.phone_code">+</span>
                {{ $auth.user.consultant.phone_code || '' }}
                {{ $auth.user.consultant.phone_number || '' }}
              </span>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Affiliate',
  props: {
    consultant: { type: Object, default: () => ({}) }
  },
  computed: {
    fullName() {
      let fullname = this.consultant?.first_name || '';
      if (this.$auth.user.consultant?.middle_name !== null && this.$auth.user.consultant?.middle_name !== undefined) {
        fullname = fullname + ' ' + this.consultant.middle_name;
      };
      if (this.$auth.user.consultant?.last_name !== null && this.$auth.user.consultant?.last_name !== undefined) {
        fullname = fullname + ' ' + this.consultant.last_name;
      };
      return fullname;
    },
    imageSrc() {
      let image = null;
      if (this.$auth.user.consultant?.avatar != null) {
        image = this.$auth.user.consultant.avatar.image_400
      };
      return image;
    },
    address() {
      return this.$auth.user.consultant?.address || ''
    },
    phoneNumber() {
      return `${this.$auth.user.consultant?.phone_code} ${this.$auth.user.consultant?.phone_number}` || ''
    },
    email() {
      return this.$auth.user.consultant?.email || ''
    }
  },
}
</script>
