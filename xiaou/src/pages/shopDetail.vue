<template>
<div>
   <div class="wrap">
        <header>
            <!-- arrow -->
            <div class="arrow">
                <go-back></go-back>
            </div>
            <div class="text">
                商品详情
            </div>
            <!-- 设置 -->
            <div class="set">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
        <div class="introduce">
           
        </div>
        <div class="name">
            <p>{{name}}</p>
            <span class="text">&yen;123.00</span>
            <span class="explain">(此价格不与套装优惠同时享受)</span>
        </div>
        <!-- 商品属性 -->
        <div class="attribute">
            <div class="upper">
                <div class="item">
                    <span class="text">促销：</span>
                    <span class="text-one">满减</span>
                    <span class="text-two">满2件9折 ；3件8折</span>
                </div>
                <div class="image">
                    <img src="../assets/images/detail_images/arrow.jpg" alt="">
                </div>
                
            </div>
           <div class="center">
               <p>购买数量</p>
               <div class="number">
                   <span>-</span>
                   <span>1</span>
                   <span>+</span>
               </div>
           </div>
            <div class="lower">
                <div>
                    <p>商品属性</p>
                    <span class="item">规格</span>
                    <span class="item-one">30g</span>
                    <span class="item-two">5g</span>
                </div>
                <img src="../assets/images/detail_images/arrow.jpg" alt="">
            </div> 
            
        </div>
        <!-- 商品详情 -->
        <div class="explain">
            <div class="text">
                <span> 商品详情</span>
                <div class="image">
                    <img src="../assets/images/detail_images/pic_3.jpg">
                    <img src="../assets/images/detail_images/pic_4.jpg">
                    <img src="../assets/images/detail_images/pic_5.jpg">
                    <img src="../assets/images/detail_images/pic_6.jpg">
                    <img src="../assets/images/detail_images/pic_7.jpg">
                </div>
                
            </div>

        </div>
        <div class="evaluate">
            <div class="text">
                <span >商品评价</span>
            </div>
            <div class="item">
                <span>1235668fg</span>
                <p>效果很好，物流到位，下次继续来</p>
                <div class="image clearfix">
                    <img src="../assets/images/detail_images/pic_8.jpg">
                    <img src="../assets/images/detail_images/pic_9.jpg">
                    <img src="../assets/images/detail_images/pic_10.jpg">
                </div>
                <div class="time">
                    2020-01-13
                </div>
               
                </div>
                <div class="box">
                    <span>共1000+条评论</span>
                    <span>查看更多></span>
            </div>

        </div>
        <div class="foot">
            <div class="car">
                <img src="../assets/images/public/icon_7.jpg" alt="">
             <p>购物车</p>
             <span>2</span>
            </div>
            <div class="item">
                加入购物车
            </div>
            <div class="items">
                立即购买
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
components:{
},
data(){
   return {
      id:"",
      name:""
   }
},
methods: {
},
mounted() {
    let {id,name}=this.$route.params;
    this.id = id;
    this.name=name
},
}
</script>
<style scoped>
@import '../assets/css/detail.css'
</style>