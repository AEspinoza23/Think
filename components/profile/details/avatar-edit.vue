<template>
  <v-card class="overflow" color="backColor">
    <v-card-title class="d-flex justify-center align-center">
      <span class="app-body-large-bold">Foto</span>
      <v-spacer></v-spacer>
      <v-btn class="pa-0" color="primary" icon small @click="$emit('closeDialog')">
        <v-icon color="primary"> mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-icon> mdi-arrow-all</v-icon>
          <span class="px-2">Arrastra y amplia para ajustar la posición</span>
        </v-col>
      </v-row>
    </v-card-text>
    <app-loading v-if="loadingCropper" />
    <Cropper
      v-show="imageSrc"
      ref="cropper"
      :src="imageSrc"
      class="cropper"
      stencil-component="circle-stencil"
      @change="change"
      @ready="loadingCropper = false"
    />
    <v-card-text>
      <v-row class="ma-0" justify="end">
        <v-col class="pr-0" cols="auto">
          <v-btn icon @click="rotate(90)">
            <v-img :src="$assets.iconRotateRight" height="34" width="34" />
          </v-btn>
        </v-col>
        <v-col class="pr-0" cols="auto">
          <v-btn icon @click="rotate(-90)">
            <v-img :src="$assets.iconRotateLeft" height="34" width="34" />
          </v-btn>
        </v-col>
        <v-col class="pr-0" cols="auto">
          <v-btn icon @click="flip(true, false)">
            <v-img :src="$assets.iconFlip" height="34" width="34" />
          </v-btn>
        </v-col>
        <v-col class="pr-0" cols="auto">
          <v-btn color="primary" icon @click="flip(false, true)">
            <v-img :src="$assets.iconFlip" class="rotate_icon" height="34" width="34" />
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-row justify="center" @click="openFileInput">
            <input
              id="file-input"
              accept="image/png, image/gif, image/jpeg"
              max="1"
              name="name"
              style="display: none"
              type="file"
              @input="onInput"
            />
            <v-icon class="icon--xl">
              {{ $iconsSvg.upload }}
            </v-icon>
          </v-row>
          <v-row justify="center">
            <span>Subir nueva foto</span>
          </v-row>
        </v-col>
        <v-col class="pa-0" cols="auto">
          <app-btn color="primary" size="medium" @click="saveImage">Guardar</app-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css'
import { Cropper } from 'vue-advanced-cropper'
import { mapActions } from 'vuex'

export default {
  name: 'AvatarEdit',
  components: {
    Cropper
  },
  data() {
    return {
      loadingCropper: false,
      imageCropped: null,
      uploadedFiles: [],
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      imageSrc: null
    }
  },
  mounted() {
    if (this.$auth.$state.user.avatar?.image_xs) {
      this.loadingCropper = true;
      this.imageSrc = this.$auth.$state.user.avatar?.image_xs;
    }
  },
  methods: {
    ...mapActions({
      uploadAvatar: 'profile/uploadAvatar'
    }),
    openFileInput() {
      document.getElementById('file-input').click()
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
    change({ coordinates, canvas }) {
      if (this.$refs.cropper) {
        this.coordinates = coordinates
        this.imageCropped = this.dataURLtoFile(canvas.toDataURL())
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
      return new File([u8arr], 'image.jpeg', { type: 'image/png' })
    },
    rotate(angle) {
      this.$refs.cropper.rotate(angle)
    },
    flip(x, y) {
      this.$refs.cropper.flip(x, y)
    },
    async reader(imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      const imageSize = this.uploadedFiles[0].size
      if (imageSize >= 10485760) {
        this.$flash({
          message: 'La imagen es demasiado grande, tiene que ser menor de 10Mg',
          color: 'error'
        })
      } else {
        this.imageSrc = await new Promise((resolve) => {
          return (reader.onload = (e) => {
            return resolve(e.target.result)
          })
        })
      }
    },
    async saveImage() {
      try {
        const fd = new FormData()
        fd.append('image', this.imageCropped)
        fd.append('type', '1')
        fd.append('relation', this.$auth.$state.user.id)
        const data = await this.uploadAvatar(fd)
        if (data?.id) {
          await this.$auth.fetchUser()
          this.imageSrc = this.$auth.$state.user.avatar?.image_xs
          this.$flash({
            message: 'Imagen guardada correctamente',
            color: 'success'
          })
          this.$emit('closeDialog')
        }
      } catch (e) {
        console.error('Error en upload avatar:', e)
        this.$flash({
          message: 'Error en subir la imagen',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-x: hidden;
}

.rotate_icon {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.cropper {
  max-height: 311px !important;
  background-color: var(--v-card);
}

.actions-position {
  position: absolute;
  bottom: 0;
}
</style>
