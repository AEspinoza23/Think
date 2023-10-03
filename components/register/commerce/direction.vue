<template>
  <div>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.mapPoint" :style="imgStyle" class="mt-11" min-width="370" />
      </v-col>
    </v-row>
   
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="11">
            <span class="app-display-1-bold white--text">
              Ponte en el mapa
            </span>
            <br />
            <span class="app-body-large white--text">
              Estos datos serán los que te sitúen en el mapa para que todos
            </span>
            <span class="app-body-large-bold white--text">
              puedan encontrarte
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <div class="boxRegister boxBackground pa-5">
              <v-row class="mt-0">
                <v-col class="pb-0">
                  <app-text-field
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
                    :error-messages="errorMessages.number"
                    :label="'Número*'"
                    :label-style="'black--text'"
                    :rules="[rules.required]"
                    placeholder="8"
                    @input="$emit('edit', { val: $event, key: 'number' })"
                  />
                </v-col>
                <v-col class="py-0">
                  <app-text-field
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
                    :error-messages="errorMessages.portal"
                    :label="'Portal'"
                    :label-style="'black--text'"
                    placeholder="2"
                    @input="$emit('edit', { val: $event, key: 'portal' })"
                  />
                </v-col>
                <v-col class="py-0">
                  <app-text-field
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
                    v-model="searchData.postalCode"
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
                    v-model="searchData.state"
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
                    v-model="searchData.city"
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
  computed: {
    imgStyle() {
      return { left: '125px', top: '100px' }
    }
  },
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
            country: "Spain",
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
          /* const { data } = await this.$axios.get(url); */
          const obj = data[0];
          if (obj && obj.lat && obj.lon) {
            this.$emit('changeLatLng', { lat: Number(obj.lat), lng: Number(obj.lon)});
          }
        } catch (e) {
          console.warn('error en la busqueda de lugares', e);
        }
      }, 1000);
    },
  }
}
</script>

<style>
/* unvisited link */
a:link {
  color: #009699;
}

/* visited link */
a:visited {
  color: #007073;
} 
</style>
