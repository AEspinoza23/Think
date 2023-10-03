<template>
  <v-form ref="form" v-model="form" lazy-validation>
    <v-row no-gutters class="backColor pa-3 mx-2 mb-4 rounded-lg shades-general">
      <v-card 
        :width="$vuetify.breakpoint.width"
        elevation="0"
        class="backColor ma-2"
      >
        <div class=" app-heading-1-bold" no-gutters>
          Importe articulo
        </div>
        <div class="app-body-small mt-2 text-justify" no-gutters>
          ¿No lo tienes claro? Te explicamos cómo funciona esta pantalla en nuestra
          <span
            class="ml-1 text-decoration-underline"
            :style="{ cursor: 'pointer' }"
            @click="dialog = true"
          >ayuda</span>
        </div>
        <div class="app-body-small mt-4">
          Producto
        </div>
        <v-text-field
          v-model="product.description"
          class="mt-3"
          label="Concepto / Nombre producto"
          placeholder="Concepto amplio"
          hide-details="auto"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="product.amount"
          class="mt-3"
          label="Importe"
          placeholder="0,00 €"
          hide-details="auto"
          type="number"
          :rules="[rules.required]"
          suffix="€"
          outlined
        ></v-text-field>
        <!-- <v-text-field
          v-model="product.iva"
          class="mt-3"
          label="I.V.A"
          placeholder="21%"
          hide-details="auto"
          type="number"
          :rules="[rules.required]"
          suffix="%"
          outlined
        ></v-text-field> -->
      </v-card>
      <v-col cols="12" class="d-flex justify-center my-4">
        <app-btn
          :loading="loading"
          @click="checkData"
        >Continuar</app-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card color="card">
        <v-card-title>
          <v-row class="py-4" justify="space-between">
            <span class="app-heading-1 title--text ml-3">
              Instrucciones:
            </span>
            <app-btn
              class="px-0 mx-0 pb-1"
              color="title"
              icon
              rounded
              small
              text
              @click="dialog = false"
            >
              <v-icon small>
                {{ $icons.close }}
              </v-icon>
            </app-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div class="d-flex app-body-medium title--text my-1">
            <v-col cols="1">
              <v-icon size="7"> mdi-checkbox-blank-circle </v-icon>
            </v-col>
            <v-col cols="auto">
              El concepto es el nombre de la venta que verá el cliente. 
              Por ejemplo Venta material escolar
            </v-col>
          </div>
          <!-- <div class="app-body-medium title--text">
            El producto son cada tipo de producto diferente. 
            Por ejemplo, un producto podría ser bolígrafos
          </div> -->
          <div class="d-flex app-body-medium title--text my-1">
            <v-col cols="1">
              <v-icon size="7"> mdi-checkbox-blank-circle </v-icon>
            </v-col>
            <v-col cols="auto">
              El precio es la suma total del precio de cada producto
            </v-col>
          </div>
          <!-- <div class="app-body-medium title--text">
            El I.V.A es el I.V.A aplicable a ese tipo de producto.
          </div> -->
          <!-- <div class="app-body-medium title--text">
            El botón + añade un producto nuevo, por ejemplo libretra
          </div> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import Form from '~/mixins/form'
export default {
  name: 'MakeSaleAmount',
  mixins: [Form],
  data: () => ({
    form: true,
    product: {
      description: null, 
      amount: null
    },
    dialog: false,
    loading: false
  }),
  methods: {
    ...mapActions({
      createPurchase: 'user/createPurchase'
    }),
    async checkData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { success } = await this.createPurchase({ ...this.product });
        if (success) {
          this.$emit('next');
        }
        this.loading = false;
      }
    }
  }
}
</script>