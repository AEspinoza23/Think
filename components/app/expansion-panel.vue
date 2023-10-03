<template>
  <v-expansion-panel v-bind="$attrs">
    <v-expansion-panel-header>
      <v-row align="center">
        <v-col class="py-0" cols="auto">
          <div>
            <v-icon class="icon--md">{{ icon }}</v-icon>
          </div>
        </v-col>
        <v-col class="py-0">
          <span>{{ name }}</span>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-col class="px-0">
        {{ text }}
      </v-col>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'ProfileExpansionPanel',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
