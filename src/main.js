import Vue from "vue";
import VueMaterial from "vue-material";
import App from "./App.vue";
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);

document.addEventListener("DOMContentLoaded", () => {
  new Vue(App).$mount("#app");
});
