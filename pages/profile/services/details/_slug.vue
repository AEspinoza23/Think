<template>
  <app-loading v-if="loading" class="py-5" />
  <div v-else>
    <SocialHead
      :title="'Piensa App - ' + seo.title || ''"
      :description="seo.description || ''"
      :image="seo.image"
    />
    <div v-if="!form">
      <!-- image -->
      <profile-services-details-image :service="service" :image="imageSrc" />
      <!-- savings -->
      <profile-services-details-savings :service="service.offer" />
      <!-- info -->
      <profile-services-details-info 
        class="my-2"
        :service="service"
        :company="company"
        :image="image"
      />
      <!-- valoration -->
      <profile-services-details-valoration 
        v-if="!valorated"
        class="my-2"
        :service="service.offer"
        @changeToForm="changeToForm"
      />
      <!-- comments -->
      <profile-services-details-comments 
        class="my-2"
        :service="service.offer"
        @changeToForm="changeToForm"
      />
    </div>
    <div v-else>
      <profile-services-details-form 
        :valoration="valoration"
        :is-edit="isEdit"
        @changeToDetails="changeToDetails"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SocialHead from '~/components/seoHeads'

export default {
  name: 'ProfileServices',
  components: { SocialHead },
  layout: 'app',
  async asyncData({ params, $axios }) {
    const result = {
      seo: {}
    }
    let url;
    if (process.env.NODE_ENV === 'development' || process.env.ENVIROMENT === 'development') {
      url = 'https://piensa-pre.sfsl.es/';
      /* url = 'http://localhost:3000/'; */
    } else {
      url = 'https://app.piensanetwork.com/';
    }
    try {
      const response = await $axios({
        method: 'GET',
        url: `/api/users/users/retrieve_user_offer/?user_offer_id=${params.slug}`,
        baseURL: url
      });
      const seo = {};
      seo.image = response.data.image?.image_400 || '';
      seo.title = response.data.title || '';
      seo.description = response.data.description || '';
      return { seo }
    } catch(e) {
      console.log(e)
    } 
    return result;
  },
  data: () => ({
    loading: false,
    valoration: {},
    isEdit: false,
    form: false /* false: details, true: comment form */
  }),
  computed: {
    ...mapGetters({
      offer: 'user/offer'
    }),
    service() {
      return this.offer
    },
    imageSrc() {
      if (this.service.offer) {
        if (this.service.offer.image) {
          return this.service.offer.image.image_400
        } else if (this.service.offer.service_category) {
          if (this.service.offer.service_category.image) {
            if (this.service.offer.service_category.image.svg !== null) {
              return this.service.offer.service_category.image.svg
            } else {
              return this.service.offer.service_category.image.image_400
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    company() {
      if (this.offer.offer && this.offer.offer.company) {
        return this.offer.offer.company;
      } else {
        return {name: ''}
      }
    },
    valorated() {
      try {
        const userId = this.$auth.$state.user.id
        if (this.service.offer.feedbacks) {
          const feedbacks = this.service.offer.feedbacks;
          const index = feedbacks.findIndex(({ user })=> user.id === userId);
          if (index !== -1) {
            return true;
          }
          return false;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  async mounted() {
    this.loading = true;
    const title = await this.retrieveOffer()
    // SET HEADER CONFIG FOR PAGE AFFILIATES
    await this.$headerConfig({
      isBack: true,
      isTitle: true,
      title,
      isNotification: true,
      isMenu: false,
      isFilter: false,
      isOptions: false
    }, true)
    this.loading = false;
  },
  methods: {
    ...mapActions({
      getOffer: 'user/getUserOffer'
    }),
    ...mapMutations({
      setOffer: 'offers/SET_OFFER'
    }),
    async retrieveOffer() {
      const id = this.$route.params.slug
      const { success, data } = await this.getOffer(id);
      if (success) {
        this.setOffer(data.offer);
        return data.offer.title 
      } else {
        return 'Service'
      }
    },
    changeToForm(val){
      this.isEdit = val.isEdit
      this.valoration = val.valorationInfo;
      this.form = true;
    },
    changeToDetails(){
      this.form = false;
    }
  }
}
</script>
