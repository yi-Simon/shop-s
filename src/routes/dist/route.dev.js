"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Home = _interopRequireDefault(require("@/pages/Home"));

var _Search = _interopRequireDefault(require("@/pages/Search"));

var _Register = _interopRequireDefault(require("@/pages/Register"));

var _Login = _interopRequireDefault(require("@/pages/Login"));

var _Detail = _interopRequireDefault(require("@/pages/Detail"));

var _AddCartSuccess = _interopRequireDefault(require("@/pages/AddCartSuccess"));

var _ShopCart = _interopRequireDefault(require("@/pages/ShopCart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [{
  path: "/shopCart",
  name: "shopCart",
  component: _ShopCart["default"]
}, {
  path: "/addToCart",
  name: "addToCart",
  component: _AddCartSuccess["default"]
}, {
  path: "/detail",
  name: "detail",
  component: _Detail["default"]
}, {
  path: "/search",
  component: _Search["default"]
}, {
  path: "/home",
  component: _Home["default"]
}, {
  path: "/search/:keyword?",
  name: "search",
  component: _Search["default"]
}, {
  path: "/register",
  component: _Register["default"]
}, {
  path: "/login",
  component: _Login["default"]
}, {
  path: "/",
  redirect: "/home"
}];
exports["default"] = _default;