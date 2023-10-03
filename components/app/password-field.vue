<template>
  <div>
    <div class="d-flex justify-space-between pb-1">
      <span v-if="label" :class="labelText" class="app-body-medium">{{ label }}</span>
      <span
        v-if="recover"
        v-ripple
        class="app-body-medium black--text text-decoration-underline recover"
        @click="$emit('changeRecover')"
      >
        Olvidé la contraseña
      </span>
    </div>
    <div class="d-flex flex-column" style="width: 100%">
      <v-text-field
        :class="{
          'app-text-field__input--small': small,
          'app-text-field__input--large': large
        }"
        :dense="dense"
        :error-messages="errorMessages"
        hide-details="auto"
        :outlined="outlined"
        :placeholder="placeholder"
        :readonly="readonly"
        :rules="rules"
        :type="seePassword ? 'text' : 'password'"
        :value="value"
        class="app-text-field mb-2"
        v-bind="$attrs"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
      >
        <template #append>
          <div class="d-flex align-center" style="height: 26px">
            <v-divider class="mx-2 primary" vertical></v-divider>
            <v-btn icon @click="seePassword = !seePassword">
              <v-icon v-if="seePassword" color="primary" size="20">
                {{ $icons.see }}
              </v-icon>
              <v-icon v-else color="primary" size="20">
                {{ $icons.noSee }}
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
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    outlined: { type: Boolean, default: true },
    dense: { type: Boolean, default: true },
    small: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    rules: { type: Array, default: () => [] },
    errorMessages: { type: [String, Array], default: () => [] },
    readonly: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    recover: { type: Boolean, default: false },
    labelStyle: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    seePassword: false
  }),
  computed: {
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

<style scoped>
.recover {
  cursor: pointer;
}
</style>
