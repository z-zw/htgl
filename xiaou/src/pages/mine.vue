<template>
  <div>
    <div class="wrap">
      <header>
        <!-- arrow -->
        <div class="arrow"></div>
        <div class="text">我的订单</div>
        <!-- 设置 -->
        <div class="set">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div class="head">
        <div class="head-one">
             <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2894140598,3632576954&fm=26&gp=0.jpg" v-if="userInfo" />
          <img src="../assets/images/mine_images/head.jpg" v-else />

        </div>
        <div class="head-two">
          <p v-if="userInfo">{{userInfo.nickname}}</p>
          <p v-else>未登录</p>
        </div>
        <div class="head-three">每日签到</div>
      </div>
      <div class="aside">
        <div class="aside-one">
          <img src="../assets/images/mine_images/icon_1.jpg" alt />
          <p>全部订单</p>
        </div>
        <div class="aside-two">
          <img src="../assets/images/mine_images/icon_2.jpg" alt />
          <p>待付款</p>
        </div>
        <div class="aside-three">
          <img src="../assets/images/mine_images/icon_3.jpg" alt />
          <p>待收货</p>
        </div>
      </div>
      <div class="bodys-first-one">
        <div class="bodys body-first">
          <img src="../assets/images/mine_images/icon_4.jpg" alt />
          <div class="bodys-one">
            <span>地址管理</span>
          </div>
          <img src="../assets/images/public/right.jpg" alt />
        </div>
        <div class="bodys body-second">
          <img src="../assets/images/mine_images/icon_5.jpg" alt />
          <div class="bodys-one">
            <span>我的钱包</span>
          </div>
          <p>200余额</p>
          <img src="../assets/images/public/right.jpg" alt />
        </div>
        <div class="bodys body-third">
          <img src="../assets/images/mine_images/icon_6.jpg" alt />
          <div class="bodys-one">
            <span>我的优惠券</span>
          </div>
          <img src="../assets/images/public/right.jpg" alt />
        </div>
        <div class="bodys body-fourth">
          <img src="../assets/images/mine_images/icon_7.jpg" alt />
          <div class="bodys-one">
            <span>我的二维码</span>
          </div>
          <img src="../assets/images/public/right.jpg" alt />
        </div>
        <div class="bodys body-fifth">
          <img src="../assets/images/mine_images/icon_8.jpg" alt />
          <div class="bodys-one">
            <span>我的小伙伴</span>
          </div>
          <img src="../assets/images/public/right.jpg" alt />
        </div>
        <van-button @click="logout" type="info" style="background:#cccccc;fontSize:30px">退出登录</van-button>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("loginInfo")
      ? JSON.parse(sessionStorage.getItem("loginInfo"))
      : "";
  },
  methods: {
      logout() {
      sessionStorage.removeItem("loginInfo");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/mine.css";
</style>