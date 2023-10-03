<template>
  <div>
    <!-- Services -->
    <profile-services-list />
  </div>
</template>

<script>
export default {
  name: 'ProfileServices',
  layout: 'app',
  mounted() {
    // SET HEADER CONFIG FOR PAGE AFFILIATES
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: this.$t('dashboard.services'),
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
  }
}
</script>
