<template>
  <img
    :class="{
      '': size,
      iconSize: '',
      iconSize__xs: xs,
      iconSize__sm: sm,
      iconSize__md: md,
      iconSize__lg: lg
    }"
    :src="iconSrc"
    :width="size"
    alt=""
    height="auto"
  />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconSrc: {
      type: String,
      default: ''
    },
    xs: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    },
    md: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.iconSize {
  width: 44px;
  height: auto;

  &__exs {
    width: 15px;
    height: auto;
  }

  &__xs {
    width: 24px;
    height: auto;
  }

  &__sm {
    width: 34px;
    height: auto;
  }

  &__md {
    width: 55px;
    height: auto;
  }

  &__lg {
    width: 65px;
    height: auto;
  }
}
</style>
