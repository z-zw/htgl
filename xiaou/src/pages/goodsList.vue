<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.name" left-text="返回" left-arrow></van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.id" :title="item.goodsname" :to="'/shopDetail/'+item.id"/>
      <van-empty v-if='list.length==0' description="没有商品啦" />
    </van-list>
  </div>
</template>

<script>
import { getGoodsList, getGoods } from "../util";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      getGoodsList({
        fid: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
            console.log(res)
          this.list = res.list?res.list:[];
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
</style>
