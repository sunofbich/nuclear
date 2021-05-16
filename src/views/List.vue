<template>
  <div class="list">
    <!-- 导航 -->
    <mt-navbar style="top: 0" v-model="navactive" fixed>
      <mt-tab-item
        v-for="(item, i) in category"
        :key="i"
        :id="item.category_id + ''"
        >{{ item.category_name }}</mt-tab-item
      >
    </mt-navbar>

    <!-- 中部面板 -->
    <mt-tab-container
      style="margin-top: 46px; margin-bottom: 43px"
      v-infinite-scroll="showmore"
      infinite-scroll-distance="20"
      infinite-scroll-disabled="busy"
      :infinite-scroll-immediate-check="true"
    >
      <mt-tab-container-item>
        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item, i) in articles" :key="i" >
          <router-link :to="`/detail?news_id=${item.news_id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">{{ item.title }}</div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg">
                <img :src="`${item.image}`.slice(1, -1)" />
                <!-- <img src="../assets/articles/4-methods-to-make-competitive-interactive-works-b.jpg" /> -->
                <!-- 图片没有   <img v-if="item.image" :src="item.image" /> -->
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章点赞数量开始 -->
              <div class="articleDes">
                {{ item.created_at }}
              </div>
              <div>

              </div>
              <!-- 文章简介结束 -->
            </div>
          </router-link>
          <!-- 文章图文信息结束 -->
        </div>


        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item, i) in articles" :key="i+10">
          <router-link :to="`/detail?news_id=${item.news_id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">{{ item.title }}</div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg">
                <img :src="`${item.image}`.slice(1, -1)" />
                <!-- <img src="../assets/articles/4-methods-to-make-competitive-interactive-works-b.jpg" /> -->
                <!-- 图片没有   <img v-if="item.image" :src="item.image" /> -->
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
                {{ item.created_at }}
              </div>
              <div>

              </div>
              <!-- 文章简介结束 -->
            </div>
          </router-link>
          <!-- 文章图文信息结束 -->
        </div>
        <!-- 底线 -->
        <div v-if="reachBottom" class="rb"><span style="margin:8px 0 3px 0">京ICP备2021014196号-1</span>
</div>
      </mt-tab-container-item>
      
    </mt-tab-container>
  </div>
</template>



<script>
export default {
  data() {
    return {
      navactive: "10",
      selected: "home",
      category: [],
      articles: [],
      busy: false,
      page: 1,
      reachBottom: false, //判断是否到达底部
    };
  },
  methods: {

    // 异步加载文章列表  通过callback执行回调
    loadArticles(cid, page, callback) {
      let url = `/list?cid=${cid}&page=${page}`;
      this.axios.get(url).then((result) => {
        // 判断是否已经到达底部
        if (this.page >= result.data.pagecount) {
          // 当前页已经大于等于最大页数  => 到底了
          this.reachBottom = true;
        }
        // 执行回调方法
        callback(result.data.results);
      });
    },
    // 当触发触底事件后执行
    showmore() {
      if (this.reachBottom) {
        return;
      }
      // busy = true 发请求，拿响应，追加列表
      this.busy = true;
      let cid = this.navactive;
      this.page++;
      this.loadArticles(cid, this.page, (list) => {
        // 把list，追加到当前列表末尾
        this.articles = this.articles.concat(list);
        this.busy = false;
      });
    },
  },
  mounted() {
    // 发送http请求，获取当前新闻类别下的第一页数据
    this.axios.get(`/list?category_id=10`).then((result) => {
       console.log(result);
      this.articles = result.data.results;
    });
    // 发送http请求，获取类别列表
    //也就是头部菜单栏目
    this.axios.get("/category").then((result) => {
      //console.log(result);
      // 把服务端返回的类别数组存入data中
      // result.data.results里存储着类别数组 [{},{},{},{}]
      this.category = result.data.results;
    });
  },
  watch: {
    // 监听顶部导航的更新
    navactive(newval) {
      // 把page变量重置为1
      console.log(newval);
      this.page = 1;
      this.axios.get(`list?category_id=${newval}`).then((result) => {
        console.log(result);
        this.articles = result.data.results;
      });
    },
  },
};
</script>



<style>
.list{
margin-top:40px}
.list .articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.list .articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.list .articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.list .articleImg {
  margin-right: 15px;
}
.list .articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.list .articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
.rb{
  text-align: center;
}
</style>