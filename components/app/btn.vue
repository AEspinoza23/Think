<template>
  <v-btn
    dark
    :color="outlined? 'primary' : ''"
    :class="computedClass"
    :disabled="disabled"
    :loading="loading"
    :outlined="outlined"
    :style="computedSize"
    :text="text"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <v-icon :class="computedText">
      {{ icon }}
    </v-icon>
    <span :class="computedText">
      <slot></slot>
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    disabled: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
    size: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: undefined },
    pressEnter: { type: Boolean, default: false }
  },
  computed: {
    computedClass() {
      if (this.disabled) {
        return ''
      } else if (this.outlined) {
        if (this.color !== undefined) {
          return `${this.color}--text`
        }
        return ''
      } else if (this.text) {
        if (this.color !== undefined) {
          return `${this.color}--text`
        }
        return 'button-text'
      } else {
        return 'button-primary shades-focus-button'
      }
    },
    computedSize() {
      if (this.size === 'x-small') {
        return { 'min-width': '120px', 'max-width': '120px', height: '36px' }
      } else if (this.size === 'small') {
        return { 'min-width': '136px', height: '36px' }
      } else if (this.size === 'medium') {
        return { 'min-width': '163px', height: '36px' }
      } else if (this.size === 'large') {
        return { 'min-width': '335px', height: '36px' }
      }
      return {}
    },
    computedText() {
      if (this.outlined) {
        if (this.disabled) {
          return 'button-outlined-disabled'
        } else {
          if (this.color !== undefined) {
            return `${this.color}--text`
          }
          return 'button-text'
        }
      } else if (this.text) {
        if (this.disabled) {
          return 'button-text-disabled'
        } else {
          if (this.color !== undefined) {
            return `${this.color}--text`
          }
          return 'button-text'
        }
      } else {
        return 'white--text'
      }
    }
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
        this.$emit('click');
      }
    },
  }
}
</script>
