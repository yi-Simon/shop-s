"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = _interopRequireDefault(require("vuex"));

var _vue = _interopRequireDefault(require("vue"));

var _home = _interopRequireDefault(require("./home"));

var _swiper = _interopRequireDefault(require("./swiper"));

var _search = _interopRequireDefault(require("./search"));

var _detail = _interopRequireDefault(require("./detail"));

var _cart = _interopRequireDefault(require("./cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var state = {};
var mutations = {};
var getters = {};
var actions = {};

var _default = new _vuex["default"].Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  modules: {
    home: _home["default"],
    swiper: _swiper["default"],
    search: _search["default"],
    detail: _detail["default"],
    cart: _cart["default"]
  }
});

exports["default"] = _default;