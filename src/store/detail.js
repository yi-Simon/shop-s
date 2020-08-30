import { reqGoodsDetail } from "@/api";

const state = {
  goodsDetail: {},
};
const mutations = {
  RECEIVEDETAILLIST(state, goodsDetail) {
    state.goodsDetail = goodsDetail;
  },
};
const getters = {
  categoryView: function(state) {
    return state.goodsDetail.categoryView || {};
  },
  skuInfo: function(state) {
    return state.goodsDetail.skuInfo || {};
  },
  spuSaleAttrList: function(state) {
    return state.goodsDetail.spuSaleAttrList || [];
  },
};
const actions = {
  async getGoodsDetail({ commit }, skuId) {
    const result = await reqGoodsDetail(skuId);
    if (result.status === 200) {
      commit("RECEIVEDETAILLIST", result.data.data);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
