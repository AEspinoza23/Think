<template>
  <v-row>
    <v-col>
      <v-row class="mt-3">
        <span class="app-heading-1 ml-3">Greys</span>
      </v-row>
      <v-row>
        <v-col cols="auto" class="app-body-small">
          <v-card class="background rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Background</div>
          <div>#F0F0F0</div>
          <div>#16222C (Dark)</div>
          <div class="my-1">rgba( 240, 240, 240 )</div>
          <div class="my-1">rgba( 22, 34, 44 )</div>
          <div>Class = "background"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="placeholderBase rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Placeholder Base</div>
          <div>#424C5A</div>
          <div class="my-1">rgba( 66, 76, 90 )</div>
          <div>
            Class = "placeholderBase" <br />
            (Dark Mode Only)
          </div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="placeholder rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">placeholder</div>
          <div>#C4C4C4</div>
          <div class="my-1">rgba( 196, 196, 196 )</div>
          <div>Class = "placeholder"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="expired rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Expired</div>
          <div>#B7B6BC</div>
          <div class="my-1">rgba( 183, 182, 188 )</div>
          <div>Class = "expired"</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
