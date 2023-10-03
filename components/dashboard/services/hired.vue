<template>
  <div>
    <v-row justify="center">
      <v-col cols="auto"
        class="serviceBox ma-1" 
        :style="{
          backgroundColor: '#00BBBF', 
          color: '#FFFFFF',
          'font-size': '30px',
          'font-weight': 700
        }"
      >
        {{ hiredType.length }}
      </v-col>
      <v-col v-for="(item, i) in types" :key="i" cols="auto" class="serviceBox card ma-1">
        <div v-if="isHired(item.id)">
          <v-img
            v-if="item.small_color_image"
            :lazy-src="item.small_color_image.svg"
            :src="item.small_color_image.svg"
            class="iconHired"
          />
        </div>
        <div v-else>
          <v-img
            v-if="item.small_gray_image"
            :lazy-src="item.small_gray_image.svg"
            :src="item.small_gray_image.svg"
            class="iconHired"
            @click="goTo"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="my-3">
      <v-col cols="5">
        <v-img min-width="130px" max-width="130px" :src="$assets.financial" />
      </v-col>
      <v-col cols="7">
        <v-row class="app-body-medium-medium title--text my-1">
          Tienes &nbsp; 
          <span 
            class="text-decoration-underline primary--text"
            :style="{cursor: 'pointer'}"
            @click="goTo"
          >
          {{ hiredType.length }} servicios contratados 
          </span>
          de {{ types.length }} recomendados. 
          ¡Contrata más servicios para ahorrar hasta 3.000€ al año!
        </v-row>
        <v-row>
          <app-btn @click="openLink">
            <span class="app-body-medium"> Ahorrar más con PIENSA </span>
          </app-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'DashboardServicesHired',
    props: {
      services: { type: Array, default: () => [] },
      types: { type: Array, default: () => [] }
    },
    data: () => ({}),
    computed: {
      ...mapGetters({
        isDarkTheme: 'app/isDark',
      }),
      hiredType() {
        const hired = [];
        this.types.forEach(element => {
          const index = this.services.findIndex(object => {
            return object.offer.service === element.id;
          });
          if (index !== -1) {
            hired.push(element.id)
          }
        });
        const result = hired.filter((item,index)=>{
          return hired.indexOf(item) === index;
        })
        return result;
      }
    },
    methods: {
      goTo() {
        this.$router.push(this.localePath('profile-services'))
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
      },
      isHired(typeId) { 
        const index = this.services.findIndex(object => {
          return object.offer.service === typeId;
        });
        const result = index !== -1
        return result; 
      }
    }
  }
</script>

<style>
.serviceBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 60px;
  height: 34px;
  border-radius: 4px;
  flex: none;
  backdrop-filter: blur(12.5px);
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
}

.iconHired {
  width: 25px;
  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>