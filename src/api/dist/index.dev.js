"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqCheckCart = exports.deleteCart = exports.reqGetCartList = exports.reqAddtoCart = exports.reqGoodsDetail = exports.reqSearchList = exports.reqFloorList = exports.reqBannerList = exports.reqCateGoryList = void 0;

var _Ajax = _interopRequireDefault(require("@/ajax/Ajax"));

var _mockAjax = _interopRequireDefault(require("@/ajax/mockAjax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reqCateGoryList = function reqCateGoryList() {
  return _Ajax["default"].get("/product/getBaseCategoryList");
};

exports.reqCateGoryList = reqCateGoryList;

var reqBannerList = function reqBannerList() {
  return _mockAjax["default"].get("/banner");
};

exports.reqBannerList = reqBannerList;

var reqFloorList = function reqFloorList() {
  return _mockAjax["default"].get("/floor");
}; //搜索api


exports.reqFloorList = reqFloorList;

var reqSearchList = function reqSearchList(data) {
  return _Ajax["default"].post("/list", data);
};

exports.reqSearchList = reqSearchList;

var reqGoodsDetail = function reqGoodsDetail(skuId) {
  return _Ajax["default"].get("/item/".concat(skuId));
}; //添加到购物车(修改数量)


exports.reqGoodsDetail = reqGoodsDetail;

var reqAddtoCart = function reqAddtoCart(_ref) {
  var skuId = _ref.skuId,
      skuNum = _ref.skuNum;
  return _Ajax["default"].post("/cart/addToCart/".concat(skuId, "/").concat(skuNum));
}; //获取购物车


exports.reqAddtoCart = reqAddtoCart;

var reqGetCartList = function reqGetCartList() {
  return _Ajax["default"].get("/cart/cartList");
}; //删除购物车商品


exports.reqGetCartList = reqGetCartList;

var deleteCart = function deleteCart(skuId) {
  return _Ajax["default"]["delete"]("/cart/deleteCart/".concat(skuId));
}; //切换商品选中


exports.deleteCart = deleteCart;

var reqCheckCart = function reqCheckCart(skuId, isChecked) {
  return _Ajax["default"].get("/cart/checkCart/".concat(skuId, "/").concat(isChecked));
};

exports.reqCheckCart = reqCheckCart;