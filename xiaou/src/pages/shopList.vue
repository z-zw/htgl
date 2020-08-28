<template>
  <div>
    <div class="wrap">
      <header>
        <!-- arrow -->
        <div class="arrow">
          <go-back></go-back>
        </div>
        <div class="text">商品分类</div>
        <!-- 设置 -->
        <div class="set">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <div class="goodsShow">
        <!-- 侧边栏导航 -->
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item class="siders" v-for="item in firstList" :key="item.id" :title="item.catename" />
        </van-sidebar>
        <!-- 右侧展示 -->
        <van-grid :border="false" :column-num="3" :gutter="5">
          <van-grid-item v-for="item in secondList" :key="item.id" :to="'/goodsList?id='+item.id">
            <van-image :src="$imgUrl+item.img" />
            <p>{{item.catename}}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { getCateTree } from "../util";
export default {
  components: {},
  data() {
    return {
      activeKey: 0,
      firstList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getTreeInfo();
  },
  methods: {
    getTreeInfo() {
      getCateTree().then((res) => {
        if (res.code == 200) {
          this.firstList = res.list;
          this.secondList = res.list[this.activeKey].children;
        }
      });
    },
    toDetail(i, n) {
      this.$router.push("/shopDetail/" + i + "/" + n);
    },
    onChange(n) {
      this.secondList = this.firstList[n].children;
    },
  },
};
</script>
<style scoped>
@import "../assets/css/classinfy.css";
.goodsShow {
  display: flex;
  flex-wrap: wrap;
}
.van-grid {
  flex: 1;
}
.siders{
    font-size: 20px;
    padding: 0.3rem;
}
p{
    font-size: 20px;
}
</style>