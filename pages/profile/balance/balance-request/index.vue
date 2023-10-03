<template>
  <v-form
    ref="form"
    v-model="form"
    lazy-validation
  >
    <v-row>
      <v-img
        height="170px"
        :lazy-src="$assets.balance"
        :src="$assets.balance"
      >
        <v-row justify="center" class="app-heading-1-bold mt-6 white--text">
          Tu saldo
        </v-row>
        <v-row 
          v-if="userBalance.current_balance_amount" 
          justify="center" 
          class="app-great-bold white--text"
        >
          {{ userBalance.current_balance_amount | appCurrency }}
        </v-row>
        <v-row v-else justify="center" class="app-great-bold white--text">
          {{ 0 | appCurrency }}
        </v-row>
        <v-row justify="center" class="app-body-small white--text">
          Total Saldo Disponible
        </v-row>
      </v-img>
    </v-row>
    <v-row justify="center" class="mb-2" style="margin-top: -30px">
      <v-card
        :width="$vuetify.breakpoint.width"
        class="shades-small-card backColor"
        rounded="lg"
      >
        <v-card-title>
          <div>
            <span
              v-if="$auth.$state.user.profile === 6"
              class="app-heading-1-bold title--text"
            >
              Solicitar abono
            </span>
            <span v-else class="app-heading-1-bold title--text">
              Solicitar saldo
            </span>
          </div>
          <div 
            class="app-body-medium title--text mt-2" 
            :style="{'word-break': 'normal'}"
          >
            A continuación añade el importe que deseas abonar:
          </div>
        </v-card-title>
        <v-card-text>
          <app-text-field
            :error-messages="errorMessages.amount"
            :rules="[rules.required]"
            :label="'Cantidad solicitada'"
            placeholder="0,00 €"
            suffix="€"
            :type="'number'"
            @input="edit($event, 'amount')"
          />
          <app-text-field
            v-mask="'AA ## #### #### ## ##########'"
            class="mt-2"
            :error-messages="errorMessages.iban"
            :rules="[rules.required]"
            :label="'IBAN'"
            placeholder="ES 00 0000 0000 00 0000000000"
            @input="edit($event, 'iban')"
          />
          <app-text-field
            class="mt-2"
            :error-messages="errorMessages.account_owner"
            :rules="[rules.required]"
            :label="
              $auth.$state.user.profile !== 6
              ?'Nombre y apellidos del titular de la cuenta' 
              : 'Nombre de empresa'
            "
            :placeholder="
              $auth.$state.user.profile !== 6
              ?'Nombre y apellidos' 
              : 'Razón Social'
            "
            @input="edit($event, 'account_owner')"
          />
          <v-row no-gutters class="mt-2">
            <v-col cols="auto">
              <app-select
                :error-messages="errorMessages.document_type"
                :items="setSelect('documentType')"
                :rules="[rules.required]"
                :label="'Doc identidad del titular'"
                placeholder="Tipo de documento"
                no-translate
                small
                @input="edit($event, 'document_type')"
              />
            </v-col>
            <v-col>
              <app-text-field
                 class="mt-5"
                :error-messages="errorMessages.document_number"
                :rules="[rules.required, documentCheck]"
                placeholder="49837585H"
                @input="edit($event, 'document_number')"
              />
            </v-col>
          </v-row>
          <div class="d-flex justify-center mt-4">
            <app-btn 
              size="medium" 
              :loading="loading" 
              @click="requestDialog()"
            >
              Solicitar
            </app-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog" >
      <v-card color="backColor" rounded="lg">
        <v-card-title>
          <div class="d-flex justify-space-around align-center">
            <v-col cols="auto" class="title--text app-body-large-bold pa-0 mt-4">
              Confirmar solicitud de abono
            </v-col>
            <v-col cols="auto" class="pa-0 ml-4">
              <v-icon size="40" @click="dialog = false">mdi-close</v-icon>
            </v-col>
          </div>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-row no-gutters class="app-body-medium title--text mb-3">
            Por favor, confirma que los datos son correctos: 
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-body-medium title--text">
              Cantidad solicitada:
            </v-col>
            <v-col cols="12">
              <span class="app-body-medium-bold title--text">
                {{ formData.amount | appCurrency }}
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-3">
            <v-col cols="12" class="app-body-medium title--text">
              IBAN
            </v-col>
            <v-col cols="12">
              <span class="app-body-medium-bold title--text">
                {{ formData.iban }}
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="app-body-medium title--text">
              Nombre y apellidos del titular de la cuenta
            </v-col>
            <v-col cols="12">
              <span class="app-body-medium-bold title--text">
                {{ formData.account_owner }}
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters class="my-3">
            <v-col cols="12" class="app-body-medium title--text">
              Doc. identidad del titular
            </v-col>
            <v-col cols="12">
              <span class="app-body-medium-bold title--text">
              {{ documentName }}  {{ formData.document_number }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-row justify="center" no-gutters>
            <app-btn size="medium" :loading="loading" @click="request()">
              Confirmar
            </app-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Form from '~/mixins/form'
import DocumentType from '~/constants/users/document_type'

export default {
  mixins: [Form],
  layout: 'app',
  data: () => ({
    form: true,
    loading: false,
    dialog: false,
    formData: {},
    types: DocumentType,
    errorMessages: {}
  }),
  computed: {
    ...mapGetters({
      userBalance: 'user/userBalance'
    }),
    documentName() {
      if (this.formData.document_type) {
        const index = this.types.findIndex(({ value }) => value === this.formData.document_type);
        return this.types[index].text;
      }
      return '';
    }
  },
  methods: {
    ...mapActions({
      requestBalance: 'user/requestBalance'
    }),
    documentCheck() {
      const dniRegex = /^(\d{8})([A-Z])$/;
      const cifRegex = /([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
      const nieRegex = /[XYZ]\d{7,8}[A-Z]$/;

      let result = true;
      if (this.formData.identity_document === 1) {
        result =
          dniRegex.test(this.formData.document_number) ||
          this.$t('profile.dni');
      } else if (this.formData.identity_document === 2) {
        result =
          nieRegex.test(this.formData.document_number) ||
          this.$t('profile.nie');
      } else if (this.formData.identity_document === 3) {
        result =
          cifRegex.test(this.formData.document_number) ||
          this.$t('profile.cif');
      }
      return result;
    },
    edit(val, key) {
      this.formData[key] = val;
      this.errorMessages[key] = '';
    },
    requestDialog() {
      if (this.$refs.form.validate()) {
        this.dialog = true;
      }
    },
    async request() {
      this.loading = true;
      this.formData.iban = this.formData.iban.replaceAll(' ', '');
      const info = this.formData;
      info.iban = info.iban.replaceAll(' ', '');
      const { success, data } = await this.requestBalance(info);
      if (success) {
        this.$flash({
          message: data.details,
          color: 'success',
          type: 'success'
        });
        await this.$router.push(this.localePath('profile-balance'));
      } else {
        this.$flash({
          message: data.details,
          color: 'error',
          type: 'error'
        });
      }
      this.loading = false;
    }
  }
}
</script>