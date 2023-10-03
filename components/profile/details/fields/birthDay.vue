<template>
  <v-row class="mt-0">
    <v-col class="pb-0" cols="auto">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        nudge-left="50"
        offset-y
        width="auto"
      >
        <template #activator="{ on, attrs }">
          <app-text-field
            :prepend-icon="'mdi-calendar'"
            :rules="[rules.required]"
            :value="date"
            label="Fecha de Nacimiento"
            small
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker
          :active-picker.sync="activePicker"
          :locale="$i18n.locale"
          :max="maxBirthdayDate"
          :min="minBirthdayDate"
          full-width
          no-title
          @change="save"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'Phone',
  mixins: [Form],
  data: () => ({
    activePicker: null,
    date: null,
    menu: false
  }),
  computed: {
    maxBirthdayDate() {
      if (this.$auth.$state.user.profile === 6) {
        return this.$dateFns.format(new Date(), "yyyy-MM-dd");
      } else {
        const maxYear = new Date().getFullYear() - 18
        const newDate = new Date(maxYear, 11, 31)
        return newDate.toISOString().substr(0, 10)
      }
    },
    minBirthdayDate() {
      return '1900-01-01'
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  mounted() {
    // this.date = this.maxBirthdayDate
  },
  methods: {
    save(date) {
      this.$refs.menu.save(this.$dateFns.format(date, 'dd/MM/yyyy'))
      this.$emit('edit', { val: date, key: 'birthday' })
    }
  }
}
</script>

<style scoped></style>
