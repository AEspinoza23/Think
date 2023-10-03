<template>
  <div style="display: contents">
    <v-checkbox
      :color="color"
      :disabled="disabled"
      :hide-details="hideDetails"
      :off-icon="iconOff"
      :on-icon="iconOn"
      :readonly="readOnly"
      :value="value"
      class="mt-0"
      v-bind="$attrs"
    >
      <template v-if="label" #label>
        <span :class="labelStyleClass" :style="labelStyle" class="app-body-large">
          {{ label }}
        </span>
      </template>
    </v-checkbox>
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    labelStyleClass: { type: String, default: '' },
    value: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    labelMaxWidth: {
      type: [Number, String],
      default: undefined
    },
    labelMinWidth: {
      type: [Number, String],
      default: undefined
    },
    color: {
      type: String,
      default: 'primary'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    status: false
  }),
  computed: {
    labelStyle() {
      return { 'min-width': this.labelMinWidth + 'px' }
    },
    iconOn() {
      return this.disabled ? 'mdi-close-box' : 'mdi-checkbox-marked-outline'
    },
    iconOff() {
      return this.disabled ? 'mdi-close-box' : 'mdi-checkbox-blank-outline'
    },
    checkStatus: {
      get() {
        return this.status
      },
      set() {
        this.status = this.value
      }
    }
  },
  methods: {
    handleChange(evt) {
      this.$emit('change', evt)
      this.$emit('input', evt)
    }
  }
}
</script>
