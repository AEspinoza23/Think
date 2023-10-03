<template>
  <v-row>
    <v-col cols="auto">
      <v-slide-group :show-arrows="false" class="pa-0">
        <v-slide-item v-for="(item, index) in 6" :key="index">
          <v-col cols="4" class="">
            <v-skeleton-loader
              max-height="400"
              type="card-avatar, list-item-three-line"
            ></v-skeleton-loader>
          </v-col>
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </v-row>
</template>