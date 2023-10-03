<template>
  <div>
    <v-row class="mt-0">
      <v-col>
        <span>CIF*</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 pl-0">
        <app-text-field
          :value="value.document_number"
          :error-messages="errorMessages.document_number"
          :rules="[rules.required, documentCheck]"
          @input="changeValue($event,'cif')"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'DNI',
  mixins: [Form],
  props: {
    errorMessages: { type: Array, default: () => [] },
    value: {
      type: Object,
      default: () => {
        return {
          identity_document: '',
          document_number: ''
        }
      }
    }
  },
  data: () => ({
    model: {
      document_number: '',
      identity_document: ''
    }
  }),
  mounted() {
    this.model.document_number = this.value.document_number;
    this.model.identity_document = this.value.identity_document;
  },
  methods: {
    documentCheck() {
      const dniRegex = /^(\d{8})([A-Z])$/;
      const cifRegex = /([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
      const nieRegex = /[XYZ]\d{7,8}[A-Z]$/;

      let result = true;
      if (this.model.identity_document === 1) {
        result =
          dniRegex.test(this.model.document_number) ||
          this.$t('profile.dni');
      } else if (this.model.identity_document === 2) {
        result =
          nieRegex.test(this.model.document_number) ||
          this.$t('profile.nie');
      } else if (this.model.identity_document === 3) {
        result =
          cifRegex.test(this.model.document_number) ||
          this.$t('profile.cif');
      }
      return result;
    },
    changeValue(val, key) {
      this.model[key] = val;
      this.$emit('edit', { val, key });
    }
  }
}
</script>

<style scoped></style>
