<template>
  <v-row class="mt-1 mb-3" no-gutters>
    <v-card 
      :width="$vuetify.breakpoint.width" 
      rounded="lg"
      class="backColor rounded-lg shades-small-card"
    >
      <v-card-title>
        <div class="app-heading-1 ml-2 mt-2">
          {{ $t('dashboard.balance') }}
        </div>
      </v-card-title>
      <v-card-text class="my-2">
        <v-expansion-panels class="pa-0 rounded-xl" accordion multiple flat>
          <profile-balance-panel
            :title="$t('profile.virtualBalance')"
            :text="$t('profile.firstPanel')"
            :balance="balance.total_balance_amount"
          />
          <profile-balance-panel
            class="my-2"
            :title="$t('profile.available')"
            :text="$t('profile.secondPanel')"
            :balance="balance.current_balance_amount"
          />
          <profile-balance-panel
            :title="$t('profile.withheld')"
            :text="$t('profile.thirdPanel')"
            :balance="balance.locked_balance_amount"
          />
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    balance: { type: Object, default: () => {}}
  }
}
</script>
