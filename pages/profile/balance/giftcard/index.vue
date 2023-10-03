<template>
  <div>
    <!-- Card -->
    <profile-balance-giftcard-card />

    <!-- Address Formulary -->
    <profile-balance-giftcard-addressForm />

    <!-- User Data -->
    <profile-balance-giftcard-userInfo />
  </div>
</template>

<script>
export default {
  name: 'ProfileBalance',
  layout: 'app',
  mounted() {
    // SET HEADER CONFIG FOR PAGE AFFILIATES
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: this.$t('profile.titleTwo'),
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
  }
}
</script>
