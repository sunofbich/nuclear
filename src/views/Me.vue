<template>
    <div>
        <h1>我的</h1>
        <h1>我的</h1>
        <h1>我的</h1>
        <h1>我的</h1>
        <h1>我的</h1>
        <h1>我的</h1>
        <h1>我的</h1>

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
      selected: "me",
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