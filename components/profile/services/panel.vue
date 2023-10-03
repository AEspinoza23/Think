<template>
  <v-expansion-panel class="pa-0 card rounded-lg shades-general">
    <v-expansion-panel-header class="pa-0">
      <v-row class="app-heading-1 pa-0 panelDiv" no-gutters align="center">
        <v-col cols="1" class="mx-3">
          <v-img min-width="30px" max-width="40px"  :src="icon"></v-img>
        </v-col>
        <v-col>
          {{ title }}
        </v-col>
      </v-row>
      <template #actions>
        <v-icon class="mr-3">
          $expand
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="card rounded-xl">
      <div v-if="services.length === 0" class="text-center">
        {{ $t('dashboard.none') }}
      </div>
      <v-divider></v-divider>
      <div v-for="(service, i) in services" :key="i" class="card">
        <v-row no-gutters>
          <v-col cols="2" class="">
            <v-img :src="img" :height="height(service.status)" width="40">
              <div 
                :class="`layer`" 
                :style="{ background: colorExpired(service.status === status.EXPIRED.val) }"
              ></div>
            </v-img>
          </v-col>
          <v-col cols="8" class="mt-3">
            <v-row class="app-body-large title--text" no-gutters>
              {{ service.offer.title }}
            </v-row>
            <v-row class="app-body-small secondary--text text-truncate mt-4" no-gutters>
              {{ service.resource_description }} {{ service.price | appCurrency }}
            </v-row>
            <v-row 
              :class="`app-body-small ${textCanceled(service.status)}--text mt-4`" 
              no-gutters
            >
              {{ service.resource }}
            </v-row>
            <v-row 
              v-if="canceled(service.status)" 
              class="app-body-small red--text text-truncate mt-4" 
              no-gutters
            >
              <span>
                
              </span>
              <span v-if="date != null">
                {{ statusText(service.status) }}: {{ date(service) }}
              </span>
              <span v-else>
                {{ statusText(service.status) }}
              </span>
            </v-row>
          </v-col>
          <v-col class="mt-4" cols="2">
            <app-btn
              color="secondary"
              exact
              fab
              router
              small
              text
              @click="redirect(service)"
            >
              <v-icon size="30"> mdi-chevron-right </v-icon>
            </app-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
      <v-row 
        align="center"
        class="my-3"
        justify="center"
        @click="setService"
      >
        <app-btn size="medium">
          {{ $t('dashboard.discover') }}
        </app-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapMutations } from 'vuex'
import OfferStatus from '~/constants/offers'
export default {
  name: 'ServicesHired',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: '' },
    services: { type: Array, default: () => [] },
    serviceType: { type: Object, default: () => {} },
    img: { type: String, default: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
    isAfiliate: { type: Boolean, default: false }
  },
  data: () => ({
    status: OfferStatus
  }), 
  methods: {
    ...mapMutations({
      setServiceMutation: 'services/SET_SERVICE'
    }),
    date(service) {
      if (service.status === this.status.EXPIRED.val) {
        return this.$dateFns.format(service.contract_end_date, "dd-MM-yyyy");
      } else {
        return this.$dateFns.format(service.cancel_date, "dd-MM-yyyy");;
      }
    },
    statusText(status) {
      if (status === this.status.EXPIRED.val) {
        return 'Expirado';
      } else {
        return 'Cancelado';
      }
    },
    height(status) {
      if (status === this.status.EXPIRED.val || status === this.status.CANCELED.val) {
        return '114px';
      } else {
        return '79px';
      }
    },
    textCanceled(status) {
     if (status === this.status.EXPIRED.val || status === this.status.CANCELED.val) {
        return 'red';
      } else {
        return 'secondary';
      }
    },
    colorExpired(isExpired) {
      if (isExpired) {
        return '#B7B6BC';
      }
      return this.color
    },
    canceled(status) {
      if (status === this.status.EXPIRED.val || status === this.status.CANCELED.val) {
        return true
      }
      return false
    },
    redirect(service) {
      if (this.isAfiliate) {
        this.$router.push(
          this.localePath({
            name: 'offer-slug',
            params: {
              slug: service.offer.id
            }
          })
        )
      } else {
        this.$router.push(
          this.localePath({
            name: 'profile-services-details-slug',
            params: {
              slug: service.id
            }
          })
        )
      }
    },
    setService() {
      this.setServiceMutation(this.serviceType)
      this.$router.push(
        this.localePath({
          name: 'offers-slug',
          params: {
            slug: this.serviceType.name
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.v-expansion-panel {
  border-radius: 10px;
  .v-expansion-panel-content__wrap {
    padding: 0 0 0 !important;
  }
  .v-expansion-panel-header {
    height: 58px !important;
  }
}

.panelDiv {
  .icon {
    width: 30px;
  }
}
 
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
</style>
