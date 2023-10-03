<template>
  <div class="pa-4">
    <v-row justify="center" align="center" class="pt-4">
      <v-img min-width="134px" max-width="134px" :src="$assets.checklist" />
    </v-row>
    <v-row justify="center" class="app-display-1-bold mt-6">
      <div class="text-center">
        Último repaso
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="px-4">
        <span class="app-body-medium">
          Una última comprobación general para asegurar que 
          todo está bien antes de activar tu comercio en PIENSA
        </span>
      </div>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <app-text-field
          :value="data.store_name"
          :error-messages="errorMessages.store_name"
          :label="'Nombre de comercio*'"
          :label-style="'black--text'"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'store_name' })"
        />
      </v-col>
      <v-col cols="12">
        <app-select
          :value="data.commerce_type"
          :error-messages="errorMessages.commerce_type"
          :rules="[rules.required]"
          :items="list"
          item-text="name"
          item-value="id"
          no-computed
          :label-style="'black--text'"
          :label="'Tipo de comercio*'"
          no-translate
          @input="$emit('edit', { val: $event, key: 'commerce_type' })"
        />
      </v-col>
      <v-col cols="12" class="mt-2">
        <app-textarea
          :value="data.description"
          :error-messages="errorMessages.description"
          :label="'Descripción'"
          :label-style="'black--text'"
          :rows="1"
          :placeholder="'Describe tu comercio con lo que ofreces a los clientes'"
          @input="$emit('edit', { val: $event, key: 'description' })"
        />
      </v-col>
      <v-col cols="12">
        <app-textarea
          :value="data.meta_description"
          :error-messages="errorMessages.meta_description"
          :label="'Metadescripción'"
          :label-style="'black--text'"
          :counter="200"
          :rows="1"
          :placeholder="'Escribe separado por comas algunas palabras que te definan. Ej: pan, material escolar, prensa'"
          @input="$emit('edit', { val: $event, key: 'meta_description' })"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <app-text-field
          :value="data.social_reason"
          :error-messages="errorMessages.social_reason"
          :label="'Razón social*'"
          :label-style="'black--text'"
          placeholder="Tu nombre legal"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'social_reason' })"
        />
        <app-text-field
          :value="data.cif"
          :error-messages="errorMessages.cif"
          :label="'CIF*'"
          :label-style="'black--text'"
          placeholder="B00000000"
          :rules="[rules.required, documentCheck]"
          @input="$emit('edit', { val: $event, key: 'cif' })"
        />
        <app-text-field
          :value="data.iva"
          :error-messages="errorMessages.iva"
          :label="'I.V.A.*'"
          :label-style="'black--text'"
          placeholder="10%"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'iva' })"
        />
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pb-0">
        <app-text-field
          :value="data.address.street"
          :error-messages="errorMessages.street"
          :label="'Nombre vía*'"
          :label-style="'black--text'"
          :rules="[rules.required]"
          placeholder="Calle"
          @input="$emit('edit', { val: $event, key: 'street', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.number"
          :error-messages="errorMessages.number"
          :label="'Número*'"
          :label-style="'black--text'"
          :rules="[rules.required]"
          placeholder="8"
          @input="$emit('edit', { val: $event, key: 'number', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.block"
          :error-messages="errorMessages.block"
          :label="'Bloque'"
          :label-style="'black--text'"
          :type="'number'"
          placeholder="3"
          @input="$emit('edit', { val: $event, key: 'block', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.portal"
          :error-messages="errorMessages.portal"
          :label="'Portal'"
          :label-style="'black--text'"
          placeholder="2"
          @input="$emit('edit', { val: $event, key: 'portal', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.stair"
          :error-messages="errorMessages.stair"
          :label="'Escalera'"
          :label-style="'black--text'"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'stair', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.floor"
          :error-messages="errorMessages.floor"
          :label="'Planta'"
          :label-style="'black--text'"
          :type="'number'"
          placeholder="2"
          @input="$emit('edit', { val: $event, key: 'floor', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.door"
          :error-messages="errorMessages.door"
          :label="'Puerta'"
          :label-style="'black--text'"
          placeholder="3"
          @input="$emit('edit', { val: $event, key: 'door', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0" cols="6">
        <app-text-field
          :value="data.address.postal_code"
          :error-messages="errorMessages.postal_code"
          :label="'CP'"
          :label-style="'black--text'"
          placeholder="30848"
          @input="$emit('edit', { val: $event, key: 'postal_code', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.state"
          :error-messages="errorMessages.state"
          :label="'Provincia*'"
          :label-style="'black--text'"
          :rules="[rules.required]"
          placeholder="Valencia"
          @input="$emit('edit', { val: $event, key: 'state', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :value="data.address.city"
          :error-messages="errorMessages.city"
          :label="'Ciudad*'"
          :label-style="'black--text'"
          :rules="[rules.required]"
          placeholder="Paterna"
          @input="$emit('edit', { val: $event, key: 'city', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
            >
              <app-text-field
                :value="data.address.tag"
                :error-messages="errorMessages.tag"
                :label="'Identificador*'"
                :label-style="'black--text'"
                placeholder="Casa / Oficina / Otro"
                @input="$emit('edit', { val: $event, key: 'tag', address: true })"
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
import { mapGetters } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'CommerceInfo',
  mixins: [Form], 
  props: {
    errorMessages: { type: Array, default: () => [] },
    data: { type: Object, default: () => {} }
  },
  data:() => ({}),
  computed: {
    ...mapGetters({
      shopsTypes: 'user/shopsTypes'
    }),
    list() {
      return this.shopsTypes.results;
    },
    imgStyle() {
      return { left: '125px', top: '0px' }
    },
    documentCheck() {
      const cifRegex = /([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

      let result = true;
      result =
        cifRegex.test(this.data.cif) ||
        this.$t('profile.cif');
      return result;
    }
  }
}
</script>
