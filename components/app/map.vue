<template>
  <div>
    <div>
      <GmapMap
        ref="mapRef"
        :zoom="zoom"
        :center.sync="center"
        style="width: 100%; height: 526px"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false
        }"
        @click="handleMapCLick"
      >
        <GmapMarker
          v-if="currentPlaceLocation"
          :position="currentPlaceLocation"
          :draggable="draggableMarker"
          @dragend="handleMapCLick"
        />
        <GmapMarker
          v-for="(marker, index) in localMarkerList"
          :key="index"
          :position="marker.position"
          :icon="buildIcon"
          @click="changeMarker(index)"
        >
          <gmap-info-window
            v-if="marker.showInfo !== undefined"
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="marker.showInfo"
            @closeclick="marker.showInfo = false"
          >
            <v-card color="white" width="200px" elevation="0" class="mb-2">
              <v-row no-gutters class="black--text app-body-medium-bold">
                {{ marker.name }}
              </v-row>
              <v-row no-gutters class="black--text app-body-medium my-1">
                {{ marker.address.address_formatted }}
              </v-row>
              <v-row no-gutters class="black--text app-body-medium">
                {{ marker.phone_number }}
              </v-row>
              <v-row no-gutters justify="space-between" class="black--text app-body-medium mt-2">
                <!-- <div v-ripple class="d-flex" @click="changeToStreetView(marker)">
                  <v-icon size="15" color="black">
                    mdi-eye-outline
                  </v-icon>
                  <span class="text-decoration-underline">
                    Street View
                  </span>
                </div> -->
                <v-col cols="auto">
                  <v-icon size="15" color="success">
                    mdi-check
                  </v-icon>
                  <span class="text-decoration-underline">
                    {{ marker.commerce_type }}
                  </span>
                </v-col>
              </v-row>
            </v-card>
          </gmap-info-window>
        </GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import FormMixin from '~/mixins/form';
export default {
  name: 'AppMap',
  mixins: [FormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    commerce: {
      type: Object,
      default: () => {}
    },
    autoCenter: { type: Boolean, default: false },
    draggableMarker: { type: Boolean, default: false },
    markerList: { type: Array, default: () => [] },
    zoom: { type: [String, Number], default: 16 },
    mapAspectRatio: { type: [Number, String], default: 1.7823 }
  },
  data () {
    return {
      localMarkerList: [],
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      updateCenter: true,
      infoOptions: {
        pixelOffset: {
          // width: 0,
          height: 0
        }
      },
      infoWinOpen: false,
      searchingPlace: false,
      mapBaseUrl: 'https://nominatim.openstreetmap.org',
      centerData: null,
      currentZoom: 11.5,
      position: {
        lat: null,
        lng: null
      }
    };
  },
  computed: {
    center: {
      get() {
        if (this.autoCenter) {
          return this.currentPlaceLocation;
        } else {
          return this.centerData || { lat: 47.41322, lng: -1.219482 };
        }
      },
      set(val) {
        this.centerData = val;
      }
    },
    currentPlaceLocation() {
      return this.getPositionFromValue();
    },
    buildIcon() {
      if (!this.$assets.mapIcon) return {};
      return {
        url: this.$assets.mapIcon,
        size: { width: 40, height: 60, f: 'px', b: 'px' },
        scaledSize: { width: 40, height: 60, f: 'px', b: 'px' }
      };
    }
  },
  watch: {
    markerList(val) {
      this.localMarkerList = val;
      if (val.length !== 0) {
        this.$nextTick(() => {
          if (this.$refs.mapRef) {
            this.$refs.mapRef.$mapPromise.then(() => {
              const b = this.$refs.mapRef.$mapObject.getBounds();
              val.forEach((element) => {
                b.extend({
                  lat: element.position.lat,
                  lng: element.position.lng
                });
              });
  
              this.$refs.mapRef.fitBounds(b, 0);
              this.$refs.mapRef.panToBounds(b);
            })
          }
        })
      } else if (this.$refs.mapRef) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo({...this.getPositionFromValue()})
          map.setZoom(16);
        })
      }
    },
    value(val) {
      this.centerData = this.getPositionFromValue();
    },
    zoom() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({...this.getPositionFromValue()})
      })
    },
    commerce(val) {
      if (val.latitude && val.longitude) {
        console.log('====================================');
        console.log(val);
        console.log('====================================');
        if (this.$refs.mapRef) {
          if (this.position.lat !== val.latitude && this.position.lng !== val.longitude) {
            this.$refs.mapRef.$mapPromise.then((map) => {
              map.panTo({lat: val.latitude, lng: val.longitude})
              map.setZoom(16);
            })
            this.position = {
              lat: val.latitude,
              lng: val.longitude
            }
          }
        }
      }
    }
  },
  mounted() {
    this.centerData = this.getPositionFromValue();
    this.localMarkerList = this.markerList;
    if (this.localMarkerList.length !== 0) {
      this.$nextTick(() => {
        if (this.$refs.mapRef) {
          this.$refs.mapRef.$mapPromise.then((map) => {
            // eslint-disable-next-line new-cap
            const b = this.$refs.mapRef.$mapObject.getBounds();
            this.localMarkerList.forEach((element) => {
              b.extend({
                lat: element.lat,
                lng: element.lng
              })
            });
  
            this.$refs.mapRef.fitBounds(b);
            this.$refs.mapRef.panToBounds(b);
          })
        }
      }) 
    } else if (this.$refs.mapRef) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({...this.getPositionFromValue()})
        map.setZoom(16);
      })
    }
  },
  methods: {
    changeMarker(index) {
      this.hideInfoWindow();
      this.localMarkerList[index].showInfo = true;
      if (this.$refs.mapRef) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo({...this.localMarkerList[index].position})
        })
      }
    },
    /* changeToStreetView(marker) {
      if (this.$refs.mapRef) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          const view =  {
            position: marker.position,
            pov: {
              heading: 34,
              pitch: 10
            }
          }
          map.setStreetView(view);
        })
      }
    }, */
    hideInfoWindow() {
      this.localMarkerList.forEach((e) => {
        e.showInfo = false;
      });
    },
    getPositionFromValue() {
      const { latitude, longitude } = { ...this.value };
      return latitude && longitude
        ? { lat: latitude, lng: longitude }
        : null;
    },
    async searchPlace({ lat, lng }) {
      if (this.searchingPlace) return;
      try {
        this.searchingPlace = true;
        const url = `${this.mapBaseUrl}/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
        const conf = {
          headers: {
            'Accept-Language': this.$i18n.locale.split('-')[0]
          }
        };
        const { data } = await this.$axios.get(url, conf);

        this.updateLocationObject({ ...data, lat, lon: lng });
      } catch (e) {
        console.warn('error en la busqueda de lugares', e);
      }
      this.searchingPlace = false;
    },
    handleMapCLick(evt) {
      this.updateCenter = false;
      this.hideInfoWindow();
      const latLng = {
        lat: evt.latLng.lat(),
        lng: evt.latLng.lng()
      };
      this.$emit('update-lat-lng', latLng);
      // await this.searchPlace(latLng);
    },
    updateLocationObject(location) {
      this.$emit('input', { ...this.value, ...location });
    }
  }
};
</script>

<style lang="scss">
.shared-location-form__map {
  .leaflet {
    &-pane {
      z-index: 1 !important;
    }
    &-control {
      display: none;
    }
  }

  &__map {
    .v-responsive {
      border-radius: 15px;
      box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.15);
      background-color: var(--v-pale-grey-base);
      .vue2leaflet-map {
        height: 100% !important;
      }
    }
  }
}
</style>
