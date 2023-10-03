<template>
  <div>
    <div v-if="label">
      <span :class="`${labelText} app-body-medium`">
        {{ label }}
      </span>
    </div>
    <div class="d-flex flex-column" style="width: 100%">
      <v-select
        :class="{
          'app-select__input--small': small,
          'app-select__input--medium': medium,
          'app-select__input--large': large
        }"
        :dense="dense"
        :disabled="disabled"
        :error-messages="errorMessages"
        :items="computedItems"
        :menu-props="{ nudgeBottom: 15 + 'px', offsetY: true, rounded: 'lg' }"
        :outlined="outlined"
        :placeholder="placeholder"
        :readonly="readonly"
        :rules="rules"
        :value="value"
        hide-details="auto"
        append-icon="mdi-chevron-down"
        class="app-select"
        v-bind="$attrs"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
      >
        <template #append-outer>
          <slot name="append-outer"></slot>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    floatLabel: { type: Boolean, default: false },
    value: { type: [String, Number, Object, Array], default: '' },
    noTranslate: { type: Boolean, default: false },
    numeric: { type: Boolean, default: false },
    numericLimit: { type: [Number, String], default: 0 },
    items: { type: [Array, Object], default: () => [] },
    rules: { type: Array, default: () => [] },
    outlined: { type: Boolean, default: true },
    dense: { type: Boolean, default: true },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    errorMessages: { type: [Array, String], default: () => [] },
    readonly: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    medium: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    noComputed: { type: Boolean, default: false },
    labelStyle: {
      type: String,
      default: null
    }
  },
  computed: {
    computedItems() {
      if (!this.noComputed) {
        const result = [];
        if (this.numeric && this.numberItems) {
          return this.numberItems;
        }
        const item = { ...this.items };
        Object.keys(item).forEach((key) => {
          result.push({
            text: this.noTranslate
              ? item[key].text
              : this.$t(item[key].text),
            value: item[key].value
          });
        });
        return result;
      } else {
        return this.items
      }
    },
    labelText() {
      if (this.labelStyle) {
        return this.labelStyle
      } else {
        return 'title--text'
      }
    }
  }
}
</script>

<style lang="scss"></style>
