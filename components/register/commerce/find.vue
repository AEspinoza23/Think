<template>
  <div>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.shopSearch" :style="imgStyle" class="mt-11" min-width="430" />
      </v-col>
    </v-row>
   
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="11" class="">
            <span class="app-display-1-bold white--text"> Haz que te encuentren </span>
            <br />
            <span class="app-body-large white--text">
              Usaremos estos datos para
            </span>
            <span class="app-body-large-bold white--text">
              potenciar tu perfil,
            </span>
            <span class="app-body-large white--text">
              conseguir que más gente
            </span>
            <span class="app-body-large-bold white--text">
              te encuentre
            </span>
            <span class="app-body-large white--text"> 
              y que
            </span>
            <span class="app-body-large-bold white--text">
              lleguen a tu comercio.
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <div class="boxRegister boxBackground pa-5">
              <v-row no-gutters>
                <v-col cols="12">
                  <app-text-field
                    :error-messages="errorMessages.store_name"
                    :label="'Nombre de comercio*'"
                    :label-style="'black--text'"
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
                    :label-style="'black--text'"
                    :label="'Tipo de comercio*'"
                    no-translate
                    @input="$emit('edit', { val: $event, key: 'commerce_type' })"
                  />
                </v-col>
                <v-col cols="12">
                  <app-textarea
                    class="mt-2"
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
            </div>
          </v-col>
        </v-row>
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
    },
    imgStyle() {
      return { left: '30px', top: '300px' }
    }
  }
}
</script>