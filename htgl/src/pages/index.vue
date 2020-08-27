<template>
<div>
<el-container>
  <el-header>
    <p>xxx管理系统</p>
    <div v-if="nickname">
          用户名：{{nickname}}
          <el-button @click='logout' type='danger' size='mini'>退出</el-button>
        </div>
    </el-header>
  <el-container>
    <v-nav></v-nav>
    <el-main>
      <v-bread></v-bread>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>
<script>
import vNav from '../components/nav'
import vBread from '../components/bread'
export default {
components:{
   vNav,
   vBread
},
data(){
   return {
     nickname:''
   }
},
mounted() {
  let userInfo  = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
    this.nickname = userInfo.username
},
methods: {
  logout(){
      sessionStorage.removeItem('userInfo')
      this.$router.push('/login')
    }
},
}
</script>
<style lang='stylus' scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height : 15vh;
    line-height 10vh
  }
  .el-header p{
    float left
  }
   .el-header div{
    float right 
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    width 100vw;
    height 85vh
  }
</style>