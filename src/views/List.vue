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
  mounted(){
    //  *******待使用*******
    //  // 发送http请求，获取UI类别下的第一页数据
    // this.loadArticles(1, 1, (list)=>{
    //   // list即是发送请求后 响应中的文章列表
    //   this.articles = list;
    // })

    //发送http请求,获取新闻类别的第一页数据
    this.axios.get('/list').then(resule=>{
      console.log(resule);
      // 把服务端返回的类别数组存入data中
      // result.data.results里存储着类别数组 [{},{},{},{}]
      this.category = result.data.results;
    })
  },
  //监听底部选项卡,用于跳转主页以及me
  watch: {
    selected(newval) {
      if (newval == "home") {
        this.$router.push("/list");
      } else if (newval == "me") {
        this.$router.push("/me");
      }
    }
  },

};
</script>