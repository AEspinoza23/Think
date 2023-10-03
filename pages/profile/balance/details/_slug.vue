<template>
  <div class="mt-6">
    <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
      <v-row class="mx-4 py-3" justify="space-between" no-gutters>
        <v-col cols="auto" class="pb-3 app-heading-1-bold">
          Saldo recibido
        </v-col>
        <v-col cols="auto" class="pb-3 app-body-large">
          {{ $dateFns.format(details.created_at, 'dd/MM/yyyy') }}
        </v-col>
        <v-col cols="12">
          <v-sheet 
            min-width="162px" 
            min-height="82px"
            color="#009699" 
            rounded="lg"
            dark
          >
            <div class="ml-2 pt-1">
              <v-icon>{{ $icons.savedEuros }}</v-icon>
            </div>
            <div class="app-display-1-bold ml-3">
              {{ details.amount | appCurrency }}
            </div>
            <div class="app-body-small-bold ml-4">
              Saldo recibido
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="12" class="mt-5">
          <app-btn block :to="localePath('profile-balance')">
            <span class="app-body-medium"> Ver mi saldo total </span>
          </app-btn>
        </v-col>
      </v-row>
    </v-card>
    <!-- <v-card :width="$vuetify.breakpoint.width" class="backColor my-4 rounded-lg shades-general">
      hola
    </v-card> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BalanceDetails',
  layout: 'app',
  data:() => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      details: 'user/balanceDetails'
    })
  },
  async mounted() {
    this.$headerConfig({
      isTitle: true,
      title: 'Saldo recibido',
      isOptions: true,
      isBack: true,
      isNotificationSearch: true
    }, true)
    const slug = this.$route.params.slug;
    this.loading = true;
    await this.getDetails(slug);
    this.loading = false;
  },
  methods: {
    ...mapActions({
      getDetails: 'user/getBalanceDetail'
    })
  }
}
</script>