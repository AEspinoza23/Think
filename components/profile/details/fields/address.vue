<template>
  <div>
    <v-row class="mt-0">
      <v-col class="pb-0">
        <app-text-field
          :error-messages="errorMessages.street"
          :label="'Nombre calle*'"
          :rules="[rules.required]"
          :value="data.street"
          @input="$emit('edit', { val: $event, key: 'street' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.number"
          :label="'Número*'"
          :rules="[rules.required]"
          :value="data.number"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'number' })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.block"
          :label="'Bloque'"
          :value="data.block"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'block' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.portal"
          :label="'Portal'"
          :value="data.portal"
          @input="$emit('edit', { val: $event, key: 'portal' })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.stair"
          :label="'Escalera'"
          :value="data.stair"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'stair' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.floor"
          :label="'Planta'"
          :value="data.floor"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'floor' })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.door"
          :label="'Puerta'"
          :value="data.door"
          @input="$emit('edit', { val: $event, key: 'door' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0" cols="6">
        <app-text-field
          :error-messages="errorMessages.postal_code"
          :label="'CP'"
          :value="data.postal_code"
          @input="$emit('edit', { val: $event, key: 'postal_code' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.state"
          :label="'Provincia*'"
          :rules="[rules.required]"
          :value="data.state"
          @input="$emit('edit', { val: $event, key: 'state' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.city"
          :label="'Ciudad*'"
          :rules="[rules.required]"
          :value="data.city"
          @input="$emit('edit', { val: $event, key: 'city' })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-tooltip v-model="tooltip" top nudge-bottom="30">
          <template #activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
            >
              <app-text-field
                :error-messages="errorMessages.tag"
                :label="'Identificador*'"
                :value="data.tag"
                @input="$emit('edit', { val: $event, key: 'tag' })"
              />
            </div>
          </template>
          <span>
            El identificador es una palabra que te ayude a 
            saber qué dirección es. Ej: “Casa” u “Oficina”
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '~/mixins/form'

export default {
  name: 'Address',
  mixins: [Form],
  props: {
    errorMessages: { type: Array, default: () => [] },
    data: {
      type: Object,
      default: () => {
        return {
          street: '',
          tag: '',
          city: '',
          state: '',
          postal_code: '',
          door: '',
          floor: '',
          stair: '',
          portal: '',
          block: '',
          number: ''
        }
      }
    },
    commerce: {  type: Boolean,  default: false  }
  },
  data: () => ({
    tooltip: false
  }),
}
</script>

<style scoped></style>
