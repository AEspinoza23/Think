<template>
  <div>
    <v-row align="center" class="position" justify="center">
      <v-col cols="auto">
        <v-img :src="$assets.checksearch" :style="imgStyle" class="mt-16" min-width="300" />
      </v-col>
    </v-row>
   
    <v-row justify="center" no-gutters>
      <v-col cols="auto" lg="4">
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="11">
            <span class="app-display-1-bold white--text">
              Prepara tus facturas
            </span>
            <br />
            <span class="app-body-large white--text">
              Necesitamos estos datos para que se
            </span>
            <span class="app-body-large-bold white--text">
              reflejen en las facturas
            </span>
            <span class="app-body-large white--text">
              que se nos enviarán automáticamente y que así puedas cobrarlas. 
            </span>
          </v-col>
        </v-row>
        <v-row class="pl-1">
          <v-col class="d-flex justify-center">
            <div class="boxRegister boxBackground pa-5">
              <v-row no-gutters>
                <v-col cols="12">
                  <app-text-field
                    :error-messages="errorMessages.street"
                    :label="'Razón social'"
                    :label-style="'black--text'"
                    placeholder="Tu nombre legal"
                    :rules="[rules.required]"
                    @input="$emit('edit', { val: $event, key: 'social_reason' })"
                  />
                  <app-text-field
                    v-model="document_number"
                    :error-messages="errorMessages.street"
                    :label="'CIF'"
                    :label-style="'black--text'"
                    placeholder="B00000000"
                    :rules="[rules.required, documentCheck]"
                    @input="$emit('edit', { val: $event, key: 'cif' })"
                  />
                  <app-text-field
                    :error-messages="errorMessages.street"
                    :label="'I.V.A.'"
                    :label-style="'black--text'"
                    placeholder="10"
                    type='number'
                    :rules="[rules.required]"
                    @input="$emit('edit', { val: $event, key: 'iva' })"
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
  computed: {
    imgStyle() {
      return { left: '120px', top: '350px' }
    }
  },
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