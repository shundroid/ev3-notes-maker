import Vue from "vue";
import VueMaterial from "vue-material";
import App from "./App.vue";
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);

import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
  App.store = store;
  new Vue(App).$mount("#app");
});
