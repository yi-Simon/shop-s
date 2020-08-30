import { reqBannerList, reqFloorList } from "@/api";

const state = {
  bannerList: [],
  floorList: [],
};
const mutations = {
  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const getters = {
  bannerList: function(state) {
    return state.bannerList;
  },
  floorList: function(state) {
    return state.floorList;
  },
};
const actions = {
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.status === 200) {
      commit("RECEIVEBANNERLIST", result.data.data);
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.status === 200) {
      commit("RECEIVEFLOORLIST", result.data.data[0].carouselList);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
