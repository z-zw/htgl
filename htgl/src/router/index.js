import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const route = new Router({
  mode:'history',
  routes: [
   {
     path:'/login',
     component:()=>import('../pages/login.vue')
   },
   {
    path:'/index',
    component:()=>import('../pages/index.vue'),
    children:[
      {
        path:'/home',
        component:()=>import('../views/home.vue')
      },
      {
        path:'/menu',
        component:()=>import('../views/menu.vue'),
        meta:{
          name:"菜单管理"
        }
      },
      {
        path:'/role',
        component:()=>import('../views/role.vue'),
        meta:{
          name:"角色管理"
        }
      },
      {
        path:'/user',
        component:()=>import('../views/user.vue'),
        meta:{
          name:"管理员管理"
        }
      },
      {
        path:'/classify',
        component:()=>import('../views/classify.vue'),
        meta:{
          name:"商品分类"
        }
      },
      {
        path:'/specs',
        component:()=>import('../views/specs.vue'),
        meta:{
          name:"商品规格"
        }
      },
      {
        path:'/manage',
        component:()=>import('../views/manage.vue'),
        meta:{
          name:"商品管理"
        }
      },
      {
        path:'/member',
        component:()=>import('../views/member.vue'),
        meta:{
          name:"会员管理"
        }
      },
      {
        path:'/banner',
        component:()=>import('../views/banner.vue'),
        meta:{
          name:"轮播图管理"
        }
      },
      {
        path:'/seckill',
        component:()=>import('../views/seckill.vue'),
        meta:{
          name:"秒杀活动"
        }
      },
      {
        path:'',
        redirect:'/home'
      }
    ]
  },
   {
     path:'*',
     redirect:'/index'
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
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  if (token) {
    next()
    return
  }
  //以上都没有就跳转登录
  next('/login')
})
export default route
