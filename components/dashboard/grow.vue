<template>
  <v-card :width="$vuetify.breakpoint.width" class="backColor my-3 rounded-lg shades-general">
    <v-row no-gutters class="pa-2">
      <v-card
        class="rounded-lg shades-small-card"
        color="degraded"
        :width="$vuetify.breakpoint.width"
      >
        <v-card-text>
          <v-row no-gutters class="white--text" justify="center" align="center">
            <v-col cols="7">
              <v-row no-gutters class="app-body-exlarge-bold">
                Haz que tu saldo crezca aún más
              </v-row>
              <v-row no-gutters class="app-body-medium my-2">
                <div>
                  En PIENSA queremos que
                  <span class="app-body-medium-bold">
                    ganes más. Recomienda PIENSA
                  </span>
                  a personas que quieran emprender su propio negocio y
                  <span class="app-body-medium-bold">
                    haz que tu saldo despegue
                  </span>
                  como un cohete.
                </div>
              </v-row>
              <v-row no-gutters class="app-body-medium my-2">
                <div>
                  <span class="app-body-medium-bold">
                    Gana hasta 500€
                  </span>
                  directos a tu saldo si la persona a la que recomiendes adquiere una
                  <span class="app-body-medium-bold">
                    franquicia PIENSA
                  </span>
                </div>
              </v-row>
              <v-row no-gutters>
                <app-btn block :to="('recommend')">
                  Recomendar PIENSA
                </app-btn>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-img
                :lazy-src="$assets.cohete"
                :src="$assets.cohete"
                min-width="170px"
                max-width="170px"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'DashboardGrow',
    data: () => ({})
  }
</script>