<template>
  <div class="py-3 backColor rounded-lg">
    <v-card
      :width="$vuetify.breakpoint.width"
      class="rounded-lg shades-small-card "
      color="backColor"
      height="auto"
      elevation="0"
    >
      <v-card-text>
        <v-radio-group v-model="radioGroup" class="pa-0 mt-0" hide-details>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="shades-small-card rounded-lg my-1 card"
          >
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                <v-row align="center">
                  <v-col cols="auto">
                    <app-radio
                      :label="item.text"
                      :value="item.value"
                      @change="changeTheme(item.value)"
                    />
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Theme from '~/constants/theme'

export default {
  name: 'MenuAdjustTheme',
  layout: 'app',
  auth: true,
  data() {
    return {
      radioGroup: 1,
      items: Theme
    }
  },
  computed: {
    ...mapGetters({
      dialogValue: 'app/dialogValue'
    })
  },

  mounted() {
    // SET HEADER CONFIG FOR PAGE COMPONENTS
    this.$headerConfig({
      isTitle: true,
      title: 'Ajustes',
      isNotification: true,
      isBack: true
    })
    this.radioGroup = this.$auth.$state.user.theme
    this.changeTheme(this.radioGroup)
  },
  methods: {
    ...mapActions({
      changeDialogValue: 'app/changeDialogValue',
      changeAppTheme: 'app/changeAppTheme',
      updateProfile: 'profile/update'
    }),
    async changeTheme(val) {
      this.radioGroup = val
      let themeVal
      switch (this.radioGroup) {
        case 1:
          themeVal = false
          break
        case 2:
          themeVal = true
          break
        case 3:
          themeVal = window.matchMedia('(prefers-color-scheme: dark)').matches
          break
        default:
          this.changeAppTheme(false)
          break
      }
      const { success, data } = await this.updateProfile({
        theme: this.radioGroup
      })
      if (success) {
        await this.$auth.setUser(data)
        this.changeAppTheme(themeVal)
      } else {
        this.handleErrorResponse(data)
      }
    }
  }
}
</script>

<style scoped></style>
