<template>
  <div>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
          <el-menu-item index="/home">
              <i class="el-icon-s-operation"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu :index="String(item.id)"  v-for="item in tableData" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="val in item.children" :key="val.id">
                <el-menu-item :index="val.url" v-if="val.status==1">{{val.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {
      defaultActive:'/home'
    };
  },
  mounted(){
    this.gettableDataAction()
    this.defaultActive=this.$route.path
  },
  computed: {
    ...mapGetters(['tableData'])
  },
  methods: {
    ...mapActions(['gettableDataAction'])
  },
};
</script>
<style lang='stylus' scoped>
.el-aside {
  color: #333;
  text-align: center;
  height: 85vh;
}
.el-menu{
  height: 85vh;
}
</style>