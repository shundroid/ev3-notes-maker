import Vue from 'vue'
import VueMaterial from 'vue-material'
import Electron from 'vue-electron'
import "vue-material/dist/vue-material.css"

Vue.use(Electron)
Vue.use(VueMaterial)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')

if (process.env.NODE_ENV === 'development') {
  require('electron-connect').client.create();
}
