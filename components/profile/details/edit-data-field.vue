<template>
  <v-dialog
    v-model="dialogValue"
    :width="$vuetify.breakpoint.width"
    class="backColor"
    fullscreen
    hide-overlay
    scrollable
    transition="slide-x-reverse-transition"
  >
    <template #activator="{ on, attrs }">
      <slot :changeDialogValue="changeDialogValue" name="activator" v-bind="attrs" v-on="on" />
    </template>
    <v-card :height="$vuetify.breakpoint.height" class="pb-0 backColor">
      <div
        :class="$isIOS ? 'mt-9' : ''" 
        class="px-4 align-center d-flex justify-space-between" 
        :style="{height: '40px'}
      ">
        <v-btn icon text @click="save">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="app-body-large">{{ dialogName }}</span>
        <app-notifications
          :notifications="headerConfig.notificationsNumber"
        />
      </div>
      <v-card-text class="shades-general backColor rounded-lg mt-5">
        <v-form ref="form" v-model="form" lazy-validation>
          <slot :edit="edit" name="editFields" />
        </v-form>
      </v-card-text>
      <v-sheet
        :width="$vuetify.breakpoint.width"
        class="shades-general rounded-lg d-flex align-center justify-center pb-5 card"
        height="auto"
        style="z-index: 99"
      >
        <v-row class="ma-0">
          <v-col v-if="canErase" class="d-flex justify-center">
            <app-btn
              class="medium"
              color="primary"
              outlined
              size="medium"
              @click="deleteData"
            >
              Eliminar
            </app-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileDetailsEditDataField',
  props: {
    dialog: { type: Boolean, default: null },
    dialogName: { type: String, default: '' },
    isPassword: { type: Boolean, default: false },
    type: { type: String, default: '' },
    canErase: { type: Boolean, default: false },
    isUpdateAddress: { type: Boolean, default: false },
    isNewAddress: { type: Boolean, default: false },
    commerce: { type: Boolean, default: false },
    addressId: { type: Number, default: 0 }
  },

  data() {
    return {
      dialogValue: false,
      form: null
    }
  },
  computed: {
    ...mapGetters({
      headerConfig: 'app/headerConfig'
    })
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.dialogValue = val
      }
    }
  },
  methods: {
    changeDialogValue() {
      if (this.dialogValue === true && this.isNewAddress) {
        this.$refs.form.reset();
      }
      this.dialogValue = !this.dialogValue
    },
    async save() {
      try {
        if (this.$refs.form.validate()) {
          if (this.isPassword) {
            await this.$emit('save', true)
          } else if (this.isUpdateAddress && this.addressId) {
            await this.$emit('save', {
              isUpdateAddress: true,
              id: this.addressId
            })
          } else {
            await this.$emit('save', false)
            if (this.isNewAddress) {
              this.$refs.form.reset();
            }
          }
        }
        this.dialogValue = !this.dialogValue
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      const type = this.type
      this.$refs.form.reset();
      await this.$emit('delete', type)
    },
    edit(val, key) {
      const object = {}
      object[key] = val
      this.$emit('edit', object)
    }
  }
}
</script>

<style scoped></style>
