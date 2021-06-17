import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueToastify from "vue-toastify";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import fs from 'fs'
// import path from 'path'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {store} from './store.js'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToastify, {
  position: "top-right",
  iconEnabled: false,
  errorDuration: 1000,
  successDuration: 1000,
  warningInfoDuration: 1000
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')