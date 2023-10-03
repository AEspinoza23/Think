<template>
  <v-row>
    <v-col>
      <v-row class="mt-3">
        <span class="app-heading-1 ml-3">Secondary</span>
      </v-row>
      <v-row>
        <v-col cols="auto" class="app-body-small">
          <v-card class="title rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Title</div>
          <div>#1C2D38</div>
          <div class="my-1">rgba( 28, 45, 56 )</div>
          <div>Class = "title"</div>
        </v-col>
        <v-col cols="auto" class="app-body-small">
          <v-card class="secondary rounded-lg" height="70" width="70"></v-card>
          <div class="my-1">Secondary</div>
          <div>#817F82</div>
          <div class="my-1">rgba( 129, 127, 130 )</div>
          <div>Class = "secondary"</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Secondary'
}
</script>

<style></style>
