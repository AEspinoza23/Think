<template>
  <v-card v-if="bestSellers.length > 0" :width="$vuetify.breakpoint.width" class="backColor mt-3 mb-6 rounded-lg shades-general">
    <v-row no-gutters justify="center" class="app-heading-1-bold py-3">
      ¡Gana saldo extra y un premio sorpresa!
    </v-row>
    <v-row no-gutters class="app-body-medium px-3">
      <v-col cols="5">
        <v-img
          :lazy-src="$assets.gift"
          :src="$assets.gift"
          min-width="131.11px"
          max-width="131.11px"
        />
      </v-col>
      <v-col cols="7">
        <v-row no-gutters>
          <div>
            Obtén 
            <span class="font-weight-bold">
              {{ prize | appCurrency }} de saldo directo por solo subir tus facturas
            </span>
            de los tres servicios principales. 
            Si además contratas con nosotros, 
            <span 
              class="primary--text font-weight-bold text-decoration-underline"
              @click="goTo"
            >
              podrás ganar este pedazo de premio.
            </span>
          </div>
        </v-row>
        <v-row no-gutters class="mt-4">
          <div>
            Aprovecha esta oportunidad de empezar a Ahorrar y Ganar con PIENSA.
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="px-1">
      <v-col v-for="(seller, i) in bestSellers" :key="i" cols="4" class="text-center">
        <div class="app-body-small-bold">{{ seller.name }}</div>
        <div class="app-body-medium-bold primaryThree--text mb-1">
          {{ seller.best_seller_balance | appCurrency }}
        </div>
        <div
          v-if="!seller.uploaded"
          class="uploadareamini"  
          @click="openFileInput(seller.id, i)"
          @drop.prevent="onDrop" 
          @dragleave.prevent="onDragLeave" 
          @dragover.prevent="onDragOver" 
        >
          <input
            id="file-input"
            ref="file"
            accept="
              application/pdf,
              image/*,
            "
            max="1"
            style="display: none"
            type="file"
            @input="onInput"
          />
          <v-icon v-if="!dragging && !loading[i]" class="icon--xl">
            {{ $iconsSvg.upload }}
          </v-icon>
          <v-icon v-else-if="dragging && !loading[i]" class="icon--xl">
            {{ $iconsSvg.download }}
          </v-icon>
          <app-loading v-else-if="!dragging && loading[i]"></app-loading>
        </div>
        <div v-else-if="seller.uploaded && !seller.contracted_service" class="uploaded">
          <v-icon class="icon--xl">
            {{ $iconsSvg.union }}
          </v-icon>
        </div>
        <div v-else-if="seller.uploaded && seller.contracted_service" dark class="uploaded primaryThree">
          <v-icon dark class="icon--xl">
            {{ $iconsSvg.services }}
          </v-icon>
        </div>
        <div v-if="seller.uploaded && !seller.contracted_service" class="mt-1">
          <app-btn block @click="openLink(seller.name)">
            Contratar
          </app-btn>
        </div>
      </v-col>
      <v-col cols="12" class="app-body-medium px-4">
        <div class="text-center">
          Adjunta un archivo PNG, JPG o PDF (máximo 5MB)
        </div>
        <div v-if="prizeObtained > 0" class="mt-3 mb-1">
          Has obtenido 
          <span class="primaryThree--text">{{ prizeObtained | appCurrency }}</span>
          por subir tu factura. 
          Puedes comprobarlo en la sección 
          <span 
            class="primary--text text-decoration-underline"
            @click="$router.push(localePath('profile-balance'))"
          >Tu Saldo</span>. Contrata ya para poder conseguir el fabuloso premio
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data:() => ({
    formData: null,
    dragging: false,
    id: null,
    index: null,
    uploadedFiles: [],
    loading: [false, false, false]
  }),
  computed: {
    ...mapGetters({
      bestSellers: 'offers/bestSeller',
      link: 'offers/bestSellerLink'
    }),
    prize() {
      let money = 0;
      for (let i = 0; i < this.bestSellers.length; i++) {
        money = money + parseInt(this.bestSellers[i].best_seller_balance);
      }
      return money;
    },
    prizeObtained() {
      let money = 0;
      for (let i = 0; i < this.bestSellers.length; i++) {
        if (this.bestSellers[i].uploaded) {
          money = money + parseInt(this.bestSellers[i].best_seller_balance);          
        }
      }
      return money;
    }
  },
  async mounted() {
    this.formData = new FormData();
    await this.bestSellerList();
    await this.getLink();
  },
  methods: {
    ...mapActions({
      bestSellerList: 'offers/bestSellerList',
      bestSellerRequest: 'offers/bestSellerRequest',
      getLink: 'offers/bestSellerLink',
    }),
    goto() {
      if (this.link.award_url) {
        window.open(this.link.award_url, '_blank');
      }
    },
    sendRequest() {
      this.loading[this.index] = true;
      // eslint-disable-next-line camelcase
      this.bestSellerRequest(this.formData);
      this.loading[this.index] = false;
    },
    openFileInput(id, index) {
      document.getElementById('file-input').click();
      this.id = id;
      this.index = index;
    },
    onInput(e) {
      if (this.uploadedFiles.length > 0) {
        this.uploadedFiles = []
      }
      for (let index = 0; index < e.target.files.length; index++) {
        this.uploadedFiles.push(e.target.files[index])
      }
      if (this.uploadedFiles) {
        this.reader(this.uploadedFiles[0])
      }
    },
    dataURLtoFile(dataUrl) {
      const arr = dataUrl.split(',')
      const blob = atob(arr[1])
      let n = blob.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = blob.charCodeAt(n)
      }
      return new File([u8arr], this.documentName, { type: this.documentType })
    },
    async reader(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      const fileSize = this.uploadedFiles[0].size;
      if (fileSize > 5245329) {
        this.$flash({
          message: 'El documento es demasiado grande, tiene que ser menor de 5Mb',
          color: 'error'
        })
      } else {
        const document = await new Promise((resolve) => {
          return (reader.onload = (e) => {
            return resolve(e.target.result)
          })
        })
        this.document = document;
        const file = this.dataURLtoFile(document);
        this.formData.append('service', this.id);
        this.formData.append('invoice', file);
        this.sendRequest();
      }
    },
    openLink(name) {
      let link;
      if (this.$auth.$state.user?.consultant?.contact_link) {
        const whatsapp = this.$auth.$state.user.consultant.contact_link;
        if (whatsapp.includes('https')) {
          link = `${whatsapp}&text=Hola,%20quiero%20Contratar%20Una%20Oferta%20de%20${name}`;
        } else {
          link = `https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola,%20quiero%20Contratar%20Una%20Oferta%20de%20${name}`;
        }
        window.open(link, '_blank');
      } else if (this.$auth.$state.user?.consultant?.phone_code && this.$auth.$state.user?.consultant?.phone_number) {
        const number = `${this.$auth.$state.user.consultant?.phone_code}${this.$auth.$state.user.consultant?.phone_number}`
        link = `https://api.whatsapp.com/send?phone=${number}&text=Hola,%20quiero%20Contratar%20Una%20Oferta%20de%20${name}` ; 
        window.open(link, '_blank');
      } else {
        this.$flash({
          message: 'El consultor y/o el experto del area no tienen link de whatsapp asociado para contacto',
          color: 'warning',
          type: 'warning'
        })
      }
    },
    onDrop(e) {
      e.preventDefault();
      this.dragging = false;
      const files = e.dataTransfer.files;
      const example = files[0];
      this.documentName = example.name;
      this.documentType = example.type;
      this.document = null;
      
      if (this.uploadedFiles.length > 0) {
        this.uploadedFiles = []
      }
      for (let index = 0; index < files.length; index++) {
        this.uploadedFiles.push(files[index])
      }
      if (this.uploadedFiles) {
        this.reader(this.uploadedFiles[0])
      }
    },
    onDragOver(e) {
      e.preventDefault();
      this.dragging = true;
      e.dataTransfer.dropEffect = "copy";
    },
    onDragLeave(e) {
      this.dragging = false;
      e.preventDefault();
    },
  }
}
</script>

<style>
.uploadareamini {
  border: 1px dashed #c4c4c4;
  height: 69px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.uploaded {
  border: 1px solid #80DDDF;
  height: 69px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>