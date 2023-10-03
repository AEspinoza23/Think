<template>
  <v-row class="mt-0">
    <v-col>
      <app-text-field
        :error-messages="errorMessages.email"
        :label="'Email'"
        type="email"
        :rules="[rules.required, rules.email]"
        @input="$emit('edit', { val: $event, key: 'email' })"
      />
    </v-col>
  </v-row>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'Email',
  mixins: [Form],
  props: {
    errorMessages: { type: Array, default: () => [] }
  }
}
</script>

<style scoped></style>
