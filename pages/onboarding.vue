<template>
  <div class="backColor" :class="$isIOS ? 'mt-6' : ''">
    <v-app-bar class="mb-5" color="backColor" elevation="0" height="50" v-bind="$attrs">
      <v-row justify="space-between">
        <v-col class="d-flex justify-start" cols="4"></v-col>
        <v-col class="d-flex justify-center" cols="4">
          <v-icon class="icon--lg">{{ $iconsSvg.icon }}</v-icon>
        </v-col>
        <v-col class="d-flex justify-center" cols="4">
          <app-btn
            :to="localePath('dashboard')"
            class="text-decoration-underline pa-0"
            color="primary"
            exact
            router
            text
          >
            <span class="app-body-small">
              {{ $t('login.skip') }}
            </span>
          </app-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <div>
      <onboarding-platform v-if="page === 1" />
      <onboarding-services v-else-if="page === 2" />
      <onboarding-posibilities v-else-if="page === 3" />
      <onboarding-offer v-else-if="page === 4" />
    </div>
    <v-footer app bottom class="pa-0 backColor" fixed padless>
      <v-row class="py-5">
        <v-col class="d-flex justify-end" cols="3">
          <app-btn
            v-if="page > 1"
            fab
            icon="mdi-chevron-left clas"
            outlined
            small
            @click="substract"
          />
        </v-col>
        <v-col class="d-flex justify-center align-center" cols="6">
          <div :style="color(1)" class="steps mx-1"></div>
          <div :style="color(2)" class="steps mx-1"></div>
          <div :style="color(3)" class="steps mx-1"></div>
          <div :style="color(4)" class="steps mx-1"></div>
        </v-col>
        <v-col class="d-flex justify-start" cols="3">
          <app-btn fab icon="mdi-chevron-right" small @click="add" />
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Onboarding',
  layout: 'empty',
  data: () => ({
    page: 1
  }),
  methods: {
    add() {
      if (this.page < 4) {
        this.page = this.page + 1
      } else if (this.page === 4) {
        this.$cookies.set('firstLogin', false, Infinity);
        this.$router.push(this.localePath('dashboard'))
      }
    },
    substract() {
      if (this.page > 1) {
        this.page = this.page - 1
      }
    },
    color(val) {
      if (val === this.page) {
        return { 'background-color': '#FFF' }
      } else {
        return { 'background-color': '#007073' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  display: inline-block;
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid #007073;
}
</style>
