<template>
  <div>
    <!-- 导航 -->
    <mt-navbar style="top: 40px" v-model="navactive" fixed>
      <mt-tab-item v-for="(item, i) in category" :key="i" :id="item.id + ''">{{
        item.category_name
      }}</mt-tab-item>
    </mt-navbar>

    <!-- 中部面板 -->
    <mt-tab-container v-model="navactive">
      <mt-tab-container-item id="1">
        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item, i) in articles" :key="i">
          <!-- 文章标题开始 -->
          <div class="articleItem-header">{{ item.title }}</div>
          <!-- 文章标题结束 -->
          <!-- 文章图文信息开始 -->
          <div class="articleItem-wrapper">
            <!-- 文章图像开始  -->
            <div class="articleImg">
              <!-- <img :src="`../assets/articles/${item.image}`" /> -->
              <!-- <img src="../assets/articles/4-methods-to-make-competitive-interactive-works-b.jpg" /> -->
              <img v-if="item.image" :src="item.image" />
            </div>
            <!-- 文章图像结束 -->
            <!-- 文章简介开始 -->
            <div class="articleDes">
              {{ item.created_at }}
            </div>
            <!-- 文章简介结束 -->
          </div>
          <!-- 文章图文信息结束 -->
        </div>
      </mt-tab-container-item>
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
      category: [],
      articles: [],
    };
  },
  mounted() {
      // 发送http请求，获取当前新闻类别下的第一页数据
    this.axios.get(`/list?category_id=10`).then(result=>{
        console.log(result)
        this.articles = result.data.results
    })

    // 发送http请求，获取类别列表
    //也就是头部菜单栏目
    this.axios.get("/category").then((result) => {
      //console.log(result);
      // 把服务端返回的类别数组存入data中
      // result.data.results里存储着类别数组 [{},{},{},{}]
      this.category = result.data.results;
    });
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

  // 监听顶部导航的更新
  navactive(newval) {
    // newval即是当前选中项的id    类别id    cid
    this.axios.get(`/list?category_id=${newval}`).then((result) => {
      console.log(result);
      this.articles = result.data.results;
    });
  },
};
</script>