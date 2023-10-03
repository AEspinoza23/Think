<template>
  <div class="pa-4">
    <v-row justify="center" align="center" class="pt-4">
      <v-img min-width="134px" max-width="134px" :src="$assets.mapPoint" />
    </v-row>
    <v-row justify="center" class="app-display-1-bold">
      <div class="text-center">
        Ponte en el mapa
      </div>
    </v-row>
    <v-row justify="center" class="mt-6 pb-4">
      <div class="px-4">
        <span class="app-body-medium">
          Estos datos serán los que te sitúen en el mapa para que todos puedan encontrarte
        </span>
      </div>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pb-0">
        <app-text-field
          :error-messages="errorMessages.street"
          :label="'Nombre vía*'"
          :rules="[rules.required]"
          placeholder="Calle"
          @input="$emit('edit', { val: $event, key: 'street', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          v-model="searchData.street"
          :error-messages="errorMessages.number"
          :label="'Número*'"
          :rules="[rules.required]"
          placeholder="8"
          @input="$emit('edit', { val: $event, key: 'number', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.block"
          :label="'Bloque'"
          :type="'number'"
          placeholder="3"
          @input="$emit('edit', { val: $event, key: 'block', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.portal"
          :label="'Portal'"
          placeholder="2"
          @input="$emit('edit', { val: $event, key: 'portal', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.stair"
          :label="'Escalera'"
          :type="'number'"
          @input="$emit('edit', { val: $event, key: 'stair', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.floor"
          :label="'Planta'"
          :type="'number'"
          placeholder="2"
          @input="$emit('edit', { val: $event, key: 'floor', address: true })"
        />
      </v-col>
      <v-col class="py-0">
        <app-text-field
          :error-messages="errorMessages.door"
          :label="'Puerta'"
          placeholder="3"
          @input="$emit('edit', { val: $event, key: 'door', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0" cols="6">
        <app-text-field
          v-model="searchData.postalCode"
          :error-messages="errorMessages.postal_code"
          :label="'CP'"
          placeholder="30848"
          @input="$emit('edit', { val: $event, key: 'postal_code', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          v-model="searchData.state"
          :error-messages="errorMessages.state"
          :label="'Provincia*'"
          :rules="[rules.required]"
          placeholder="Valencia"
          @input="$emit('edit', { val: $event, key: 'state', address: true })"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <app-text-field
          v-model="searchData.city"
          :error-messages="errorMessages.city"
          :label="'Ciudad*'"
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
                :error-messages="errorMessages.tag"
                :label="'Identificador*'"
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
import Form from '~/mixins/form'
import endpoint from '~/endpoints';
const { apiUtils } = endpoint;

export default {
  name: 'CommerceInfo',
  mixins: [Form], 
  props: {
    errorMessages: { type: Array, default: () => [] },
    data: { type: Object, default: () => {} }
  },
  data:() => ({
    timer: null,
    searchData: {
      postalCode: '',
      state: '',
      city: ''
    }
  }),
  watch: {
    'searchData.postalCode'(newVal, oldVal) {
      if (newVal !== oldVal)
        this.searchPlace(this.searchData);
    },
    'searchData.state'(newVal, oldVal) {
      if (newVal !== oldVal)
        this.searchPlace(this.searchData);
    },
    'searchData.city'(newVal, oldVal) {
      if (newVal !== oldVal)
        this.searchPlace(this.searchData);
    }
  },
  methods: {
    searchPlace({ postalCode, state, city }) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(async () => {
        try {
          const url = apiUtils.places.search({
            country: "España",
            postalcode: postalCode,
            state,
            city
          });
          const { data } = await this.$api({
            method: 'GET',
            url,
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
          const obj = data[0];
          if (obj && obj.lat && obj.lon) {
            this.$emit('changeLatLng', { lat: obj.lat, lng: obj.lon});
          }
        } catch (e) {
          console.warn('error en la busqueda de lugares', e);
        }
      }, 1000);
    },
  }
}
</script>