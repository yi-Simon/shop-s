"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _uuid = _interopRequireDefault(require("@/util/uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_nprogress["default"].configure({
  showSpinner: false
});

var service = _axios["default"].create({
  baseURL: "/api",
  timeout: 20000
});

service.interceptors.request.use(function (config) {
  _nprogress["default"].start();

  config.headers.userTempId = (0, _uuid["default"])();
  return config;
});
service.interceptors.response.use(function (response) {
  _nprogress["default"].done();

  return response;
}, function (error) {
  _nprogress["default"].done();

  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;