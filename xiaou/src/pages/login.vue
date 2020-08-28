<template>
  <div>
    <div class="wrap">
      <header>
        <!-- arrow -->
        <div class="arrow"></div>
        <div class="text">登录</div>
        <!-- 设置 -->
        <div class="set" @click="$router.push('/register')">
          <b>注册</b>
        </div>
      </header>
      <div class="box">
        <span>手机号:</span>
        <input type="text" v-model="loginList.phone" />
        <br />
        <span>密码:</span>
        <input type="passwrad" v-model="loginList.password" />
        <p class="fr">忘记密码</p>
        <button>
          <b @click="goLogin">登录</b>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { login } from "../util";
export default {
  data() {
    return {
      loginList: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    goLogin() {
      login(this.loginList).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
          //把登录信息存储到本地存储中
          sessionStorage.setItem("loginInfo", JSON.stringify(res.list));
          this.$router.push("/mine");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/login.css";
</style>
