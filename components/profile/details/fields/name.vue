<template>
  <v-row class="mt-0">
    <v-col>
      <app-text-field
        :error-messages="errorMessages.first_name"
        :label="$t('login.name')"
        :rules="[rules.required]"
        :value="value.first_name"
        @input="$emit('edit', { val: $event, key: 'first_name' })"
      />
      <app-text-field
        :rules="[rules.required]"
        :error-messages="errorMessages.middle_name"
        :value="value.middle_name"
        label="Primer Apellido"
        @input="$emit('edit', { val: $event, key: 'middle_name' })"
      />
      <app-text-field
        :rules="[rules.required]"
        :error-messages="errorMessages.last_name"
        :value="value.last_name"
        label="Segundo Apellido"
        @input="$emit('edit', { val: $event, key: 'last_name' })"
      />
    </v-col>
  </v-row>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'Name',
  mixins: [Form],
  props: {
    errorMessages: { type: Array, default: () => [] },
    value: {
      type: Object,
      default: () => {
        return {
          first_name: '',
          middle_name: '',
          last_name: ''
        }
      }
    }
  }
}
</script>

<style scoped></style>
