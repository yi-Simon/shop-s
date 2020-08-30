import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
import home from "./home";
import swiper from "./swiper";
import search from "./search";
import detail from "./detail";
import cart from "./cart";

const state = {};
const mutations = {};
const getters = {};
const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    home,
    swiper,
    search,
    detail,
    cart,
  },
});
