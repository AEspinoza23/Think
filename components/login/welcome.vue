<template>
  <div>
    <!-- IMAGE-->
    <v-row class="pt-2 pb-16 pt-md-2" justify="center">
      <div style="height: 400px; width: 450px">
        <v-img
          :lazy-src="$assets.logoInicioLight"
          :src="$assets.logoInicioLight"
          :style="imgStyle"
          width="auto"
          height="auto"
        />
      </div>
    </v-row>

    <!-- BIENVENIDOS-->
    <v-row class="white--text" justify="center">
      <v-col class="app-display-1-bold d-flex justify-center mt-16" cols="12">
        <span> {{ $t('login.welcome') }} </span>
      </v-col>
    </v-row>
    <v-row class="white--text" justify="center" no-gutters>
      <v-col class="app-body-large d-flex justify-center mt-3" cols="12">
        <!-- eslint-disable-next-line-->
        <span class="text-center" v-html="$t('login.stepToStart')" />
      </v-col>
    </v-row>

    <!-- BOTONES-->
    <v-row justify="center">
      <v-col class="app-body-large d-flex justify-center px-0" cols="auto">
        <app-btn
          :to="localePath('pre-register')"
          class="mx-2"
          color="white"
          exact
          outlined
          router
          size="medium"
        >
          <span class="app-body-medium-bold">{{ $t('login.register') }}</span>
        </app-btn>
      </v-col>
      <v-col class="d-flex justify-center app-body-large px-0" cols="auto">
        <app-btn :to="localePath('login')" class="mx-2" exact router size="medium">
          <span class="app-body-medium-bold">{{ $t('login.access') }}</span>
        </app-btn>
      </v-col>
    </v-row>

    <!-- SALTAR-->
    <!-- <v-row no-gutters>
      <v-col class="app-body-large d-flex justify-center mt-4" cols="12">
        <app-btn :to="localePath('dashboard')" color="white" exact router size="medium" text>
          <span class="app-body-medium-bold">{{ $t('login.omit') }}</span>
        </app-btn>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  computed: {
    imgStyle() {
      return { left: '20px' }
    }
  }
}
</script>

<style scoped></style>
