<template>
<div>
<footer class="mm">
    <span is="router-link" :to="item.path" active-class="active" tag="span" v-for="item in navs" :key="item.name">
        <img :src="item.no_check" v-if="$route.path==item.path" alt="">
        <img :src="item.check" v-else alt="">
        <b>{{item.name}}</b>
    </span>
   
    
</footer>
</div>
</template>
<script>
export default {
components:{
},
data(){
   return {
     navs:[
       {
         name:"首页",
         check:require('../assets/images/public/icon_8.jpg'),
         no_check:require('@/assets/images/public/icon_6.jpg'),
         path:"/home"
       },
       {
         name:"购物车",
         check:require('../assets/images/public/icon_7.jpg'),
         no_check:require('@/assets/images/public/icon_9.jpg'),
         path:"/cart"
       },
       {
         name:"我的",
         check:require('../assets/images/public/icon_5.jpg'),
         no_check:require('@/assets/images/public/icon_10.jpg'),
         path:"/mine"
       }
     ]
   }
},
methods: {
},
}
</script>
<style scoped>
.mm {
  z-index: 999;
  background-color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 1.1rem;
  line-height: 0.6rem;
  width: 100%;
  border-top: 1px solid #ccc;
  display: flex;
  font-size: 16px;
}
.mm span{
  flex: 1;
  text-decoration: none;
  /* line-height: 1.6rem; */
  text-align: center;
  color: #333;
}
.mm .active {
  
  color: rgb(245, 86, 12) !important;
}
.mm img{
  width: 0.4rem;
  height: 0.4rem;
  display: block ;
  margin: 10px auto 0;
}
.mm b{
  display: inline-block;
  text-align: center;
  padding-top: -0.3rem;
}
</style>