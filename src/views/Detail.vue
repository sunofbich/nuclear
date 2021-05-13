<template>
  <div class="detail" style="margin: 40px 0 42px 0">
    <header>
      <!-- 详情页 固定布局页头 -->
      <div class="header-nav"></div>
      <!-- 头部图片位置 暂时用div代替-->
      <div class="header-img">
        <img :src="this.detail.image" alt="" />
        <!-- <img :src="detail.image" alt=""> -->
      </div>
    </header>
    <!-- 头部结束 -->
    <!--正文开始  -->
    <div class="question">
      <!-- 正文导航 -->
      <div class="nav clearfix">
        <div class="nav_img">
          <!-- 作者头像 待修改 -->
          <img src="../assets/logo.png" alt class="n_img" />
        </div>
        <span class="nav_s">{{ detail.created_at }}</span>
        <!-- <span class="nav_a">新浪/刚刚</span> -->

        <router-link to="#" class="nav_a">已订阅</router-link>

        <button class="dz-button" @click="zan">赞{{ detail.dz_number }}</button>
      </div>
      <!-- 导航结束 -->
      <!-- 正文标题 -->
      <div class="headline" v-html="detail.title"></div>
      <!-- 内容信息 -->
      <div class="content" v-html="detail.content"></div>
      <div>
        <!-- <button>赞</button> -->
      </div>
    </div>
    <!-- 用户评论 -->
    <div class="comment">
      <!-- 用户评论上半部分 -->
      <div class="comment_top">
        <div class="ctop_header">
          <span class="c_title">热门评论</span>
          <span class="c_count">{{ comment.length }}</span>
        </div>
        <div>
          <div>
            <table
              class="comment_user"
              
              v-for="(item, i) in comment"
              :key="i"
            >
              <tr class="user-top clearfix">
                <!-- 用户头像 -->
                <td rowspan="2" class="user-top-image">
                  <img  src="user/头像.png" alt />

                  <!-- {{author.avatar}} -->
                </td>
                <!-- 用户名 -->
                <td class="user-right dz">
                  <p>{{ item.user_name }}</p>
                </td>
                <!-- 点赞 -->
                <td class="user-right dz"></td>
                <!-- 点赞数量 -->
                <td class="user-right dz">
                  <!-- <button class="dz-button comment-dz" @click="zan">
                    赞{{ detail.dz_number }}
                  </button> -->
                  {{item.comment_at}}
                </td>
              </tr>
              <tr>
                <!-- <td></td> -->
                <td colspan="3 ">
                  <div class="content_list">{{ item.comment_content }}
                    <div class='comment_menu'>
                  <span @click="zan" ><img src="comment/心.png" alt="">{{ item.dz_comment }}</span>
                  <span><img src="comment/评论.png" alt=""></span>
                  <span><img src="comment/分享.png" alt=""></span>
                  </div>

                  </div>
                </td>
                <!-- <td>
                  <div class='comment_menu'>
                  <span><img src="comment/心.png" alt=""></span>
                  <span><img src="comment/评论.png" alt=""></span>
                  <span><img src="comment/分享.png" alt=""></span>
                  </div>
                </td> -->
              </tr>
            </table>
            <div>
              <div></div>
              <div>
                <!-- 用户名称 -->
                <!-- <div class="user-name" v-html="" > </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 用户评论下半部分（查看评论） -->

      <div class="comment_bottom">
        <!-- <textarea name id cols="30" rows="10"></textarea>
        <button></button>-->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 详情
      detail: {},
      // 评论
      comment: [],
      flg: true,
      author: {},
    };
  },
  mounted() {
    // 获取新闻id
    let id = this.$route.query.news_id;
    //打印新闻id
    //console.log(id);
    // 声明URL为接口地址
    let url = `/detail?news_id=${id}`;
    //console.log(url);
    this.axios.get(url).then((result) => {
      //打印从服务器端返回的数据
      // console.log(result);
      //把服务器返回的文章对象存入data
      this.detail = result.data.results;
      let test = result.data.results;
      // console.log(test.image.slice(1,-1));
      this.detail.image = test.image.slice(1, -1);
      //header头像

      // this.detail.image = require(`${this.detail.image}`)
      // 处理一下时间  通过毫秒值时间戳  获取moment对象
      // let m = this.moment(detail.created_at);
      // console.log(`11111${m}`)
      // 新增属性create
      // dStr用于保存格式化后的时间字符串;
      // this.detail.createdStr = m.format("YYYY年MM月DD日");
      // moment(m,'MMMM DD YYYY');
    });
    url = `/comment?news_id=${id}`;
    this.axios.get(url).then((result) => {
      //打印从服务器端返回的数据
      console.log(result);
      //把服务器返回的文章对象存入data
      this.comment = result.data.results;
      //评论头像
      //this.comment.avatar = require(`${this.article.avatar}`)
      //处理时间
      let time = result.data.results.comment_at
      var moment = require('moment');
      this.comment.comment_at=moment(time).format('MMMM Do YYYY, h:mm:ss a')
      console.log(this.comment.comment_at)
    });


    //获取评论用户头型信息 路径可以拿到，但是记载不了
    let user_id = this.comment.user_id;
    url = `/avatar?user_id=${id}`;
    this.axios.get(url).then((result) => {
      //打印从服务器端返回的数据
      //console.log(result);
      //把服务器返回的文章对象存入data
      //this.author = result.data.author;
      //评论头像
      this.comment.avatar = result.data.result[0].avatar.slice(1, -1);
      //console.log(this.comment.avatar);
      //this.author.avatar = require(`${this.author.avatar}`)
    });
    //获取点赞
    // url = `/?news_id=${id}`;
    // this.axios.get(url).then((result) => {
    //   //打印从服务器端返回的数据
    //   //console.log(result);
    //   //把服务器返回的文章对象存入data
    //   this.comment = result.data.results;
    // });
  },
  methods: {
    //点赞
    zan: function () {
      if (this.flg) {
        let num = this.comment.dz_comment++;
        let url = "/dz?news_id=${id}";
        this.axios.post(url, num).then((result) => {
          //console.log(result);
          if (result.data.code == 200) {
            this.$toast({
              message: "成功",
            });
          }
        });
      } else {
        this.detail.dz_number--;
        this.flg = true;
      }
    },
    // zan(){
    //   let num =this.comment.dz_comment
    //   this.comment.dz_comment=num++
    // }
  },
};
</script>

<style scoped>
/* 导航样式 */
header {
  /* 设置上边距留出导航栏 */
  margin-top: 40px;
}
.header-img img {
  width: 100%;
  height: 160px;
}
.nav {
  margin-top: 10px;
}
.nav_img {
  width: 60px;
  height: 60px;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  position: absolute;
  top: 175px;
  left: 15px;
}
.n_img {
  width: 100%;
}
.nav_s {
  float: left;
  margin-left: 80px;
  color: #aaa;
}
.nav_a {
  text-decoration: none;
  color: orange;
  float: right;
  margin-right: 10px;
  border: 1px solid orange;
  height: 20px;
  width: 70px;
  text-align: center;
  line-height: 20px;
}
/* 去除浮动 */
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
/*  大标题 */
.headline {
  /* text-align: center; */
  margin: 20px 4% 15px 4%;
  font-size: 24px;
  font-weight: bolder;
}
/* 点赞按钮的样式 */
.dz-button {
  width: 70px;
  height: 22px;
  line-height: 22px;
  background-color: #fff;
  float: right;
  /* box-shadow: #fff; */
  color: orange;
  border: 1px solid orange;
  margin-right: 5px;
  padding-bottom: 2px;
}
/* 每个用户评论的内容 */
.comment_user {
  margin: 15px 3px;
}
/* 评论内容下边框 */
/* .user-top clearfix{
  border-bottom: 1px solid gray;
} */
.content_list {
  /* padding-bottom: 38px; */
  border-bottom: 1px solid gray;
  position: relative;
  /* margin-bottom: 20px; */
}
.comment-dz {
  color: #999;
  border: 1px solid #999;
}
/* 内容 */

.content /deep/ p {
  font-size: 16px;
  /* margin: 0 15px 15px 15px; */
  line-height: 20px;
  text-indent: 32px;
}
.content /deep/ img {
  width: 90%;
  height: 160px;
  margin: 0 auto;
}

/* 评论部分 */
.user-top {
  margin: 10px 3% 5px 3%;
  /* width: 100%; */
}
.user-top-image {
  /* height: 45px; */
  width: 30px;
  border-radius: 50%;

  padding-top: 5px;
  /* float: left; */
}

.user-right /deep/ p {
  padding-bottom: 3px;
  font-size: 20px;
  font-weight: bold;
}
.user-top /deep/ img {
  width: 100%;
}
.c_title {
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.c_count {
  margin-left: 5px;
  color: #777;
  font-size: 14px;
}

/* 评论的下边距根据底部导航栏决定 */
.comment_top {
  margin: 15px 10px 15px 10px;
}
/**********************************************/

/* 点赞部分 */
table {
  width: 80%;
}
.dz {
  width: 28%;
}
.comment_ment{
  position: absolute;
  right: 0;
  bottom: 0;
}
.comment_menu /deep/ img{
  width: 20px;
  /* display: block; */
  /* float: right; */
  margin:10px 2px 0 0 ;
}
</style>



