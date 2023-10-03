<template>
  <v-row>
    <v-col>
      <v-row class="mt-3">
        <span class="app-heading-1 ml-3">Alerts</span>
      </v-row>
      <v-row>
        <v-col cols="auto" class="app-body-small">
          <v-card class="success rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Success</div>
          <div>#158D01</div>
          <div class="my-1">rgba( 21, 141, 1 )</div>
          <div>Class = "success"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="error rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Error</div>
          <div>#D61616</div>
          <div class="my-1">rgba( 214, 22, 22 )</div>
          <div>Class = "error"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="warning rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Warning</div>
          <div>#F37B0C</div>
          <div class="my-1">rgba( 243, 123, 12 )</div>
          <div>Class = "warning"</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
