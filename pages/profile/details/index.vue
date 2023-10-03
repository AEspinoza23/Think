<template>
  <v-row no-gutters>
    <profile-details-avatar />
    <v-card :width="$vuetify.breakpoint.width" class="rounded-lg shades-general mt-3 pa-2 backColor">
      <v-card-title>
        <span class="app-body-large-bold">Datos Personales</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <!-- PIENSA USER NAME-->
            <profile-details-edit-data-field
              v-if="$auth.$state.user.profile !== 6"
              :dialog="dialog"
              dialog-name="Nombre"
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field :data="userName" :title="'Nombre'" />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-name
                  :value="{
                    first_name: userData.first_name,
                    middle_name: userData.middle_name,
                    last_name: userData.last_name
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- PIENSA SHOPS NAME -->
            <profile-details-edit-data-field
              v-if="$auth.$state.user.profile === 6"
              :dialog="dialog"
              dialog-name="Nombre"
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field
                    :data="userData.commerce.store_name"
                    :title="'Nombre'"
                    class="my-1"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-shop-name
                  :value="{
                    commerce: {
                      store_name: userData.commerce.store_name,
                      commerce_type: {
                        id: userData.commerce.commerce_type.id
                      },
                    }
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key, isCommerce = true)"
                />
              </template>
            </profile-details-edit-data-field
            >
            <!-- PIENSA SHOPS BUSINESS NAME-->
            <profile-details-edit-data-field
              v-if="$auth.$state.user.profile === 6"
              :dialog="dialog"
              dialog-name="Razón social"
              commerce
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field
                    :data="userData.commerce.social_reason"
                    :title="'Razón social'"
                    class="my-1"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-business-name
                  :value="{
                    commerce: {
                      social_reason: userData.commerce.social_reason,
                    }
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key, isCommerce = true)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- PIENSA USER DNI-->
            <profile-details-edit-data-field
              v-if="$auth.$state.user.profile !== 6"
              :dialog="dialog"
              dialog-name="Documento de Identidad"
              :can-erase="true"
              type="dni"
              @delete="deleteData"
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field
                    :data="identityDocument"
                    :title="'DNI/NIE/NIF'"
                    class="my-1"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-dni
                  :value="{
                    identity_document: userData.identity_document,
                    document_number: userData.document_number
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- PIENSA SHOPS CIF-->
            <profile-details-edit-data-field
              v-if="$auth.$state.user.profile === 6"
              :dialog="dialog"
              dialog-name="CIF"
              commerce
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field
                    :data="userData.commerce.cif"
                    :title="'CIF'"
                    class="my-1"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-cif
                  :value="{
                    document_number: userData.commerce.cif
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key, isCommerce = true)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- PHONE (GENERAL) -->
            <profile-details-edit-data-field
              :dialog="dialog"
              dialog-name="Teléfono"
              :can-erase="true"
              type="phone"
              @delete="deleteData"
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field :data="phone" :title="'Teléfono'" />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-phone
                  :value="{
                    phone_code: userData.phone_code,
                    phone_number: userData.phone_number
                  }"
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- BIRTHDAY (GENERAL) -->
            <profile-details-edit-data-field
              :dialog="dialog"
              dialog-name="Fecha de Nacimiento"
              :can-erase="true"
              type="birthday"
              @delete="deleteData"
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field
                    :data="birthDay"
                    :title="'Fecha de Nacimiento'"
                    class="my-1"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-birth-day @edit="edit($event.val, $event.key)" />
              </template>
            </profile-details-edit-data-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card :width="$vuetify.breakpoint.width" class="rounded-lg shades-general mt-3 pa-2 backColor">
      <v-card-title>
        <span class="app-body-large-bold">
          Tus direcciones
        </span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <!-- ADDRESSES-->
            <div v-for="(item, index) in userData.addresses" :key="index" class="my-1">
              <profile-details-edit-data-field
                :address-id="item.id"
                :dialog="dialog"
                :is-update-address="true"
                dialog-name="Dirección"
                @save="saveAddress"
              >
                <template #activator="{ changeDialogValue }">
                  <div>
                    <profile-details-data-field
                      :item="item"
                      :data="item.xs_address"
                      :title="item.tag"
                      address
                      @delete="deleteDirection(item.id)"
                      @change="changeDialogValue('Dirección')"
                    />
                  </div>
                </template>
                <template #editFields>
                  <profile-details-fields-address
                    :error-messages="errorMessages"
                    :data="item"
                    @edit="edit($event.val, $event.key)"
                  />
                </template>
              </profile-details-edit-data-field>
            </div>

            <!--NEW ADDRESS-->
            <profile-details-edit-data-field
              :dialog="dialog"
              dialog-name="Dirección"
              :is-new-address="true"
              @save="saveAddress"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue('Dirección')">
                  <profile-details-data-field :title="'Nueva Dirección'" />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-address
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key)"
                />
              </template>
            </profile-details-edit-data-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="$auth.$state.user.profile === 6" :width="$vuetify.breakpoint.width" class="rounded-lg shades-general mt-3 pa-2 backColor">
      <v-card-title>
        <span class="app-body-large-bold">
          Tu dirección (comercio)
        </span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
             <!-- PIENSA SHOPS ADDRESS -->
            <profile-details-edit-data-field
              :address-id="userData.commerce.address.id"
              :dialog="dialog"
              :is-update-address="true"
              dialog-name="Dirección"
              @save="saveAddress"
            >
              <template #activator="{ changeDialogValue }">
                <div>
                  <profile-details-data-field
                    :item="userData.commerce.address"
                    :data="userData.commerce.address.xs_address"
                    :title="userData.commerce.address.tag"
                    address
                    commerce
                    @delete="deleteDirection(userData.commerce.address.id)"
                    @change="changeDialogValue('Dirección')"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-address
                  :error-messages="errorMessages"
                  :data="userData.commerce.address"
                  @edit="edit($event.val, $event.key, isCommerce = true, isAddress = true)"
                />
              </template>
            </profile-details-edit-data-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card :width="$vuetify.breakpoint.width" class="rounded-lg shades-general mt-3 pa-2 backColor">
      <v-card-title>
        <span class="app-body-large-bold">Cuenta</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <!-- Email-->
            <profile-details-edit-data-field
              :dialog="dialog"
              dialog-name="Email"
              @save="saveProfile"
            >
              <template #activator="{ on }">
                <div v-on="on">
                  <profile-details-data-field
                    :data="userData.email"
                    :show-arrow="false"
                    :title="'Email'"
                  />
                </div>
              </template>
              <template #editFields>
                <profile-details-fields-email
                  :error-messages="errorMessages"
                  @edit="edit($event.val, $event.key)"
                />
              </template>
            </profile-details-edit-data-field>

            <!-- Password-->
            <profile-details-edit-data-field
              :dialog="dialog"
              dialog-name="Contraseña"
              is-password
              @save="saveProfile"
            >
              <template #activator="{ changeDialogValue }">
                <div @click="changeDialogValue">
                  <profile-details-data-field :title="'Contraseña'" class="my-1" password />
                </div>
              </template>
              <template #editFields>
                <app-password change-password is-register @input="edit($event.val, $event.key)" />
              </template>
            </profile-details-edit-data-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import Form from '~/mixins/form'

export default {
  name: 'ProfileDetails',
  mixins: [Form],
  layout: 'app',
  auth: true,
  data() {
    return {
      dialog: false,
      editedData: {},
      commerceData: {},
      errorMessages: [],
      editCommerce: false
    }
  },
  computed: {
    userData() {
      return this.$auth.$state.user || {}
    },
    userName() {
      return this.userData.first_name
        ? `${this.userData.first_name} ${this.userData.middle_name} ${this.userData.last_name}`
        : null
    },
    identityDocument() {
      return this.userData.identity_document && this.userData.document_number
        ? `${this.setSelect('documentType')[this.userData.identity_document - 1]?.text} - ${
            this.userData.document_number
          }`
        : null
    },
    phone() {
      return this.userData.phone_number
        ? `${this.userData.phone_code} ${this.userData.phone_number}`
        : null
    },
    password() {
      return Array(this.userData.password1?.length).join('**')
    },
    birthDay() {
      return this.userData.birthday
        ? this.$dateFns.format(this.userData.birthday, 'dd/MM/yyyy')
        : ''
    }
  },
  async mounted() {
    if (this.$auth.$state.user.profile === 6) {
      const clonedeep = require('lodash.clonedeep');
      this.commerceData = clonedeep(this.userData.commerce);
    }
    await this.getShopsTypes();
    // SET HEADER CONFIG FOR PAGE affiliates
    this.$headerConfig(
      {
        isBack: true,
        isTitle: true,
        title: 'Datos Personales',
        isNotification: true
      },
      true
    )
  },
  methods: {
    ...mapActions({
      getShopsTypes: 'user/getShopsTypes',
      updateProfile: 'profile/update',
      updatePassword: 'profile/updatePassword',
      createAddress: 'profile/createAddress',
      updateAddress: 'profile/updateAddress',
      deleteAddress: 'profile/deleteAddress',
      registerCommerce: 'user/createOwnCommerce'
    }),
    edit(val, key, isCommerce, isAddress) {
      if (isCommerce) {
        this.errorMessages[key] = '';
        this.commerceData[key] = val;
        this.editCommerce = true;
      } else if (isAddress && isCommerce) {
        this.errorMessages[key] = '';
        this.commerceData.address[key] = val;
        this.editCommerce = true;
      } else if (isAddress) {
        this.errorMessages[key] = '';
        this.editedData.address[key] = val;
      } else {
        this.errorMessages[key] = '';
        this.editedData[key] = val;
      }
    },
    async deleteDirection(id) {
      const { success, data } = await this.deleteAddress(id);
      if (success) {
        await this.$auth.fetchUser()
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
        this.editedData = {}
        this.dialog = false
      } else {
        const showErrorAsMessage = false;
        this.handleErrorResponse(data, showErrorAsMessage)
      }
    },
    async deleteData(type) {
      this.dialog = true
      let info = {}
      if (type === 'dni') {
        info = {
          document_number: ''
        }
      } else if (type === 'birthday') {
        info = {
          birthday: null
        }
      } else if (type === 'phone') {
        info = {
          phone_code: '',
          phone_number: ''
        }
      }
      const { success, data } = await this.updateProfile(info)
      if (success) {
        await this.$auth.setUser(data)
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
        this.dialog = false
      } else {
        const showErrorAsMessage = false;
        this.handleErrorResponse(data, showErrorAsMessage)
      }
    },
    async editOwnCommerce() {
      this.dialog = true;
      if (typeof this.commerceData.commerce_type === 'object') {
        this.commerceData.commerce_type = this.commerceData.commerce_type.id;
      }
      const info = {...this.commerceData, creation_stage: false };
      const { success, data } = await this.registerCommerce(info);
      if (success) {
        await this.$auth.fetchUser();
        this.dialog = false;
        this.editCommerce = true;
      } else {
        let showErrorAsMessage = true;
        if (data.details || data.detail || data.error) {
          showErrorAsMessage = false;
        };
        this.handleErrorResponse(data, showErrorAsMessage);
        this.errorMessages = data;
      };
    },
    async saveProfile(isPassword) {
      if (this.editCommerce) {
        await this.editOwnCommerce();
      } else {
        this.dialog = true
        const { success, data } = isPassword
          ? await this.updatePassword(this.editedData)
          : await this.updateProfile(this.editedData)
        
        if (success) {
          await this.$auth.setUser(data);
          /* this.$flash({
            message: this.$t('updateSuccess'),
            color: 'success'
          }) */
          this.editedData = {}
          this.dialog = false
          setTimeout(async () => {
            if (isPassword) {
              await this.$cookies.remove('credentials');
              await this.$auth.logout()
              await this.$router.push(this.localePath('/login'))
            }
          }, 500)
        } else if (isPassword) {
          Object.keys(data).forEach((key) => {
            this.$flash({
              message: data[key][0],
              color: 'error'
            })
          })
        } else {
          const showErrorAsMessage = false;
          this.handleErrorResponse(data, showErrorAsMessage)
        }
      }
    },
    async saveAddress(addressUpdateObject) {
      if (this.editCommerce) {
        await this.editOwnCommerce();
      } else {
        try {
          this.dialog = true
          const { isUpdateAddress, id } = addressUpdateObject
          const { success, data } = isUpdateAddress
            ? await this.updateAddress({ data: this.editedData, id })
            : await this.createAddress(this.editedData)
          if (success) {
            await this.$auth.fetchUser()
  
            this.$flash({
              message: this.$t('updateSuccess'),
              color: 'success'
            })
            this.editedData = {}
            this.dialog = false
          } else {
            let showErrorAsMessage = true
            if (data.detail || data.error) {
              showErrorAsMessage = false
            }
            this.handleErrorResponse(data, showErrorAsMessage)
            this.errorMessages = data
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
</script>

<style scoped></style>
