<template>
  <div>
    <!-- 导航 -->
    <mt-navbar v-model="navactive" fixed>
      <mt-tab-item id="1">推荐</mt-tab-item>
      <mt-tab-item id="2">国内</mt-tab-item>
      <mt-tab-item id="3">国外</mt-tab-item>
      <mt-tab-item id="4">科普</mt-tab-item>
    </mt-navbar>

    <!-- 中部面板 -->
    <mt-tab-container v-model="navactive">
      <mt-tab-container-item id="1">
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
        <h1>面板1</h1>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">2</mt-tab-container-item>
      <mt-tab-container-item id="3">3</mt-tab-container-item>
      <mt-tab-container-item id="4">4</mt-tab-container-item>
    </mt-tab-container>

    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img
          v-if="selected == 'home'"
          src="../assets/home/main_1.png"
          slot="icon"
        />
        <img v-else src="../assets/home/main_0.png" slot="icon" />
      </mt-tab-item>
      <mt-tab-item id="me">
        <img
          v-if="selected == 'me'"
          src="../assets/home/me_1.png"
          slot="icon"
        />
        <img v-else src="../assets/home/me_0.png" slot="icon" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      navactive: "1",
      selected: "home",
    };
  },
  //监听底部选项卡,用于跳转主页以及me
  watch: {
    selected(newval) {
      if (newval == "home") {
        this.$router.push("/list");
      } else if (newval == "me") {
        this.$router.push("/me"); 
      }
    },
  },
};
</script>