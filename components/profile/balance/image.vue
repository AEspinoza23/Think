<template>
  <v-row class="white--text">
    <v-img
      height="240px"
      :lazy-src="$assets.balance"
      :src="$assets.balance"
    >
      <v-row justify="center" class="app-heading-1-bold mt-6 white--text">
        {{ $t('profile.earned') }}
      </v-row>
      <v-row 
        v-if="balance.total_balance_amount" 
        justify="center" 
        class="app-great-bold white--text"
      >
        {{ balance.total_balance_amount | appCurrency }}
      </v-row>
      <v-row v-else justify="center" class="app-great-bold white--text">
        {{ 0 | appCurrency }}
      </v-row>
      <v-row justify="center" class="app-body-small white--text">
        {{ $t('profile.virtual') }}
      </v-row>
      <v-row justify="center" class="app-body-medium-bold mt-8 white--text">
        <div>
          Como franquiciado hubieras 
          <span class="white primary--text" :style="{'border': '1px solid #FFF'}">
            ganado {{ balance.franchised_balance | appCurrency }}
          </span>
        </div>
      </v-row>
      <v-row justify="center" class="app-body-medium-bold py-2 mx-6 mt-2" no-gutters>
        <app-btn block @click="openLink">
          Quiero saber más
        </app-btn>
      </v-row>
    </v-img>
  </v-row>
</template>

<script>
export default {
  props: {
    balance: { type: Object, default: () => {}}
  },
  methods: {
    openLink() {
      window.open('https://piensanetwork.com/franquicia-piensa', '_blank');
    }
  }
}
</script>
