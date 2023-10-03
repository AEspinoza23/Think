import Vue from 'vue';
import Cookie from 'js-cookie';
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps';
const lang = Cookie.get('piensa_language');
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBY-KcN0di9dw96G6HEvyhhbupcVHON6II',
    libraries: 'places', // necessary for places input
    region: lang,
    base_domain: lang,
    language: lang
  },
  installComponents: true
});
