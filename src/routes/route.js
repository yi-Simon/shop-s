import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

export default [
  {
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart,
  },
  {
    path: "/addToCart",
    name: "addToCart",
    component: AddCartSuccess,
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: Search,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
