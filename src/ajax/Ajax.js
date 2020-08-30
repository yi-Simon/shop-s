import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getUUID from "@/util/uuid";

NProgress.configure({ showSpinner: false });

const service = axios.create({
  baseURL: "/api",
  timeout: 20000,
});

service.interceptors.request.use(function(config) {
  NProgress.start();
  config.headers.userTempId = getUUID();
  return config;
});

service.interceptors.response.use(
  function(response) {
    NProgress.done();
    return response;
  },
  function(error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default service;
