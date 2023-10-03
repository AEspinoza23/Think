<template>
  <v-row>
    <v-col>
      <v-row class="mt-3">
        <span class="app-heading-1 ml-3">Primary</span>
      </v-row>
      <v-row>
        <v-col cols="auto" class="app-body-small">
          <v-card class="primary rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Base</div>
          <div>#00BBBF</div>
          <div class="my-1">rgba( 0,187,191 )</div>
          <div>Class = "primary"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="primaryOne rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Variant 1</div>
          <div>#33C9CC</div>
          <div class="my-1">rgba( 51, 201, 204 )</div>
          <div>Class = "primaryOne"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="primaryTwo rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Variant 2</div>
          <div>#80DDDF</div>
          <div class="my-1">rgba( 128, 221, 223 )</div>
          <div>Class = "primaryTwo"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="primaryThree rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">variant 3</div>
          <div>#009699</div>
          <div class="my-1">rgba( 0, 150, 153 )</div>
          <div>Class = "primaryThree"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="primaryFour rounded-lg" height="70" width="70"></v-card>
          <div class="my-1"></div>
          <div>#007073</div>
          <div class="my-1">rgba( 0, 112, 115 )</div>
          <div>Class = "primaryFour"</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Primary'
}
</script>

<style></style>
