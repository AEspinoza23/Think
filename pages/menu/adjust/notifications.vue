<template>
  <div class="py-3 backColor rounded-lg">
    <v-card
      :width="$vuetify.breakpoint.width"
      class="rounded-lg shades-small-card my-2"
      color="backColor"
      height="57px"
      elevation="0"
    >
      <v-row class="card mx-4 pt-3" no-gutters>
        <v-col cols="auto" class="card">
          <v-switch
            v-model="editedData.notification_settings.available_push"
            :loading="loading"
            :color="isDark? 'white' : 'primary'"
            inset
            :class="isDark? 'app-switch-dark' : 'app-switch'"
            class="mt-0 ml-9"
            @click="saveSettings()"
          ></v-switch>
        </v-col>
        <v-col class="mt-2 app-body-large" cols="auto">
          {{ $t('notifications.push') }}
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="center" class="mt-5 mx-4" no-gutters>
      <v-col cols="12">
        <v-expansion-panels class="card shades-small-card">
          <v-expansion-panel class="card mx-16">
            <v-expansion-panel-header>
              <span class="app-body-large">
                {{ $t('notifications.manage') }}
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.SYSTEM_NOTIFICATION"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.systemNotify') }}
                </v-col>
              </v-row>
              <v-divider class="blackblue" />
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.NEW_OFFER"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.newOfferAvailable') }}
                </v-col>
              </v-row>
              <v-divider class="blackblue" />
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.PROCESS_STATUS_NOTIFICATION"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.newTramit') }}
                </v-col>
              </v-row>
              <v-divider class="blackblue" />
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.FEEDBACKS"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.valorations') }}
                </v-col>
              </v-row>
              <v-divider class="blackblue" />
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.PRODUCTS_EXPIRE"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.expiringProducts') }}
                </v-col>
              </v-row>
              <v-divider class="blackblue" />
              <v-row align="center" class="ml-5">
                <v-col cols="auto">
                  <v-switch
                    v-model="notification_data.NEW_REFERRAL_NOTIFICATION"
                    :loading="loading"
                    :color="isDark? 'white' : 'primary'"
                    inset
                    :class="isDark? 'app-switch-dark' : 'app-switch'"
                    @click="saveSettings()"
                  ></v-switch>
                </v-col>
                <v-col cols="auto app-body-large">
                  {{ $t('notifications.newReferral') }}
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Notifications',
  layout: 'app',
  data: () => ({
    loading: false,
    editedData: {
      notification_settings: {}
    }
  }),
  computed: {
    ...mapGetters({
      isDark: 'app/isDark'
    }),
    notification_settings() {
      return this.$auth.$state.user.notification_settings || {}
    },
    notification_data() {
      if (this.editedData.notification_settings.available_push) {
        return this.editedData.notification_settings || {}
      }
      return false
    }
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Notificaciones',
      isNotification: true,
      isBack: true
    }, true)
    this.editedData.notification_settings = { ...this.notification_settings };
  },
  methods: {
    ...mapActions({
      updateProfile: 'profile/update'
    }),
    async saveSettings() {
      this.loading = true;
      const { success, data } = await this.updateProfile(this.editedData)
      if (success) {
        await this.$auth.setUser(data)
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
      } else {
        this.editedData.notification_settings = { ...this.notification_settings };
      }
      this.loading = false;
    }
  }
}
</script>
