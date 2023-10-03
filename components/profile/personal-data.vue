<template>
  <v-row class="mb-2 mt-2" no-gutters>
    <v-col class="d-flex justify-center">
      <v-card
        :to="localePath('profile-details')"
        class="rounded-lg shades-small-card d-flex align-center card"
        height="auto"
        min-height="127"
        :width="$vuetify.breakpoint.width"
      >
        <v-row class="my-0">
          <v-col class="pl-6 d-flex align-center" cols="4">
            <v-progress-circular
              :rotate="-90"
              :size="79"
              :value="profileProgress"
              :width="4"
              color="primary"
            >
              <v-avatar color="placeholderBase" height="65" width="65">
                <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
                <v-icon v-else class="icon--exl pa-0">{{ $iconsSvg.profile }}</v-icon>
              </v-avatar>
            </v-progress-circular>
          </v-col>
          <v-col v-if="$auth.$state.user.profile !== 6" cols="6">
            <v-row>
              <v-col class="pb-0 px-0">
                <span v-if="userData.fullName" class="app-heading-1-bold"> {{ userData.fullName | shortenWord(10) }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pb-0 px-0">
                <span class="app-body-small"> {{ userData.email | shortenWord(20) }} </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pb-0 px-0">
                <span class="app-body-small">
                  {{ userData.document_number | shortenWord(10) }}
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-else cols="6">
            <v-row no-gutters>
              <v-col cols="auto" class="pb-0 px-0">
                <span class="app-heading-1-bold"> {{ shopData.fullName }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
              <v-col cols="auto" class="pb-0 px-0">
                <span class="app-body-small"> {{ shopData.address || userData.email }} </span>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
              <v-col cols="auto">
                <v-icon size="15" color="success" class="mr-2">
                  mdi-check
                </v-icon>
                <span class="app-body-small">
                  {{ shopData.commerce_type }}
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-icon>mdi-chevron-right</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PersonalData',
  data() {
    return {
      imageSrc: null,
      profileProgress: 0,
      progressValue: ['first_name', 'phone_number', 'document_number', 'birthday', 'avatar']
    }
  },
  computed: {
    user() {
      return this.$auth.$state.user || {}
    },
    userData() {
      let fullName;
      if (this.user?.first_name) {
        fullName =`${this.user?.first_name}` || '';
        if (this.user?.last_name) {
          fullName =`${this.user?.first_name} ${this.user?.last_name}` || '';
        }
      } else {
        fullName = 'Usuario sin nombre'
      }
      return {
        fullName,
        email: this.user?.email || '',
        document_number: this.user?.document_number || ''
      }
    },
    shopData() {
      return {
        fullName:this.user?.commerce?.store_name || 'Comercio sin nombre',
        address: this.user?.addresses[0]?.xs_address || '',
        commerce_type: this.user?.commerce?.commerce_type?.name || ''
      }
    }
  },
  mounted() {
    this.imageSrc = this.user?.avatar?.image_xs
    this.calculateProfileProgress()
  },
  methods: {
    calculateProfileProgress() {
      setTimeout(() => {
        Object.keys(this.user).forEach((key) => {
          this.progressValue.forEach((element) => {
            if (key === element && this.user[key]) {
              this.profileProgress += 20
            }
          })
        })
      }, 200)
    }
  }
}
</script>

<style scoped></style>
