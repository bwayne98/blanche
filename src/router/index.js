import { createRouter, createWebHistory } from "vue-router";
import HomeContent from "../views/HomeContent";
import Product from "../views/ProductPage";
import Auth from "../views/AuthView";
import Order from "../views/OrderView";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeContent,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve, reject) => {
          setTimeout(()=>{
            resolve(savedPosition);
          },200)
      });
    }
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve({el: to.hash});
        },200)
      });
    }
    if (to.params.savedPosition){
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve(to.params.savedPosition);
        },200)
      });
    }

    return {top:0,left:0};
  },
});

router.beforeEach((to,form) => {

})

export default router;
