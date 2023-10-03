<template>
  <div>
    <v-row class="mt-3">
      <span class="app-heading-1 ml-3">Positive</span>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="auto">
        <div class="my-3">
          <span class="app-heading-1 ml-3">Logo</span>
        </div>
        <div>
          <v-icon size="195">
            {{ $icons.logo }}
          </v-icon>
        </div>
      </v-col>
      <v-col cols="auto">
        <div class="my-3">
          <span class="app-heading-1 ml-3">Icon</span>
        </div>
        <div>
          <v-icon size="59">
            {{ $icons.icon }}
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <span class="app-heading-1 ml-3">Negative</span>
    </v-row>
    <v-row class="darkBg" justify="space-around">
      <v-col cols="auto">
        <div class="my-3">
          <span class="app-heading-1 ml-3 white--text">Logo</span>
        </div>
        <div>
          <v-icon size="195">
            {{ $icons.logoNegative }}
          </v-icon>
        </div>
      </v-col>
      <v-col cols="auto">
        <div class="my-3">
          <span class="app-heading-1 ml-3 white--text">Icon</span>
        </div>
        <div>
          <v-icon size="59">
            {{ $icons.iconNegative }}
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.darkBg {
  background-color: #16222c;
}
</style>
