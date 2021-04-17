<template>
  <div>
    <!-- 导航 -->
    <mt-navbar v-model="navactive" fixed>
      <mt-tab-item id="1">推荐</mt-tab-item>
      <mt-tab-item id="2">国内</mt-tab-item>
      <mt-tab-item id="3">国外</mt-tab-item>
      <mt-tab-item id="4">科普</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navactive: "1",
    };
  },
};
</script>