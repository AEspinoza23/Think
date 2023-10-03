<template>
  <div class="dashboardMenu noCopy light" :class="$isIOS? 'mt-4': ''" @mouseup="stashthekraken()">
    <div class="text-center white--text app-display-2-bold pt-8 mb-3">
      ¿Qué quieres hacer?
    </div>
    <div></div>
    <v-row justify="center" no-gutters>
      <div>
        <v-img
          :lazy-src="$assets.bubble"
          :src="$assets.bubble"
          width="100px"
          height="100px"
          :class="bubbleClass.one"
          class="pointer"
          @click="goTo('/menu/shops', 'shops')"
          @mousedown="releasethekraken('one')"
          @touchstart="releasethekraken('one')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row no-gutters justify="center" class="mt-7 mr-1">
            <div class="bubbleText bubbleTextOne">
              <div class="text-center">Gastar mi</div>
              <div class="text-center">saldo</div>
            </div>
          </v-row>
          <div 
            class="bubbleIconOne"
          >
            <v-icon
              class="icon--mxl"
              light
            >
              {{ $iconsSvg.cart }}
            </v-icon>
          </div>
        </v-img>
      </div>
    </v-row>
    <v-row justify="center" no-gutters>
      <div class="d-flex">
        <v-img
          :lazy-src="$assets.bubbleTwo"
          :src="$assets.bubbleTwo"
          width="100px"
          height="100px"
          :class="bubbleClass.two"
          class="pointer"
          @click="goTo('/offers', 'offer')"
          @mousedown="releasethekraken('two')"
          @touchstart="releasethekraken('two')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row no-gutters justify="center" class="mt-5">
            <div class="bubbleText bubbleTextTwo">
              <div class="text-center">Buscar mi</div>
              <div class="text-center">mejor</div>
              <div class="text-center">oferta</div>
            </div>
          </v-row>
          <div class="bubbleIconTwo">
            <v-icon
              size="40"
              color="primary"
            >
              {{ $icons.offer }}
            </v-icon>
          </div>
        </v-img>
        <v-img
          :lazy-src="$assets.bigBubble"
          :src="$assets.bigBubble"
          width="120px"
          height="120px"
          :class="bubbleClass.center"
          class="pointer"
          :style="{'z-index': 10}"
          @click="goTo('/bills', 'bill')"
          @mousedown="releasethekraken('center')"
          @touchstart="releasethekraken('center')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row v-if="!text" no-gutters justify="center" class="mt-8">
            <div class="bigBubbleText">
              <div class="text-center">Sube tu</div>
              <div class="text-center">factura</div>
            </div>
          </v-row>
          <div v-if="!text" class="bigBubbleIcon">
            <v-icon
              size="40"
              color="primary"
            >
              {{ $icons.upload }}
            </v-icon>
          </div>
          <v-row v-if="text" no-gutters justify="center" class="mt-8">
            <div class="bigBubbleTextAlt">
              <div class="text-center">Lo quiero</div>
              <div class="text-center">Todo</div>
            </div>
          </v-row>
        </v-img>
        <v-img
          :lazy-src="$assets.bubbleThree"
          :src="$assets.bubbleThree"
          width="100px"
          height="100px"
          :class="bubbleClass.three"
          class="pointer"
          @click="goTo('/menu/referral-code', 'bill')"
          @mousedown="releasethekraken('three')"
          @touchstart="releasethekraken('three')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row no-gutters justify="center" class="mt-7 mr-1">
            <div class="bubbleText bubbleTextThree">
              <div class="text-center">Ganar</div>
              <div class="text-center">dinero</div>
            </div>
          </v-row>
          <div 
            class="bubbleIconThree"
          >
            <v-icon
              small
              class="icon--mxl"
              light
            >
              {{ $iconsSvg.savedEuros }}
            </v-icon>
          </div>
        </v-img>
      </div>
    </v-row>
    <v-row justify="center" no-gutters>
      <div class="d-flex">
        <v-img
          :lazy-src="$assets.bubbleFour"
          :src="$assets.bubbleFour"
          width="100px"
          height="100px"
          :class="bubbleClass.four"
          class="pointer"
          @click="openLink('travel')"
          @mousedown="releasethekraken('four')"
          @touchstart="releasethekraken('four')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row no-gutters justify="center" class="mt-9 mr-1  ">
            <div class="bubbleText bubbleTextFour">
              <div class="text-center">Viajar</div>
            </div>
            <div 
              class="bubbleIconFour"
            >
              <v-icon
                size="55"
                color="primary"
              >
                {{ $icons.travel }}
              </v-icon>
            </div>
          </v-row>
        </v-img>
        <v-img
          :lazy-src="$assets.bubbleFive"
          :src="$assets.bubbleFive"
          width="100px"
          height="100px"
          :class="bubbleClass.five"
          class="pointer"
          @click="goTo('/offers/study', 'bill')"
          @mousedown="releasethekraken('five')"
          @touchstart="releasethekraken('five')"
          @mouseup="stashthekraken()"
          @touchend="stashthekraken()"
        >
          <v-row no-gutters justify="center" class="mt-9 mr-1">
            <div class="bubbleText bubbleTextFive">
              <div class="text-center">Ahorrar</div>
            </div>
          </v-row>
          <div 
            class="bubbleIconFive"
          >
            <v-icon
              size="40"
              color="primary"
            >
              {{ $icons.moneyBox }}
            </v-icon>
          </div>
        </v-img>
      </div>
    </v-row>
  </div>
</template>

<script>
import animations from '~/constants/animations'
export default {
  name: 'DashboardMenu',
  data: () => ({
    imageSrc: null,
    bubbleClass: {
      one: 'bubble bubbleOne',
      two: 'bubble bubbleTwo',
      center: 'bubble',
      three: 'bubble bubbleThree',
      four: 'bubble bubbleFour',
      five: 'bubble bubbleFive'
    },
    animationClass: animations,
    text: false,
    lastBubble: null
  }),
  methods: {
    goTo(route, bubbleId) {
      this.$router.push(this.localePath(route));
    },
    openLink() {
      window.open('https://www.travel.piensanetwork.com/', '_blank');
    },
    releasethekraken(bubble) {
      this.lastBubble = bubble;
      this.bubbleClass = this.animationClass.start[bubble];
      setTimeout(() => {
        this.text = true;
      }, "500");
    },
    stashthekraken() {
      this.bubbleClass = this.animationClass.end[this.lastBubble];
      setTimeout(() => {
        this.text = false;
      }, "1000");
    }
  }
}
</script>

<style> 
.noCopy {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
}
</style>