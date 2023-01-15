// Layouts
import DefaultLayout from "@layouts/Default";
import MobileLayout from "@layouts/mobile";

// Style
import "@assetsScss/bootstrap/bootstrap.scss";
import "@assetsScss/main/styles.scss";
import "@assetsLess/styles.less";
// CSS

// Custom JS scripts
// import './assets/js/'
import "@assets/js/bootstrap";

// Vue.js
import Vue from "vue";
import App from "@/App";
import store from "@store";
import router from "@router";
import axios from "axios";

// axios default
window.axios = axios;
axios.defaults.baseURL = "https://";


Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

// Vue components (for use in html)
Vue.component("default-layout", DefaultLayout);
Vue.component("mobile-layout", MobileLayout);

Vue.config.productionTip = false; // Отключаем всплывающую подсказку Vue при запуске
// Vue init
const app = new Vue({
  el: "#app",
  store,
  router,
  // beforeCreate() {
  //   Vue.prototype.$http = axios
  //   axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  //   axios.defaults.xsrfCookieName = 'csrftoken'
  // },
  render: h => h(App)
});

// axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'Authorization': 'Bearer ' + App.apiToken,
// };
