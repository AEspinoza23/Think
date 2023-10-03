<template>
  <div>
    <v-row justify="center" class="pt-9">
      <span class="title--text app-body-medium">
        {{ $t('services.yourRate') }}
      </span>
    </v-row>
    <v-row justify="center" class="py-3">
      <v-col cols="5">
        <v-img :src="$assets.estrella"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" class="pt-5" no-gutters>
      <span class="text-center app-body-medium">
        {{ $t('services.starSelect') }}
      </span>
    </v-row>
    <v-row justify="center" class="py-5">
      <v-rating
        v-model="form.info.rating"
        background-color="#F2C94C"
        color="#F2C94C"
        dense
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half-full"
        hover
        size="50"
      ></v-rating>
    </v-row>
    <v-row justify="center">
      <v-col cols="11">
        <app-textarea 
          v-model="form.info.comment" 
          :label="$t('services.message')"
        />
      </v-col>
    </v-row>
     <v-row justify="center" class="py-5">
      <app-btn 
        size='medium'
        :loading="loading"
        @click="sendAction()"
      >
        {{ $t('services.send') }}
      </app-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'ValorationForm',
  props: {
    valoration: { type: Object, default: () => ({}) },
    isEdit: { type: Boolean, default: false}
  },
  data: () => ({
    step: 1,
    form: {
      info: {
        rating: 0,
        comment: ''
      }
    },
    loading: false
  }),
  mounted() {
    this.form = { ...this.valoration }
  },
  methods: {
    ...mapActions({
      createComment: 'user/createComment',
      editComment: 'user/editComment',
    }),
    async sendAction() {
      this.loading = true;
      if (this.isEdit) {
        const { success } = await this.editComment(this.form)
        if (success) {
          this.$flash({
            message: this.$t('services.changedComment'),
            color: 'success',
            type: 'success'
          })
          this.$emit('changeToDetails')
        }
      } else {
        delete this.form.info.user
        const { success } = await this.createComment(this.form)
        if (success) {
          this.$flash({
            message: this.$t('services.createdComment'),
            color: 'success',
            type: 'success'
          })
          this.$emit('changeToDetails')
        }
      }
      this.loading = false;
    }
  }
}
</script>