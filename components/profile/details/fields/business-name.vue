<template>
  <v-row class="mt-0">
    <v-col>
      <app-text-field
        :error-messages="errorMessages.social_reason"
        :label="$t('login.name')"
        :rules="[rules.required]"
        :value="value.commerce.social_reason"
        @input="$emit('edit', { val: $event, key: 'social_reason' })"
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
