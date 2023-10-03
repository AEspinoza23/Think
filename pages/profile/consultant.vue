<template>
  <div class="background">
    <!-- Consultant info -->
    <profile-study class="mt-6"/>
    <profile-consultant-contact class="mt-1" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Consultant',
  layout: 'app',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters({})
  },
  mounted() {
    // SET HEADER CONFIG FOR PAGE affiliates
    // eslint-disable-next-line no-unused-vars
    const consultorName = ""
    this.$headerConfig({
      isBack: true,
      isTitle: true,
      title: 'Tu consultor',
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
  },
  methods: {
    ...mapActions({})
  }
}
</script>
