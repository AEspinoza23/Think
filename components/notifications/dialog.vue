<template>
  <v-dialog
    v-model="dialogValue"
    :width="$vuetify.breakpoint.width"
    class="backColor"
    fullscreen
    hide-overlay
    scrollable
    transition="slide-x-reverse-transition"
    @click:outside="closeDialog"
  >
    <v-card 
      :height="$vuetify.breakpoint.height" 
      :width="$vuetify.breakpoint.width" 
      class="pb-0 backColor"
    >
      <div
        :class="$isIOS ? 'mt-9' : 'mt-2'" 
        class="align-center d-flex justify-space-between" 
        :style="{height: '40px'}
      ">
        <v-btn class="mt-3 mx-2" icon text @click="closeDialog">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-row class="mt-0 mr-2">
          <v-col class="pb-0">
            <app-text-field
              :placeholder="$t('notifications.search')"
              clearable
              :type="'search'"
              outlined
              rounded
              dense
              press-enter
              @search="setNewSearch"
              @input="setInput($event)"
            />
          </v-col>
        </v-row>
      </div>
      <div class="shades-general backColor rounded-lg mt-7">
        <app-loading v-if="loading"/>
        <div v-else>
          <div v-if="notifications.length > 0">
            <template v-for="(val, i) in notifications">
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
          </div>
          <div v-if="notifications.length === 0 && searched">
            <div class="app-body-large-bold title--text">
              {{ $t('notifications.noResult') }}
            </div>
            <div class="app-body-large secondary--text pt-4">
              {{ $t('notifications.tryAgain') }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import notificationType from '~/constants/notifications'
export default {
  data() {
    return {
      search: '',
      loading: false,
      types: notificationType,
      loadingList: [],
      searched: false,
      timeout: null
    }
  },
  computed: {
    ...mapGetters({
      list: 'notifications/notificationList',
      dialogValue: 'app/dialogValue'
    }),
    dialog() {
      return this.dialogValue
    },
    listNext() {
      return this.list.next;
    },
    notifications() {
      return this.list.results;
    }
  },
  watch: {
    notifications(val) {
      this.loadinglist = new Array(val.length).fill(false);
    },
    dialog(val) {
      if (val) {
        this.resetNotificationsList();
      }
    },
    search() {
      this.setNewSearch();
    }
  },
  async mounted() {
    await this.resetNotificationsList();
    this.loadinglist = new Array(this.notifications.length).fill(false);
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      getNotificationsList: 'notifications/getNotificationsList',
      updateNotification: 'notifications/updateNotification'
    }),
    ...mapMutations({
      resetNotificationsList: 'notifications/RESET_NOTIFICATION_LIST'
    }),
    setInput(input) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.search = input;
      }, 1000)
    },
    async setNewSearch() {
      this.searched = false
      if (this.search.length > 0) {
        await this.resetNotificationsList();
        await this.searchNotification();
      } else {
        await this.resetNotificationsList();
      }
    },
    async searchNotification() {
      if (this.listNext && !this.loading) {
        this.loading = true;
        await this.getNotificationsList({search: this.search});
      }
      this.searched = true;
      this.loading = false;
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
    async closeDialog() {
      await this.resetNotificationsList();
      await this.changeDialogValue();
      await this.getNotificationsList()
    }
  }
}
</script>
