<template>
  <div>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.checklist" :style="imgStyle" class="mt-11" min-width="370" />
      </v-col>
    </v-row>
   
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="11">
            <span class="app-display-1-bold white--text"> 
              Último repaso
            </span>
            <br />
            <span class="app-body-large white--text">
              Una última comprobación general para asegurar que todo
              está bien antes de activar tu comercio en PIENSA ubicación 
              en el mapa para que nadie se equivoque
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <div class="boxRegister boxBackground pa-5">
              <v-row no-gutters>
                <v-col cols="12">
                  <app-text-field
                    :value="data.email"
                    :error-messages="errorMessages.email"
                    :label="`${$t('login.email')}*`"
                    :label-style="'black--text'"
                    :rules="[rules.required, rules.email]"
                    type="email"
                    autocomplete="off"
                    @input="$emit('edit', { val: $event, key: 'email' })"
                  />
                </v-col>
                <v-col cols="12">
                  <app-text-field
                    :value="data.referral_code"
                    :error-messages="errorMessages.referral_code"
                    :label="`${$t('login.referCode')}`"
                    :label-style="'black--text'"
                    autocomplete="off"
                    readonly
                    @input="$emit('edit', { val: $event, key: 'referral_code' })"
                  />
                </v-col>
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
                <v-col cols="12">
                  <app-textarea
                    :value="data.description"
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
                    class="mt-1"
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
                    :value="data.street"
                    :error-messages="errorMessages.street"
                    :label="'Nombre vía*'"
                    :label-style="'black--text'"
                    :rules="[rules.required]"
                    placeholder="Calle"
                    @input="$emit('edit', { val: $event, key: 'street' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.number"
                    :error-messages="errorMessages.number"
                    :label="'Número*'"
                    :label-style="'black--text'"
                    :rules="[rules.required]"
                    :type="'number'"
                    placeholder="8"
                    @input="$emit('edit', { val: $event, key: 'number' })"
                  />
                </v-col>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.block"
                    :error-messages="errorMessages.block"
                    :label="'Bloque'"
                    :label-style="'black--text'"
                    :type="'number'"
                    placeholder="3"
                    @input="$emit('edit', { val: $event, key: 'block' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.portal"
                    :error-messages="errorMessages.portal"
                    :label="'Portal'"
                    :label-style="'black--text'"
                    placeholder="2"
                    @input="$emit('edit', { val: $event, key: 'portal' })"
                  />
                </v-col>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.stair"
                    :error-messages="errorMessages.stair"
                    :label="'Escalera'"
                    :label-style="'black--text'"
                    :type="'number'"
                    @input="$emit('edit', { val: $event, key: 'stair' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.floor"
                    :error-messages="errorMessages.floor"
                    :label="'Planta'"
                    :label-style="'black--text'"
                    :type="'number'"
                    placeholder="2"
                    @input="$emit('edit', { val: $event, key: 'floor' })"
                  />
                </v-col>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.door"
                    :error-messages="errorMessages.door"
                    :label="'Puerta'"
                    :label-style="'black--text'"
                    placeholder="3"
                    @input="$emit('edit', { val: $event, key: 'door' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0" cols="6">
                  <app-text-field
                    :value="data.postal_code"
                    :error-messages="errorMessages.postal_code"
                    :label="'CP'"
                    :label-style="'black--text'"
                    placeholder="30848"
                    @input="$emit('edit', { val: $event, key: 'postal_code' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.state"
                    :error-messages="errorMessages.state"
                    :label="'Provincia*'"
                    :label-style="'black--text'"
                    :rules="[rules.required]"
                    placeholder="Valencia"
                    @input="$emit('edit', { val: $event, key: 'state' })"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <app-text-field
                    :value="data.city"
                    :error-messages="errorMessages.city"
                    :label="'Ciudad*'"
                    :label-style="'black--text'"
                    :rules="[rules.required]"
                    placeholder="Paterna"
                    @input="$emit('edit', { val: $event, key: 'city' })"
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
                          :value="data.tag"
                          :error-messages="errorMessages.tag"
                          :label="'Identificador*'"
                          :label-style="'black--text'"
                          placeholder="Casa / Oficina / Otro"
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
      return { left: '125px', top: '200px' }
    },
    documentCheck() {
      const cifRegex = /([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

      let result = true;
      result =
        cifRegex.test(this.data.cif) ||
        this.$t('profile.cif');
      return result;
    }
  },
}
</script>

<style>
</style>
