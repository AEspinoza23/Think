<template>
  <v-row class="mt-0">
    <v-col cols="12">
      <app-text-field
        :error-messages="errorMessages.store_name"
        :label="$t('login.name')"
        :rules="[rules.required]"
        :value="value.commerce.store_name"
        @input="$emit('edit', { val: $event, key: 'store_name' })"
      />
    </v-col>
    <v-col cols="12">
      <app-select
        :value="value.commerce.commerce_type.id"
        :error-messages="errorMessages.commerce_type"
        :rules="[rules.required]"
        :items="list"
        item-text="name"
        item-value="id"
        no-computed
        :label="'Tipo de comercio'"
        no-translate
        @input="$emit('edit', { val: $event, key: 'commerce_type' })"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
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
          first_name: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      shopsTypes: 'user/shopsTypes'
    }),
    list() {
      return this.shopsTypes.results;
    }
  }
}
</script>

<style scoped></style>
