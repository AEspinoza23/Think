<template>
  <div>
    <v-progress-circular
      v-if="loadingMenu"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-menu v-else :value="menu" bottom left :open-on-click="true">
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          x-large
          dark
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="icon--lg"> {{ $iconsSvg.menuVertical }}</v-icon>
        </v-btn>
      </template>

      <v-list three-line>
        <v-list-item v-if="!notification.read" @click="notificationChange(true)">
          <v-list-item-icon>
            <v-icon color="primary">{{ $icons.see }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t('notifications.markAsRead')"
            ></v-list-item-title>
            <v-list-item-subtitle 
              v-text="$t('notifications.readText')"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else @click="notificationChange(false)">
          <v-list-item-icon>
            <v-icon color="primary">{{ $icons.noSee }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t('notifications.markAsUnread')"
            ></v-list-item-title>
            <v-list-item-subtitle 
              v-text="$t('notifications.unreadText')"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="notification.type != 1" @click="goTo(notification)">
          <v-list-item-icon>
            <v-icon color="primary">{{ $icons.services }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t('notifications.watch')"
            ></v-list-item-title>
            <v-list-item-subtitle 
              v-text="$t('notifications.watchText')"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="notificationDelete">
          <v-list-item-icon>
            <v-icon color="primary">{{ $icons.delete }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="$t('notifications.delete')"
            ></v-list-item-title>
            <v-list-item-subtitle 
              v-text="$t('notifications.deleteText')"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import notificationType from '~/constants/notifications'
export default {
  name: 'CustomArrivals',
  props: {
    notification: { type: Object, default: () => {} },
  },
  data: () => ({
    loadingMenu: false,
    menu: false,
    types: notificationType
  }),
  mounted() {
    this.menu = false;
  },
  methods: {
    ...mapActions({
      updateNotification: 'notifications/updateNotification',
      deleteNotification: 'notifications/deleteNotification'
    }),
    async notificationChange(read) {
      this.loadingMenu = true;
      const info = {
        id: this.notification.id,
        data: { read }
      }
      const { success } = await this.updateNotification(info);
      if (success) {
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
      }
      this.loadingMenu = false;
      this.menu = false
    },
    async notificationDelete() {
      this.loadingMenu = true;
      const { success } = await this.deleteNotification(this.notification.id);
      if (success) {
        this.$flash({
          message: this.$t('updateSuccess'),
          color: 'success'
        })
      }
      this.loadingMenu = false;
      this.menu = false
    },
    async goTo(val) {
      this.loadingMenu = true;
      await this.markAsRead(val.read, val.id)
      this.loadingMenu = false;
      if (val.type !== 1) {
        const index = this.types.findIndex(({ value }) => value === val.type);
        this.menu = false;
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
    async markAsRead(read, id) {
      if (!read) {
        const info = {
          id,
          data: { read: true }
        }
        await this.updateNotification(info);
      }
    },
  }
};
</script>
