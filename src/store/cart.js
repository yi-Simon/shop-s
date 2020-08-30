import { reqGetCartList, reqCheckCart, deleteCart, reqAddtoCart } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  RECEIVECARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const getters = {
  goodsList(state) {
    return state.cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    const result = await reqGetCartList();
    if (result.status === 200) {
      commit("RECEIVECARTLIST", result.data.data);
    }
  },
  // 修改数量
  async updataCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddtoCart({ skuId, skuNum });
    if (result.data.code === 200) {
      return "修改数量成功";
    } else {
      return Promise.reject("修改数量失败");
    }
  },
  async getCheckCart({ commit }, { skuId, isCheCked }) {
    const result = await reqCheckCart(skuId, isCheCked);

    if (result.data.code === 200) {
      return "修改选中状态成功";
    } else {
      return Promise.reject(new Error("修改选中状态失败"));
    }
  },
  checkAllCart({ commit, state, dispatch }, isCheCked) {
    let promises = [];
    console.log(isCheCked);
    state.cartList.forEach((item) => {
      if (item.isCheCked === isCheCked) return;
      let promise = dispatch("getCheckCart", {
        skuId: item.skuId,
        isCheCked: isCheCked,
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },
  async delCart({ commit }, skuId) {
    const result = await deleteCart(skuId);
    if (result.data.code === 200) {
      return "删除成功";
    } else {
      return Promise.reject(new Error("删除失败"));
    }
  },
  delMultiple({ commit, state, dispatch }, delArr) {
    let promises = delArr.map((item) => {
      return dispatch("delCart", item);
    });
    return Promise.all(promises);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
