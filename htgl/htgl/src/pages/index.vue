<template>
<div>
<el-container>
  <el-header>xxx管理系统</el-header>
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
   }
},
methods: {
},
}
</script>
<style lang='stylus' scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height : 15vh;
  }
  
  
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    width 100vw;
    height 85vh
  }
</style>