<template>
  <p @click="$router.go(-1)" class="iconfont icon-ai207"></p>
</template>
<script>
export default {
  components: {},
  data() {
    return {
        jian:'<'
    };
  },
  methods: {}
};
</script>
<style scoped>
p{
  font-size: 0.6rem;
  position: relative;
  top: -0.6rem;
  left: -0.2rem;
}
</style>