<template>
  <div>
    <div v-if="label">
      <span :class="`${labelText} app-body-medium`">
        {{ label }}
      </span>
    </div>
    <div class="d-flex flex-column" style="width: 100%">
      <v-combobox
        :class="{
          'app-text-field__input--small': small,
          'app-text-field__input--large': large
        }"
        :dense="dense"
        :disabled="disabled"
        :clearable="clearable"
        :error-messages="errorMessages"
        hide-details="auto"
        :outlined="outlined"
        :placeholder="placeholder"
        :prepend-inner-icon="prependIcon"
        :readonly="readonly"
        :rules="rules"
        :rounded="rounded"
        :type="type"
        :value="value"
        :prefix="prefix"
        :multiple="multiple"
        :chips="chips"
        :append-icon="appendIcon"
        class="app-text-field mb-2"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
      >
        <template #selection="{ attrs, item, parent, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            :style="{ 'border-radius': '10px' }"
            color="primaryThree"
            outlined
            class="my-1"
          >
            <span class="app-body-medium">
              {{ item }}
            </span>
            <v-icon
              small
              class="icon--uxs"
              @click="parent.selectItem(item)"
            >
              {{ $iconsSvg.close }}
            </v-icon>
          </v-chip>
        </template>
      </v-combobox>
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
    type: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    outlined: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    appendIcon: {
      type: String,
      default: ''
    },
    pressEnter: { type: Boolean, default: false },
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
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: String,
      default: null
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
    window.addEventListener('keyup', this.enterBtn);
  },
  methods: {
    enterBtn(event) {
      if (event.defaultPrevented) {
        return;
      } 

      const key = event.key || event.keyCode;

      if (key === 13 || key === "Enter" && this.pressEnter) { 
        this.$emit('search');
      }
    },
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      appearance: textfield;
      -moz-appearance: textfield;
  }
</style>