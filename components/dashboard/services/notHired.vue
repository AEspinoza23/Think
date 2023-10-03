<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card
        :width="$vuetify.breakpoint.width"
        class="rounded-lg shades-small-card"
        color="degradedRed"
        height="auto"
      >
        <v-row class="white--text app-body-exlarge-bold pt-3 pl-3" no-gutters>
          ¡No tienes servicios contratados!
        </v-row>
        <v-row class="white--text app-body-medium pt-2 pl-3" justify="space-between" no-gutters>
          <v-col cols="7">
            <div class="mb-1">
              Aún no tienes ningún servicio contratado con nosotros 😭 Tu
              <span class="font-weight-bold">
                potencial de ahorro
              </span> 
              es de 1.200€ y
              <span class="white error--text font-weight-bold px-1">hasta 3.000€ anuales </span>
            </div>
            <div class="pt-3">
              ¿A qué estás esperando?
              <span class="font-weight-bold">
                Empieza a ahorrar GRATIS con PIENSA
              </span>  
            </div>
            <v-btn color="white" class="my-2" @click="openLink">
              <span class="error--text font-weight-bold">
                Quiero ahorrar con PIENSA
              </span>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-img
              :src="$assets.onBoard3" 
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    GoTo() {
      this.$router.push(this.localePath('offers-study'))
    },
    openLink() {
      let link
      if (this.$auth.$state.user.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola,%20quiero%20ahorrar%20con%20PIENSA`
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola,%20quiero%20ahorrar%20con%20PIENSA`
        }
        window.open(link, '_blank')
      } else if (
        this.$auth.$state.user.consultant?.phone_code &&
        this.$auth.$state.user.consultant?.phone_number
      ) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola,%20quiero%20ahorrar%20con%20PIENSA`
        window.open(link, '_blank')
      } else {
        this.$flash({
          message:
            'Tú consultor no tiene número de whatsapp asociado para contacto envíale un correo',
          color: 'warning',
          type: 'warning'
        });
        this.$router.push(this.localePath('profile-consultant'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  &--coins-img {
    position: absolute;
    width: 100%;
    top: -20px;
    right: -15px;
  }
}
</style>
