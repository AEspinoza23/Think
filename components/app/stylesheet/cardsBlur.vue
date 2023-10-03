<template>
  <div>
    <v-row class="mt-3">
      <span class="app-heading-1 ml-3">Cards</span>
    </v-row>
    <v-row class="bodybackground">
      <v-col cols="auto">
        <div>
          <v-card class="blur-container-card transparent rounded-lg" height="375" width="451">
            <v-card-title> </v-card-title>
          </v-card>
        </div>
        <div class="white--text app-body-medium">
          Container card blur<br />
          Class="blur-container-card transparent"
        </div>
      </v-col>
      <v-col cols="auto">
        <div>
          <v-card class="blur-mini-card transparent rounded-lg" height="163" width="107"></v-card>
        </div>
        <div class="white--text app-body-medium-bold">
          Mini card blur<br />
          Class="blur-mini-card transparent"
        </div>
      </v-col>
      <v-col cols="auto">
        <div>
          <v-card
            class="blur-container-card transparent rounded-lg"
            height="293"
            width="333"
          ></v-card>
        </div>
        <div class="white--text app-body-medium-bold">
          Special card blur<br />
          Class="blur-container-card transparent"
        </div>
      </v-col>
    </v-row>
  </div>
</template>
