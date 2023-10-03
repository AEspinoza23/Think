<template>
  <v-list-item class="shades-small-card rounded-lg" v-bind="$attrs">
    <v-list-item-content>
      <v-list-item-title class="text-h5">
        <v-row>
          <v-col v-if="name" cols="6">
            <v-icon v-if="icon" class="icon--lg">{{ icon }}</v-icon>
            <span v-if="name" class="app-body-large">{{ name | shortenWord(27) }}</span>
          </v-col>
          <v-col cols="4">
            <span class="app-body-large">{{ data | shortenWord(13) }}</span>
          </v-col>
          <v-col v-if="iconRight" cols="2">
            <v-icon>{{ iconRight }}</v-icon>
          </v-col>
        </v-row>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    data: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
