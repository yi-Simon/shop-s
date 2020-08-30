import { reqSearchList } from "@/api/index";

const state = {
  searchList: {},
};

const mutations = {
  RECEIVESEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

const getters = {
  searchList: function(state) {
    return state.searchList || [];
  },
  trademarkList: function(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList: function(state) {
    return state.searchList.attrsList || [];
  },
  // goodsList(state) {
  //   return state.searchList.goodsList || [];
  // },
};

const actions = {
  async getSearchList({ commit }, data) {
    const result = await reqSearchList(data);
    if (result.data.code === 200) {
      commit("RECEIVESEARCHLIST", result.data.data);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
