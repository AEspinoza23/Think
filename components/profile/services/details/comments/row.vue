<template>
  <v-card class="py-2" color="backColor" elevation="0" width="100%">
    <v-row justify="space-between" no-gutters>
      <v-col class="my-1" cols="auto">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-avatar rounded="lg" size="40px">
              <v-img v-if="imageSrc" :lazy-src="imageSrc" :src="imageSrc" alt="" />
              <v-icon v-else class="icon--xl pa-0">{{ $iconsSvg.profile }}</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="ml-1" cols="auto">
            <v-row no-gutters>
              <span class="app-body-small title--text mr-1">
                {{ rating.user.first_name }} {{ middleName }}
              </span>
              <span class="app-body-small secondary--text">
                {{ rateDate }}
              </span>
            </v-row>
            <v-row no-gutters>
              <v-rating
                :value="rating.rating"
                background-color="#F2C94C"
                color="#F2C94C"
                dense
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon="mdi-star-half-full"
                half-increments
                hover
                readonly
                size="10"
              ></v-rating>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="my-1 app-body-small" cols="auto">
        <div v-if="isUser && !isOffer">
          <v-btn
            class="ma-0 pa-0"
            text
            :loading="loading"
            @click="changeToForm()"
          >
            <v-icon class="icon--sm">
              {{ $iconsSvg.edit }}
            </v-icon>
          </v-btn>
          <!-- <v-btn
            class="ma-0 pa-0"
            text
            :loading="loading"
            @click="confirm = true"
          >
            <v-icon class="icon--md">
              {{ $iconsSvg.delete }}
            </v-icon>
          </v-btn> -->
        </div>
        <div v-else>
          <div v-if="rating.purchase">
            <v-icon color="success" small>
              {{ $icons.alertSuccess }}
            </v-icon>
            {{ $t('services.verified') }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-2 app-body-medium" no-gutters>
      {{ rating.comment }}
    </v-row>
    <v-dialog
      v-model="confirm"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >
          <span class="app-heading-1-bold">
            {{ $t('services.confirm') }}
          </span>
        </v-toolbar>
        <v-card-text>
          <div class="app-body-large pt-3">
            {{ $t('services.sure') }}
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <app-btn
            outlined
            :loading="loading"
            @click="confirm = false"
          >
            {{ $t('services.cancel') }}
          </app-btn>
          <app-btn
            :loading="loading"
            @click="commentDelete()"
          >
            {{ $t('services.delete') }}
          </app-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'ServiceCommentsRow',
  props: {
    rating: { type: Object, default: () => ({}) },
    service: { type: Object, default: () => ({}) },
    isOffer: { type: Boolean, default: false }
  },
  data: () => ({
    loading: false,
    confirm: false
  }),
  computed: {
    rateDate() {
      const rateDate = this.rating.created_at
      return this.$dateFns.format(rateDate, 'dd-MM-yyyy')
    },
    middleName() {
      return this.rating.user?.middle_name?.charAt(0) || ''
    },
    imageSrc() {
      let image = null
      if (this.rating.user.avatar) {
        image = this.rating.user.avatar.image_xs
      }
      return image
    },
    isUser() {
      try {
        if (this.$auth.loggedIn) {
          const userId = this.$auth.$state.user.id
          if (this.rating.user.id === userId) {
            return true;
          }
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      deleteComment: 'user/deleteComment'
    }),
    async commentDelete() {
      this.loading = true;
      const { success } = await this.deleteComment(this.rating.id);
      if (success) {
        this.$flash({
          message: this.$t('services.deletedComment'),
          color: 'success',
          type: 'success'
        })
      }
      this.loading = false;
    },
    changeToForm() {
      try {
        const valorationInfo = {
          info: {
            user: this.$auth.$state.user.id,
            offer: this.service.id,
            rating: this.rating.rating,
            comment: this.rating.comment,
          },
          id: this.rating.id,
        };
        this.$emit('changeToForm', { valorationInfo, isEdit: true })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
