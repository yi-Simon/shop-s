"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getUUID;

var _uuid = require("uuid");

function getUUID() {
  var userTempId = localStorage.getItem("USER_TEMPID");

  if (!userTempId) {
    userTempId = (0, _uuid.v4)();
    localStorage.setItem("USER_TEMPID", userTempId);
  }

  return userTempId;
}