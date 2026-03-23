import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

const Auth = () => import (/* webpackChunkName: "auth" */ '@/views/AuthView.vue' )
const About = () =>  import(/* webpackChunkName: "about" */ "@/views/AboutView.vue")

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
     meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
    }
     
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const authPages = ['/auth']
  const user_token = JSON.parse(localStorage.getItem('user-token')) 
  // console.log(user)

  // Protect routes that require auth
  if (to.meta.requiresAuth && !user_token) {
    return next('/auth')
  }

  // Prevent logged-in users from visiting signin/signup
  if (authPages.includes(to.path) && user_token) {
    return next('/about')
  }

  return next()
})
export default router;
