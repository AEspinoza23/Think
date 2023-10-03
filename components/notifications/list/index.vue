<template>
  <div>
    <div class="mt-5 backColor rounded-lg shades-general">
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="auto" class="ml-3">
          <v-tabs 
            v-model="tab" 
            class="app-tabs rounded-lg" 
            background-color="backColor" 
            hide-slider
            grow
            @change="setFilter"
          >
            <v-tab 
              v-for="item in items" 
              :key="item" 
              class="text-capitalize"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="primary"
            x-large
            dark
            icon
            @click="showDialog()"
          >
            <v-icon class="icon--md"> {{ $iconsSvg.menuVertical }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="notifications.length > 0" class="backColor mt-5 rounded-lg shades-general">
      <v-row 
        v-if="today.length > 0" 
        no-gutters
      > 
        <v-col cols="auto" class="app-body-large pl-5 py-2 title--text">
          Hoy
        </v-col>
        <v-col cols="12">
          <v-list tile class="backColor">
            <v-divider
            ></v-divider>
            <template v-for="(val, i) in today">
              <app-loading v-if="loadingList[i]" :key="i" />
              <v-list-item
                v-else
                :key="i"
                :class="`${notificationColor(val.read)} pa-0`"
              >
                <div 
                  :class="`${barColor(val.read)}`"
                  :style="{ width: '5px', height: '78px' }"
                >
                </div>
                <v-list-item-avatar class="mx-4">
                  <v-icon class="icon--xl">
                    {{ icon(val.type) }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="goTo(val, `${i}l`)">
                  <v-list-item-title>
                    <span class="app-body-large-bold title--text">
                      {{ val.title }}
                    </span>
                    <span class="app-body-medium secondary--text">
                      {{ notifyDate(val.created_at) }}
                    </span>
                  </v-list-item-title>

                  <v-row no-gutters>
                    <span class="app-body-medium secondary--text">
                      {{ val.description }}
                    </span>
                  </v-row>
                </v-list-item-content>

                <v-list-item-action>
                  <notifications-menu 
                    :notification="val"
                  />
                </v-list-item-action>
              </v-list-item>
              <v-divider
              :key="i+'b'"
              ></v-divider>
            </template>
          </v-list>
        </v-col>
      </v-row>
      <v-row 
        v-if="yesterday.length > 0" 
        no-gutters
      > 
        <v-col cols="auto" class="app-body-large pl-5 py-2 title--text">
          Semana
        </v-col>
        <v-col cols="12">
          <v-list tile class="backColor">
            <v-divider
            ></v-divider>
            <template v-for="(val, i) in yesterday">
              <app-loading v-if="loadingList[i]" :key="i" />
              <v-list-item
                v-else
                :key="i"
                :class="`${notificationColor(val.read)} pa-0`"
              >
                <div 
                  :class="`${barColor(val.read)}`"
                  :style="{ width: '5px', height: '78px' }"
                >
                </div>
                <v-list-item-avatar class="mx-4">
                  <v-icon class="icon--xl">
                    {{ icon(val.type) }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="goTo(val, `${i}l`)">
                  <v-list-item-title>
                    <span class="app-body-large-bold title--text">
                      {{ val.title }}
                    </span>
                    <span class="app-body-medium secondary--text">
                      {{ notifyDate(val.created_at) }}
                    </span>
                  </v-list-item-title>

                  <v-row no-gutters>
                    <span class="app-body-medium secondary--text">
                      {{ val.description }}
                    </span>
                  </v-row>
                </v-list-item-content>

                <v-list-item-action>
                  <notifications-menu 
                    :notification="val"
                  />
                </v-list-item-action>
              </v-list-item>
              <v-divider
              :key="i+'b'"
              ></v-divider>
            </template>
          </v-list>
        </v-col>
      </v-row>
      <v-row 
        v-if="previous.length > 0" 
        no-gutters
      > 
        <v-col cols="auto" class="app-body-large pl-5 py-2 title--text">
          Anteriores
        </v-col>
        <v-col cols="12">
          <v-list tile class="backColor">
            <v-divider
            ></v-divider>
            <template v-for="(val, i) in previous">
              <app-loading v-if="loadingList[i]" :key="i" />
              <v-list-item
                v-else
                :key="i"
                :class="`${notificationColor(val.read)} pa-0`"
              >
                <div 
                  :class="`${barColor(val.read)}`"
                  :style="{ width: '5px', height: '78px' }"
                >
                </div>
                <v-list-item-avatar class="mx-4">
                  <v-icon class="icon--xl">
                    {{ icon(val.type) }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="goTo(val, `${i}l`)">
                  <v-list-item-title>
                    <span class="app-body-large-bold title--text">
                      {{ val.title }}
                    </span>
                    <span class="app-body-medium secondary--text">
                      {{ notifyDate(val.created_at) }}
                    </span>
                  </v-list-item-title>

                  <v-row no-gutters>
                    <span class="app-body-medium secondary--text">
                      {{ val.description }}
                    </span>
                  </v-row>
                </v-list-item-content>

                <v-list-item-action>
                  <notifications-menu 
                    :notification="val"
                  />
                </v-list-item-action>
              </v-list-item>
              <v-divider
              :key="i+'b'"
              ></v-divider>
            </template>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-row 
      v-if="notifications.length === 0 && !loading" 
      no-gutters 
      class="shades-small-card rounded-lg backColor"
    >
      <v-card 
        :width="$vuetify.breakpoint.width" 
        color="backColor" 
        class="my-2 mx-2" 
        elevation="0"
      >
        <v-card-title>
          <span class="app-body-large-bold">
            {{ $t('notifications.yourNotifications') }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="auto">
              <v-img height="85" width="93" :src="$assets.campanaDinamica"></v-img>
            </v-col>
          </v-row>
          <v-row class="px-5 app-body-medium mb-10">
            {{ $t('notifications.subtitleText') }}
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-bottom-sheet v-model="dialog" :persistent="loadingRead" inset>
      <v-card class="backColor" width="100%">
        <v-card-text>
          <v-row class="py-6 app-body-large" align="center">
            <v-btn 
              :loading="loadingRead" 
              text 
              elevation="0" 
              class="mx-0 px-0"
              @click="readAllNotifications"
            >
              <v-icon class="blue--text rounded-xl"> {{ $icons.alertSuccess }}</v-icon>
              <span class="title--text">
                Marcar todos como leídos
              </span>
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <app-loading v-if="loading" class="py-5" />
    <div v-intersect="getNotifications" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import notificationType from '~/constants/notifications'
export default {
  name: 'NotificationsList',
  data: () => ({
    loading: false,
    loadingRead: false,
    types: notificationType,
    loadingList: [],
    today: [],
    yesterday: [],
    previous: [],
    items: ['Todas', 'No leídas', 'Leídas'],
    tab: 0,
    dialog: false,
    filters: {}
  }),
  computed: {
    ...mapGetters({
      list: 'notifications/notificationList'
    }),
    listNext() {
      return this.list.next;
    },
    notifications() {
      return this.list.results;
    }
  },
  watch: {
    notifications(val) {
      this.notificationDistribution();
      this.loadinglist = new Array(val.length).fill(false);
    }
  },
  async mounted() {
    await this.resetNotificationsList();
    await this.getNotifications();
    await this.notificationDistribution();
    this.loadinglist = new Array(this.notifications.length).fill(false);
  },
  methods: {
    ...mapActions({
      getNotificationsList: 'notifications/getNotificationsList',
      updateNotification: 'notifications/updateNotification',
      readAll: 'notifications/readAll'
    }),
    ...mapMutations({
      resetNotificationsList: 'notifications/RESET_NOTIFICATION_LIST'
    }),
    showDialog() {
      document.activeElement.blur();
      this.dialog = !this.dialog
    },
    async getNotifications() {
      if (this.listNext && !this.loading) {
        this.loading = true;
        await this.getNotificationsList(this.filters);
        this.loading = false;
      }
    },
    notificationColor(val) {
      if (!val) {
        return 'whiteblue';
      } else {
        return 'card';
      }
    },
    async markAsRead(read, id) {
      if (!read) {
        const info = {
          id,
          data: { read: true }
        }
        await this.updateNotification(info);
      }
    },
    icon(type) {
      const index = this.types.findIndex(({ value }) => value === type);
      if (index !== -1) {
        return this.types[index].icon;
      } else {
        return this.$iconsSvg.notificationAffiliates;
      }
    },
    barColor(read) {
      if (read) {
        return 'card';
      }
      return 'primary';
    },
    async goTo(val, key) {
      this.loadinglist.splice(key, 1, true);
      await this.markAsRead(val.read, val.id)
      this.loadinglist.splice(key, 1, false);
      if (val.type !== 1) {
        const index = this.types.findIndex(({ value }) => value === val.type);
        if (index !== -1) {
          if (val.slug) {
            this.$router.push(
              this.localePath({
                name: this.types[index].route,
                params: {
                  slug: val.slug
                }
              })
            )
          } else {
            this.$router.push(
              this.localePath(this.types[index].route)
            )
          }
        }
      }
    },
    notifyDate(oldDate){
      const date = this.$dateFns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
      const formatDate = this.$dateFns.format(oldDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
      const isoFormatedDate = this.$dateFns.parseISO(formatDate);
      const isoDate = this.$dateFns.parseISO(date);
      let finalDate = this.$dateFns.differenceInSeconds(isoDate, isoFormatedDate)
      
      if (finalDate < 60) {
        return finalDate+'s';
      } else if (finalDate >= 60) {
        finalDate = this.$dateFns.differenceInMinutes(isoDate, isoFormatedDate)
        if (finalDate < 60) {
          return finalDate+'m';
        } else if (finalDate >= 60) {
          finalDate = this.$dateFns.differenceInHours(isoDate, isoFormatedDate)
          if (finalDate <= 24) {
            return finalDate+'h';
          } else if (finalDate > 24) {
            finalDate = this.$dateFns.differenceInDays(isoDate, isoFormatedDate)
            if (finalDate <= 7) {
              return finalDate+'d';
            } else if (finalDate > 7 ) {
              finalDate = this.$dateFns.differenceInWeeks(isoDate, isoFormatedDate)
              if (finalDate <= 4) {
                return finalDate+'S'
              } else if (finalDate > 4) {
                finalDate = this.$dateFns.differenceInMonths(isoDate, isoFormatedDate)
                if (finalDate <= 12) {
                  return finalDate+'M';
                } else if (finalDate > 12) {
                  finalDate = this.$dateFns.differenceInYears(isoDate, isoFormatedDate)
                  return finalDate+'Y';
                }
              }
            }
          }
        }
      }
    },
    notificationDistribution() {
      const today = [];
      const yesterday = [];
      const previous = [];
      this.notifications.forEach(element => {
        const date = this.$dateFns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const formatDate = this.$dateFns.format(element.created_at, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const isoFormatedDate = this.$dateFns.parseISO(formatDate);
        const isoDate = this.$dateFns.parseISO(date);
        const finalDate = this.$dateFns.differenceInDays(isoDate, isoFormatedDate);
        if (finalDate <= 1) {
          today.push(element);
        } else if (finalDate === 2) {
          yesterday.push(element);
        } else if (finalDate > 2) {
          previous.push(element);
        }
      });
      this.today = today;
      this.yesterday = yesterday;
      this.previous = previous;
    },
    async setFilter() {
      switch (this.tab) {
        case 0:
          this.filters = {};
          break;
        case 1:
          this.filters = {
            read: false
          };
          break;
        case 2:
          this.filters = {
            read: true
          };
          break;
      
        default:
          break;
      }
      await this.resetNotificationsList();
      await this.getNotifications();
    },
    async readAllNotifications() {
      this.loadingRead = true;
      const { success, data } = await this.readAll();
      if (success) {
        this.$flash({
          message: data.detail,
          color: 'success',
          type: 'success'
        })
        await this.resetNotificationsList();
        await this.getNotifications()
        this.dialog = false;
      } else {
        this.$flash({
          message: data.detail,
          color: 'error',
          type: 'error'
        })
      }
      this.loadingRead = false;
    }
  }
}
</script>