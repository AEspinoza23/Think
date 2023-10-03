<template>
  <div v-ripple class="rounded-pill pa-1 mt-4" @click="goTo()">
    <v-badge
      :content="notifications"
      :dot="notifications > 99"
      :value="number"
      bordered
      color="primaryThree"
      overlap
    >
      <!-- <client-only>
        <vue-lottie :options="defaultOptions" :height="23" :width="23" />
      </client-only> -->
      <v-icon size="25" color="primary">{{ $icons.notification }}</v-icon>
    </v-badge>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import notification from '~/assets/icons/lottie_icons/notification.json'
export default {
  name: 'Notifications',
  data: () => ({
    active: 1,
    defaultOptions: { animationData: notification, loop: false },
    animationSpeed: 1
  }),
  computed: {
    ...mapGetters({
      notifications: 'notifications/notificationNumber'
    }),
    number() {
      return this.notifications
    }
  },
  methods: {
    goTo() {
      this.$router.push(this.localePath('/notifications'))
    }
  }
}
</script>
<style lang="scss"></style>
