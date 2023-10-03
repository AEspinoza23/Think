<template>
  <v-row class="mt-0 mb-2">
    <v-col class="d-flex justify-center py-0">
      <v-card 
        class="d-flex align-center backColor" 
        flat 
        :width="$vuetify.breakpoint.width"
      >
        <v-card-text class="pa-0 backColor">
          <v-list class="py-0 backColor">
            <app-list-item
              :icon-right="'mdi-chevron-right'"
              :icon="'$iconsSvg.services'"
              :name="'Servicios Contratados'"
              :to="localePath('profile-services')"
              class="card"
            />
            <!-- <app-list-item
              :icon-right="'mdi-chevron-right'"
              :icon="'$iconsSvg.affiliates'"
              :name="'Tus afiliados'"
              :to="localePath('profile-affiliates')"
              class="my-1 card"
            /> -->
            <app-list-item
              :icon-right="'mdi-chevron-right'"
              :icon="'$iconsSvg.user'"
              :name="'Tu consultor'"
              :to="localePath('profile-consultant')"
              class="my-1 card"
            />
            <app-list-item
              :icon-right="'mdi-chevron-right'"
              :icon="'$iconsSvg.balance'"
              :name="'Tu saldo'"
              :to="localePath('profile-balance')"
              class="card"
            />
            <app-list-item
              :icon="'$iconsSvg.share'"
              :icon-right="'mdi-chevron-right'"
              :name="'QR y Referidos'"
              :to="localePath('/menu/referral-code')"
              class="my-1 card"
            />
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProfilePanels'
}
</script>

<style scoped></style>
