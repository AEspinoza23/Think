<template>
  <v-switch
    :value="value"
    class="app-switch"
    color="primary"
    inset
    v-bind="$attrs"
    @change="$emit('change', $event)"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss"></style>
