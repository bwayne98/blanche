import { createRouter, createWebHistory } from "vue-router";
import HomeContent from "../views/HomeContent";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){
    if (savedPosition){
      return new Promise((resolve, reject) =>{
        window.onload=()=>{
          resolve(savedPosition)
        }
      })
    }else if (to.hash){
      return new Promise((resolve, reject) =>{
        window.onload=()=>{
          resolve({top:document.querySelector(to.hash).offsetTop})
        }
      })
    }else{
      return { top:0,left:0 }
    }
  }
});

export default router;
