<template>
  <div class="light">
    <v-row class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.logoInicioLight" :style="imgStyle" min-width="470" />
      </v-col>
    </v-row>
    <v-row justify="center" :style="index" no-gutters>
      <v-col cols="10" class="white--text">
        <span class="app-display-1-bold"> Bienvenido, </span>
        <br />
        <span class="app-body-large">
          Elige qué tipo de usuario eres para registrarte y empezar a ahorrar
        </span>
      </v-col>
    </v-row>
    <v-row :style="index">
      <v-col>
        <v-card light color="transparent" elevation="0">
          <v-row>
            <v-col class="d-flex justify-center">
              <div
                class="boxPreRegister boxBackground pa-5 pointer"
                @click="redirect(true)"
              >
                <v-row no-gutters class="pa-1">
                  <v-col cols="6">
                    <v-row no-gutters>
                      <v-col cols="12" class="app-superDisplay-2-bold">
                        Usuario
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col>
                        <div class="app-body-large mt-2">
                          Los usuarios son particulares o pymes que desean 
                          ahorrar en sus facturas y ganar saldo virtual.
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-img max-width="164px" :src="$assets.onBoard2" />
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row :style="index">
      <v-col>
        <v-card light color="transparent" elevation="0">
          <v-row>
            <v-col class="d-flex justify-center">
              <div
                class="boxPreRegister boxBackground pa-5 pointer"
                @click="redirect(false)"
              >
                <v-row no-gutters class="pa-1">
                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col cols="6" class="app-superDisplay-2-bold d-flex align-end">
                        Comercio
                      </v-col>
                      <v-col cols="6">
                        <v-img max-width="164px" :src="$assets.tienda" />
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="auto">
                        <div class="app-body-large mt-2">
                          Los Comercios Piensa son establecimientos que además de 
                          ahorrar en sus servicios, quieren ofrecer a los clientes 
                          Piensa que consuman con su saldo virtual y atraer nuevos clientes.
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PreRegister',
  layout: 'login',
  computed: {
    imgStyle() {
      return { left: '50px', top: '50px', 'z-index': 0 };
    },
    index() {
      return { 'z-index': 1 };
    }
  },
  methods: {
    redirect(isUser) {
      let referralCode;
      if (this.$route.query.referral_code) {
        referralCode = this.$route.query.referral_code;
      }
      this.$router.push(
        this.localePath({
          name: 'register',
          query: { commerce: !isUser, referral_code: referralCode }
        })
      )
    }
  }
}
</script>