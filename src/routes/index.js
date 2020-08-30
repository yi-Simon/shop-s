import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./route";

Vue.use(VueRouter);
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    return originPush.call(this, location, resolve, reject);
  } else {
    return originPush.call(this, location).catch(() => {});
  }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    return originReplace.call(this, location, resolve, reject);
  } else {
    return originReplace.call(this, location).catch(() => {});
  }
};

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
