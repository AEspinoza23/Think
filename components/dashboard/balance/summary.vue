<template>
  <v-row justify="space-between" no-gutters class="mt-2">
    <v-col cols="auto">
      <v-sheet 
        min-width="100px"
        max-width="100px"
        min-height="80px"
        max-height="80px"
        color="#80DDDF" 
        rounded="lg"
        dark
        class="pa-2"
      >
      <v-row no-gutters justify="end" class="mt-2">
          <v-col cols="auto" class="app-body-exlarge-bold">
            {{ balance.current_balance_amount | appCurrency }}
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between" class="mt-1">
          <v-col cols="auto">
            <v-icon size="19">{{ $icons.savedEuros }}</v-icon>
          </v-col>
          <v-col cols="auto" class="app-body-small-bold text-right">
            <div>Importe</div>
            <div>disponible</div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="auto">
      <v-sheet 
        min-width="100px"
        max-width="100px"
        min-height="80px"
        max-height="80px"
        color="#009699" 
        rounded="lg"
        dark
        class="pa-2"
      >
      <v-row no-gutters justify="end" class="mt-2">
          <v-col cols="auto" class="app-body-exlarge-bold">
            {{ balance.locked_balance_amount | appCurrency }}
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between" class="mt-1">
          <v-col cols="auto">
            <v-icon size="20">{{ $icons.securePayment }}</v-icon>
          </v-col>
          <v-col cols="auto" class="app-body-small-bold text-right">
            <div>Importe</div>
            <div>retenido</div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="auto">
      <v-sheet 
        min-width="100px"
        max-width="100px"
        min-height="80px"
        max-height="80px"
        color="#007073" 
        rounded="lg"
        dark
        class="pa-2"
      >
        <v-row no-gutters justify="end" class="mt-2">
          <v-col cols="auto" class="app-body-exlarge-bold">
            {{ balance.total_balance_amount | appCurrency }}
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between" class="mt-1">
          <v-col cols="auto">
            <v-icon size="20">{{ $icons.balance }}</v-icon>
          </v-col>
          <v-col cols="auto" class="app-body-small-bold text-right">
            <div>Saldo</div>
            <div>virtual</div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'DashboardGrow',
    props: {
      balance: { type: Object, default: () => {}}
    },
    data: () => ({})
  }
</script>