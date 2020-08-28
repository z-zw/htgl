<template>
  <div>
    <div class="wrap">
      <!-- 头部区域 -->
      <header>
        <div class="logo">
          <img src="../assets/images/index_images/logo.jpg" alt />
        </div>
        <!-- 搜索 -->
        <div class="seach">
          <form action>
            <input type="seach" placeholder="寻找商品" />
          </form>
        </div>
        <!-- 设置 -->
        <div class="set">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <!-- 导航区域 -->
      <div class="nav clearfix">
        <div class="first fl">
          <a href>推荐</a>
          <span></span>
        </div>
        <div class="fl">
          <a href>女装</a>
        </div>
        <div class="fl">
          <a href>鞋包</a>
        </div>
        <div class="fl">
          <a href>居家</a>
        </div>
        <div class="fl">
          <a href>母婴儿童</a>
        </div>
        <div class="fl">
          <a href>美食</a>
        </div>
        <div class="fl">
          <a href>果然</a>
        </div>
        <div class="item"></div>
      </div>
      <!-- banner -->
      <div class="banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in getsBanners" :key="item.id">
              <img :src="$imgUrl+item.img" class="imgb" />
            </div>
          </div>
          <!-- Add Pagination -->
        </div>
      </div>
      <!-- 菜单入口 -->
      <div class="menu">
        <div>
          <img src="../assets/images/index_images/icon_1.jpg" alt />
          <p>限时抢购</p>
        </div>
        <div>
          <img src="../assets/images/index_images/icon_2.jpg" alt />
          <p>积分商城</p>
        </div>
        <div>
          <img src="../assets/images/index_images/icon_3.jpg" alt />
          <p>联系我们</p>
        </div>
        <div @click="$router.push('/shoplist')">
          <img src="../assets/images/index_images/icon_4.jpg" alt />
          <p>商品分类</p>
        </div>
      </div>
      <!-- 秒杀开始 -->
      <div class="seckill">
        <div class="seckill-left">
          <span class="myimage"></span>
          <span class="text">限时秒杀</span>
          <p>每天零点场 好货秒不停</p>
          <div class="time clearfix">
            <span class="times">02</span>
            <span class="timer">:</span>
            <span class="times">16</span>
            <span class="timer">:</span>
            <span class="times">45</span>
            <span class="seckill-one">秒杀</span>
          </div>
          <img src="../assets/images/index_images/shop_5.jpg" alt />
          <div class="price">&yen;14.8</div>
        </div>
        <div class="seckill-right">
          <div class="top">
            <div>
              <span class="text">品牌上新</span>
              <span class="text-one">折</span>
              <p>每日9点 抢大牌</p>
              <img src="../assets/images/index_images/brand.jpg" alt class="item" />
            </div>
            <div class="right">
              <img src="../assets/images/index_images/shop_1.jpg" alt />
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <span class="text">每日十件</span>
              <p>只为你选好货</p>
              <img src="../assets/images/index_images/shop_2.jpg" alt />
            </div>
            <div class="right">
              <span class="text">拼啊</span>
              <p>超级好价拼团</p>
              <img src="../assets/images/index_images/shop_3.jpg" alt />
            </div>
          </div>
        </div>
      </div>
      <!-- 秒杀结束 -->
      <!-- bar图 -->
      <div class="bar">
        <img src="../assets/images/index_images/bar.jpg" alt />
      </div>
      <!-- bar图结束 -->
      <!-- 货物区开始 -->
      <div class="goods">
        <div class="navs">
          <div class="goods-nav naver" @click="biao='v-hot'">热门推荐</div>
          <div class="goods-nav" @click="biao='v-find'">发现好货</div>
          <div class="goods-nav" @click="biao='v-zhuan'">只看专场</div>
          <div class="goods-nav" @click="biao='v-shang'">只看商品</div>
        </div>
        <div :is="biao"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "../../node_modules/swiper/js/swiper.min.js";
import jq from "jquery";
import vHot from "../components/hot";
import vFind from "../components/find";
import vZhuan from "../components/zhuan";
import vShang from "../components/shang";
import { getBannerList } from "../util";
export default {
  components: {
    vHot,
    vFind,
    vZhuan,
    vShang,
  },
  data() {
    return {
      biao: "v-hot",
      getsBanners: [],
    };
  },
  mounted() {
    this.xuan();
    this.banners();
  },
  methods: {
    xuan() {
      jq(".goods-nav").click(function () {
        jq(this).addClass("naver").siblings().removeClass("naver");
      });
    },
    banners() {
      getBannerList().then((res) => {
        if (res.code == 200) {
          this.getsBanners = res.list;
          this.$nextTick(function () {
            let mySwiper = new Swiper(".swiper-container", {
              loop: true,
              autoplay: {
                delay: 1500
              },
            });
          });
        }
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
input[type="seach"] {
  font-size: 18px;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  height: 2rem;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.imgb {
  height: 2rem;
}
</style>