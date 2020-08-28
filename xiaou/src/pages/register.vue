<template>
 <div>
<div class="wrap">
        <header>
            <!-- arrow -->
            <div class="arrow">
                
            </div>
            <div class="text">
                注册
            </div>
            <!-- 设置 -->
            <div class="set" @click="$router.push('/login')">
                <b>登录</b>
            </div>
        </header>
        <div class="box">
            <span>昵称:</span>
            <input type="text" v-model="regList.nickname"><br>
            <span>手机号:</span>
            <input type="text" v-model="regList.phone">
            <span>密码:</span>
            <input type="password" v-model="regList.password"><br>
            <button>
                <b @click="goRegister">注册</b>
            </button>
            <div class="first"><input type="checkbox">
            <span>我已同意并使用</span><span>条款和隐私政策</span>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
import { Toast } from "vant";
import { register } from "../util";
export default {
 data() {
 return {
     regList: {
        phone: "",
        nickname: "",
        password: "",
      },
 };
 },
 methods: {
     goRegister() {
      register(this.regList).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
          this.$router.push("/login");
        }else{
            Toast.fail(res.msg)
        }
      });
    },
 },
};
</script>

<style lang="" scoped>
@import '../assets/css/register.css'
</style>
