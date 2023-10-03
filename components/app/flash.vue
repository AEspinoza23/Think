<template>
  <v-snackbar
    v-model="show"
    :color="flash.color"
    :message="flash.message"
    :timeout="timeout"
    :title="flash.title"
    :toast="flash.toast"
    :type="flash.type"
    bottom
    class="snackbar rounded-lg"
    close-icon="mdi-close"
    elevation="24"
    outlined
    rounded="lg"
  >
    <v-icon :color="flash.color"> {{ computedIcon }}</v-icon>
    <span :class="`text--${computedTextColor}`"> {{ flash.message }} </span>
    <template #action="{ attrs }">
      <v-btn :color="computedTextColor" icon v-bind="attrs" @click="close()">
        <v-icon> mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Flash',
  data: () => ({
    timeout: 5000
  }),

  computed: {
    ...mapGetters({
      flash: 'app/flashConfig'
    }),
    show: {
      get() {
        return this.flash.show
      },
      set(show) {
        const conf = { ...this.flash, show }
        this.setFlash(conf)
      }
    },
    computedIcon() {
      if (this.flash.type === 'success') {
        return 'mdi-checkbox-marked-circle'
      } else if (this.flash.type === 'error') {
        return 'mdi-alert-octagon'
      } else if (this.flash.type === 'warning') {
        return 'mdi-alert'
      } else {
        return 'mdi-alert-circle'
      }
    },
    computedTextColor() {
      if (this.$vuetify.theme.dark) {
        return 'white'
      } else {
        return 'black'
      }
    }
  },
  methods: {
    ...mapMutations({
      setFlash: 'app/SET_FLASH_CONFIG'
    }),
    close() {
      this.setFlash({
        message: this.flash.message,
        color: this.flash.color,
        type: this.flash.type,
        show: false
      })
    }
  }
}
</script>
<style lang="scss">
.snackbar {
  .v-snack__wrapper {
    border: 2px solid currentColor;
    background-color: currentColor !important;

    &.v-sheet {
      &.v-sheet--outlined::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor !important;
        opacity: 0.5;
        border-radius: 5px;
        z-index: -1;
      }

      &.theme {
        &--dark {
          background-color: black !important;
        }

        &--light {
          background-color: white !important;
        }
      }
    }

    .v-snack__content {
      .text {
        &--black {
          color: black !important;
        }

        &--white {
          color: white !important;
        }
      }
    }
  }
}
</style>
