<template>
  <div>
    <div v-if="label">
      <span class="app-body-medium title--text">{{ label }}</span>
    </div>
    <div class="d-flex flex-column" style="width: 100%">
      <v-text-field
        :class="{
          'app-text-field__input--small': small,
          'app-text-field__input--large': large
        }"
        :dense="dense"
        :error-messages="errorMessages"
        :hide-details="hideDetails"
        :outlined="outlined"
        :placeholder="placeholder"
        :readonly="readonly"
        :rules="rules"
        :value="value"
        class="app-text-field-search rounded-xl"
        shaped
        v-bind="$attrs"
        @input="$emit('input', $event)"
      >
        <template #append>
          <div class="d-flex align-center" style="height: 26px">
            <v-divider class="mx-2 primary" vertical></v-divider>

            <v-btn icon x-small @click="$emit('click', $event)">
              <v-icon size="0" class="icon--md">
                {{ $iconsSvg.search }}
              </v-icon>
            </v-btn>
          </div>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped></style>
