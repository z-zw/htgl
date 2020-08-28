import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Home from '@/pages/home'
import Cart from '@/pages/cart'
import Mine from '@/pages/mine'
import Shoplist from '@/pages/shopList'
import Shopdetail from '@/pages/shopDetail'
Vue.use(Router)
const route = new Router({
  routes: [
    {
      path:"/",
      component:Index,
      children:[
        {
          path:"/home",
          component:Home
        },
        {
          path:"/cart",
          component:Cart
        },
        {
          path:"/mine",
          component:Mine
        },
        {
          path:"",
          redirect:"/home"
        }
      ]
    },
    {
      path:"/shoplist",
      component:Shoplist
    },
    {
      path:"/shopDetail/:id",
      component:Shopdetail
    },
    {
      path:"/goodsList",
      component:()=>import('../pages/goodsList.vue'),
      meta:{
        name:"商品列表"
      }
    },
    {
      path:"/login",
      component:()=>import('../pages/login.vue')
    },
    {
      path:"/register",
      component:()=>import('../pages/register.vue')
    },
    {
      path:"*",
      redirect:"/"
    }
  ]
});
//全局前置导航钩子函数
route.beforeEach((to, from, next) => {
  //你跳转的页面是不是登录 是就 next
  if (to.path == '/login') {
    next()
    return
  }
  //去的不是登录 ，就看是否登录，如果登录就next
  let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token : ''
  if (token) {
    next()
    return
  }
  //以上都没有就跳转登录
  next('/login')
})
export default route