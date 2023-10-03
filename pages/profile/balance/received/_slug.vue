<template>
  <div>
    <!-- Balance received -->
    <profile-balance-received />
    <!-- Balance received info -->
    <profile-balance-received-info />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BalanceGained',
  computed: {
    ...mapGetters({})
  },
  mounted() {
    const loggedIn = this.$auth.loggedIn
    this.$headerConfig(
      {
        showTypes: true,
        isOffers: true,
        isBack: true,
        isTitle: true,
        title: 'Saldo recibido',
        isNotification: true,
      },
      loggedIn
    )
  },
  methods: {
    ...mapActions({}),
    fetchBalance() {}
  }
}
</script>