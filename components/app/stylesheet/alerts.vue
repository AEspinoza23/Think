<template>
  <div>
    <v-row class="app-heading-1 ml-3 mt-3">Toast Alerts</v-row>
    <v-row>
      <v-col cols="6">
        <div>
          <app-alert :message="messageToast" title="Info Toast" type="info" toast />
        </div>
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageToast" title="Warning Toast" type="warning" toast />
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageToast" title="Error Toast" type="error" toast />
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageToast" title="Success Toast" type="success" toast />
      </v-col>
    </v-row>
    <v-row class="app-heading-1 ml-3">Alerts</v-row>
    <v-row>
      <v-col cols="6">
        <app-alert :message="messageAlert" type="info" />
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageAlert" type="warning" />
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageAlert" type="error" />
      </v-col>
      <v-col cols="6">
        <app-alert :message="messageAlert" type="success" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'StylesheetAlerts',
  data: () => ({
    messageAlert: 'Esto es una notificación informativa',
    messageToast: 'Esto es un ejemplo de notificación informativa en forma de tostada'
  })
}
</script>