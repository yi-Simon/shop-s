import Vue from "vue";
import App from "./App.vue";
import router from "@/routes";
import store from "@/store";
import "@/mock/mockServer";

import Swiper from "@/components/Swiper";
import TypeNav from "@/components/TypeNav";
import Pagination from "@/components/Pagination";

Vue.component("TypeNav", TypeNav);
Vue.component("Swiper", Swiper);
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    },
  },
}).$mount("#app");
