import Ajax from "@/ajax/Ajax";
import mockAjax from "@/ajax/mockAjax";

export const reqCateGoryList = () => Ajax.get("/product/getBaseCategoryList");

export const reqBannerList = () => mockAjax.get("/banner");
export const reqFloorList = () => mockAjax.get("/floor");

//搜索api
export const reqSearchList = (data) => Ajax.post("/list", data);
export const reqGoodsDetail = (skuId) => Ajax.get(`/item/${skuId}`);

//添加到购物车(修改数量)
export const reqAddtoCart = ({ skuId, skuNum }) =>
  Ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

//获取购物车
export const reqGetCartList = () => Ajax.get("/cart/cartList");

//删除购物车商品
export const deleteCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`);

//切换商品选中
export const reqCheckCart = (skuId, isChecked) =>
  Ajax.get(`/cart/checkCart/${skuId}/${isChecked}`);
