import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

const Auth = () => import (/* webpackChunkName: "auth" */ '@/views/AuthView.vue' )
const About = () =>  import(/* webpackChunkName: "about" */ "@/views/AboutView.vue")
const Blogs = () =>  import(/* webpackChunkName: "blogs" */ "@/views/BlogsView.vue")
const BlogDetails = () =>  import(/* webpackChunkName: "blogs" */ "@/views/BlogsDetailsView.vue")
// const BlogDetailsEdit = () =>  import(/* webpackChunkName: "blogs" */ "@/views/BlogDetailsEditView.vue")

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
    path: "/blogs",
    name: "blogs",
    component: Blogs,
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
  {
    path: "/blogs/:id",
    name: "blog-details",
    component: BlogDetails,
    meta: {
      requiresAuth: true,
    }
  },
  // {
  //   path: "/blogs/:id/edit",
  //   name: "blog-details-edit",
  //   component: BlogDetailsEdit,
  //   meta: {
  //     requiresAuth: true,
  //   }
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const authPages = ['/auth']
  const user_token = JSON.parse(localStorage.getItem('user-token')) 
  const isAuthenticated = user_token != null;
  // console.log(user)

  // Protect routes that require auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/auth')
  }

  // Prevent logged-in users from visiting signin/signup
  if (authPages.includes(to.path) && isAuthenticated) {
    return next('/')
  }

  return next()
})
export default router;
