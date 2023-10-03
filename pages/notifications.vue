<template>
  <div>
    <notifications-list />
    <notifications-dialog />
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  layout: 'app',
  data: () => ({
    oldData: true
  }),
  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: this.$t('notifications.title'),
      isOptions: true,
      isBack: true,
      isNotificationSearch: true
    }, true)
  }
}
</script>
