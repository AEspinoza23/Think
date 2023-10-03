<template>
  <v-radio :color="color" :off-icon="iconOff" v-bind="$attrs" @click="$emit('change')" />
</template>

<script>
export default {
  name: 'Radio',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconOff() {
      return this.disabled ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'
    }
  }
}
</script>

<style scoped></style>
