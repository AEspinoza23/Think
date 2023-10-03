<template>
  <v-row>
    <v-col>
      <forgot-form :query-data="$route.query" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Verified',
  layout: 'login',
}
</script>
