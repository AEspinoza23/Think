<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :content-class="
      dateTime
        ? 'app-date-piker app-date-piker--large'
        : 'app-date-piker'
    "
    top
    offset-y
    :left="left"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="computedValue"
        :class="{
          'app-text-field__input--small': small,
          'app-text-field__input--large': large
        }"
        :prepend-inner-icon="prependIcon"
        :disabled="disabled"
        :dense="dense"
        :label="label"
        :outlined="outlined"
        :rules="rules"
        :rounded="rounded"
        :placeholder="placeholder"
        :error-messages="errorMessages"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :color="color"
      no-title
      first-day-of-week="1"
      scrollable
      :allowed-dates="allowedDates"
      :max="max"
      :min="min"
      @change="saveDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: () => new Date().toISOString().substr(0, 10)
    },
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
    outlined: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
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
    },
    dateTime: { type: Boolean, default: false },
    allowedDates: { type: Function, default: null },
    min: { type: String, default: undefined },
    max: { type: String, default: undefined },
    left: { type: Boolean, default: true },
    color: { type: String, default: 'primary' },
  },
  data: () => ({
    date: null,
    menu: false
  }),
  computed: {
    labelText() {
      if (this.labelStyle) {
        return this.labelStyle
      } else {
        return 'title--text'
      }
    },
    computedValue() {
      try {
        return this.value
          ? this.$dateFns.format(this.value, 'dd/MM/yyyy')
          : null;
      } catch (error) {
        console.log(error);
      }
      return this.value;
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
        this.$emit('search');
      }
    },
    saveDate() {
      try {
        let date = this.date
        const canSave = this.tab === 1 || !this.dateTime;
        if (this.dateTime) {
          this.tab = 1;
          date = `${this.date}T${this.time}`;
        }
        if (canSave) {
          this.$refs.menu.save(date);
          this.$emit('input', date);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      -moz-appearance: textfield;
  }
</style>