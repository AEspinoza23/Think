<template>
  <v-app class="card">
    <v-card v-if="error.statusCode === 404" elevation="0">
      <v-row class="mt-0">
        <v-col class="d-flex justify-center">
          <div style="height: 165px; width: 182px">
            <v-img :src="$assets.magictrick" height="auto" width="auto" />
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters>
        <v-col class="d-flex justify-center">
          <div class="app-body-large-bold">
            Error 404 La página no existe
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters justify="center">
        <v-col cols="auto">
          <div class="app-body-medium text-center">
            Lo sentimos, pero la página que buscas ha desaparecido o quizá nunca haya llegado a existir
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters>
        <v-col class="d-flex justify-center">
          <app-btn size="medium">
            Regresar
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else-if="error.statusCode === 500" elevation="0">
      <v-row class="mt-0">
        <v-col class="d-flex justify-center">
          <div style="height: 165px; width: 182px">
            <v-img :src="$assets.cloud" height="auto" width="auto" />
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters>
        <v-col class="d-flex justify-center">
          <div class="app-body-large-bold">
            Error 500 Fallo en el servidor
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters justify="center">
        <v-col cols="auto">
          <div class="app-body-medium text-center">
            El servidor está fallando y no permite continuar navegando
          </div>
        </v-col>
      </v-row>
      <v-row class="py-2" no-gutters>
        <v-col class="d-flex justify-center">
          <app-btn size="medium" @click="goTo">
            Regresar
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    goTo() {
      this.$router.push(this.localePath('/'))
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
