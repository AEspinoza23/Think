<template>
  <v-app-bar flat height="43" v-bind="$attrs">
    <v-row :class="$isIOS ? 'pb-5' : ''" align="center" justify="space-between">
      <v-col class="d-flex justify-start px-0" cols="2">
        <slot name="leftAction" />
      </v-col>
      <v-col class="d-flex justify-center" cols="8">
        <slot name="title" />
      </v-col>
      <v-col class="d-flex justify-center px-0" cols="2">
        <slot name="rightAction" />
      </v-col>
    </v-row>
  </v-app-bar>
</template>
<script>
export default {
  name: 'LayoutHeader'
}
</script>
<style lang="scss"></style>
