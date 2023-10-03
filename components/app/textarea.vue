<template>
  <div>
    <div v-if="label">
      <span :class="`app-body-medium ${labelText}`">{{ label }}</span>
    </div>
    <div class="d-flex flex-column" style="width: 100%">
      <v-textarea
        :counter="counter"
        :error-messages="errorMessages"
        :outlined="outlined"
        :placeholder="placeholder"
        :rules="textAreaRules"
        :value="value"
        hide-details="auto"
        auto-grow
        class="app-textarea"
        v-bind="$attrs"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
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
    },
    counter: {
      type: Number,
      default: 300
    },
    rules: {
      type: Array,
      default: () => []
    },
    labelStyle: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      textAreaRules: []
    }
  },
  computed: {
    labelText() {
      if (this.labelStyle) {
        return this.labelStyle
      } else {
        return 'title--text'
      }
    },
  },
  mounted() {
    this.textAreaRules = this.rules
  }
}
</script>

<style scoped></style>
