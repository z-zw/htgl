<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>
<script>
export default {
components:{
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
.el-breadcrumb
    line-height 40px

</style>