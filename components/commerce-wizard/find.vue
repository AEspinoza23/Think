<template>
  <div class="px-4">
    <v-row justify="center" align="center" class="pt-4">
      <v-img max-width="86" min-width="86" :src="$assets.shopSearch" />
    </v-row>
    <v-row justify="center" class="app-display-1-bold">
      <div class="text-center">
        Haz que te encuentren
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="px-4">
        <span class="app-body-medium">
          Usaremos estos datos para
        </span>
        <span class="app-body-medium-bold">
          potenciar tu perfil,
        </span>
        <span class="app-body-medium">
          conseguir que más gente
        </span>
        <span class="app-body-medium-bold">
          te encuentre
        </span>
        <span class="app-body-medium">
          y que
        </span>
        <span class="app-body-medium-bold">
          lleguen a tu comercio.
        </span>
      </div>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <app-text-field
          :error-messages="errorMessages.street"
          :label="'Nombre de comercio*'"
          :rules="[rules.required]"
          @input="$emit('edit', { val: $event, key: 'store_name' })"
        />
      </v-col>
      <v-col cols="12">
        <app-select
          v-model="type"
          :error-messages="errorMessages.commerce_type"
          :rules="[rules.required]"
          :items="list"
          item-text="name"
          item-value="id"
          no-computed
          :label="'Tipo de comercio*'"
          no-translate
          @input="$emit('edit', { val: $event, key: 'commerce_type' })"
        />
      </v-col>
      <v-col cols="12" class="mt-2">
        <app-textarea
          :error-messages="errorMessages.description"
          :label="'Descripción'"
          :rows="1"
          :placeholder="'Describe tu comercio con lo que ofreces a los clientes'"
          @input="$emit('edit', { val: $event, key: 'description' })"
        />
      </v-col>
      <v-col cols="12">
        <app-textarea
          :error-messages="errorMessages.meta_description"
          :label="'Metadescripción'"
          :counter="200"
          :rows="1"
          :placeholder="'Escribe separado por comas algunas palabras que te definan. Ej: pan, material escolar, prensa'"
          @input="$emit('edit', { val: $event, key: 'meta_description' })"
        />
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
    errorMessages: { type: Array, default: () => [] }
  },
  data:() => ({
    type: ''
  }),
  computed: {
    ...mapGetters({
      shopsTypes: 'user/shopsTypes'
    }),
    list() {
      return this.shopsTypes.results;
    }
  }
}
</script>
