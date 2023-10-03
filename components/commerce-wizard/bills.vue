<template>
  <div class="pa-4">
    <v-row justify="center" align="center" class="pt-4">
      <v-img min-width="115.35px" max-width="115.35px" :src="$assets.checksearch" />
    </v-row>
    <v-row justify="center" class="app-display-1-bold">
      <div class="text-center">
        Prepara tus facturas
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="px-4">
        <span class="app-body-medium">
          Necesitamos estos datos para que se reflejen 
          en las facturas que se nos enviarán automáticamente 
          y que así puedas cobrarlas. 
        </span>
      </div>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <app-text-field
          :error-messages="errorMessages.street"
          :label="'Razón social'"
          placeholder="Tu nombre legal"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'social_reason' })"
        />
        <app-text-field
          v-model="document_number"
          :error-messages="errorMessages.street"
          :label="'CIF'"
          placeholder="B00000000"
          :rules="[rules.required, documentCheck]"
          @input="$emit('edit', { val: $event, key: 'cif' })"
        />
        <app-text-field
          :error-messages="errorMessages.street"
          :label="'I.V.A.'"
          placeholder="10%"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'iva' })"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'CommerceInfo',
  mixins: [Form], 
  props: {
    errorMessages: { type: Array, default: () => [] }
  },
  data:() => ({
    document_number: ''
  }),
  methods: {
    documentCheck() {
      const cifRegex = /([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

      let result = true;
      result =
        cifRegex.test(this.document_number) ||
        this.$t('profile.cif');
      return result;
    }
  }
}
</script>
