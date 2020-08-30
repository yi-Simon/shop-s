"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {
  cartList: []
};
var mutations = {
  RECEIVECARTLIST: function RECEIVECARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
var getters = {
  goodsList: function goodsList(state) {
    return state.cartList;
  }
};
var actions = {
  getCartList: function getCartList(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function getCartList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGetCartList)());

          case 3:
            result = _context.sent;

            if (result.status === 200) {
              commit("RECEIVECARTLIST", result.data.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 修改数量
  updataCart: function updataCart(_ref2, _ref3) {
    var commit, skuId, skuNum, result;
    return regeneratorRuntime.async(function updataCart$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            skuId = _ref3.skuId, skuNum = _ref3.skuNum;
            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqAddtoCart)({
              skuId: skuId,
              skuNum: skuNum
            }));

          case 4:
            result = _context2.sent;

            if (!(result.data.code === 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", "修改数量成功");

          case 9:
            return _context2.abrupt("return", Promise.reject("修改数量失败"));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getCheckCart: function getCheckCart(_ref4, _ref5) {
    var commit, skuId, isCheCked, result;
    return regeneratorRuntime.async(function getCheckCart$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref4.commit;
            skuId = _ref5.skuId, isCheCked = _ref5.isCheCked;
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqCheckCart)(skuId, isCheCked));

          case 4:
            result = _context3.sent;

            if (!(result.data.code === 200)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", "修改选中状态成功");

          case 9:
            return _context3.abrupt("return", Promise.reject(new Error("修改选中状态失败")));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  checkAllCart: function checkAllCart(_ref6, isCheCked) {
    var commit = _ref6.commit,
        state = _ref6.state,
        dispatch = _ref6.dispatch;
    var promises = [];
    console.log(isCheCked);
    state.cartList.forEach(function (item) {
      if (item.isCheCked === isCheCked) return;
      var promise = dispatch("getCheckCart", {
        skuId: item.skuId,
        isCheCked: isCheCked
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  },
  delCart: function delCart(_ref7, skuId) {
    var commit, result;
    return regeneratorRuntime.async(function delCart$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref7.commit;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _api.deleteCart)(skuId));

          case 3:
            result = _context4.sent;

            if (!(result.data.code === 200)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", "删除成功");

          case 8:
            return _context4.abrupt("return", Promise.reject(new Error("删除失败")));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  delMultiple: function delMultiple(_ref8, delArr) {
    var commit = _ref8.commit,
        state = _ref8.state,
        dispatch = _ref8.dispatch;
    var promises = delArr.map(function (item) {
      return dispatch("delCart", item);
    });
    return Promise.all(promises);
  }
};
var _default = {
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
};
exports["default"] = _default;