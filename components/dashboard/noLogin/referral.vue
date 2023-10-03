<template>
  <v-card
    class="rounded-lg mt-3 shades-small-card"
    color="degraded"
  >
    <v-card-text>
      <v-row no-gutters class="white--text" justify="center" align="center">
        <v-col cols="7">
          <v-row no-gutters class="app-body-exlarge-bold">
            Gana dinero con PIENSA
          </v-row>
          <v-row no-gutters class="app-body-medium my-2">
            <div>
              <span class="app-body-medium-bold">
                Comparte tu link de referido
              </span>
              de forma rápida y sencilla con todos tus amigos y
              <span class="app-body-medium-bold">
                empieza a generar ingresos pasivos
              </span>
              recomendando PIENSA
            </div>
          </v-row>
          <v-row no-gutters>
            <!-- <dashboard-affiliate-dialog localePath('/menu/referral-code')/> -->
            <v-btn 
              color="button-primary" 
              :to="localePath('pre-register')"
              block
            >
              <span class="app-body-medium white--text">
                Registrarme
              </span>
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-img
            :lazy-src="$assets.atraer"
            :src="$assets.atraer"
            max-width="200"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardAffiliateBanner',
  data: () => ({})
}
</script>