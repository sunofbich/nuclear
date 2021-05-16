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
    <div class="question" style="margin: 0 5px">
      <!-- 正文导航 -->
      <div class="nav clearfix">
        <div class="nav_img">
          <!-- 作者头像 待修改 -->
          <img :src="detail.author_avatar" alt class="n_img" />
        </div>
        <span class="nav_s">{{ detail.created_at }}</span>
        <!-- <span class="nav_a">{{detail.author_name}}</span> -->

        <button @click="follow" class="nav_a">
          <span v-if="following == 1">已订阅</span>
          <span v-else>订阅</span>
          <!-- <span>订阅</span>    -->
        </button>
        <!-- <router-link to="#" @click="follow" class="nav_a">已订阅</router-link> -->

        <span v-model="dznumber" class="dz-button">
          <img width="20px" @click="zan" src="comment/点赞1.png" alt="" />
          {{ this.dznumber }}</span
        >
      </div>
      <!-- 导航结束 -->
      <!-- 正文标题 -->
      <div class="headline" v-html="detail.title"></div>
      <!-- 内容信息 -->
      <div class="content" v-html="detail.content"></div>
      <div>
        <!-- <button>赞</button> -->
      </div>
      <span class="news_from">文章来源:{{ detail.author_name }}</span>
    </div>
    <!-- 用户评论 -->
    <div class="comment">
      <!-- 用户评论上半部分 -->
      <div class="comment_top">
        <div class="ctop_header">
          <span class="c_title">热门评论</span>
          <span class="c_count">{{ comment.length }}</span>
        </div>
        <!-- 评论 -->
        <div class="addComment">
          <div>
            <input v-model="add_comment" type="text" />
          </div>
          <div>
            <button @click="addComment">提交</button>
          </div>
        </div>
        <div>
          <div>
            <table class="comment_user" v-for="(item, i) in comment" :key="i">
              <tr class="user-top clearfix">
                <!-- 用户头像 -->
                <td rowspan="2" class="user-top-image">
                  <img :src="item.avatar.slice(1, -1)" alt />

                  <!-- {{author.avatar}} -->
                </td>
                <!-- 用户名 -->
                <td class="user-right dz">
                  <p>{{ item.user_name }}</p>
                </td>
                <!-- 点赞 -->
                <!-- <td class="user-right dz"></td> -->
                <!-- 时间戳 -->
                <td class="user-right dz creat_time">
                  <!-- <button class="dz-button comment-dz" @click="zan">
                    赞{{ detail.dz_number }}
                  </button> -->
                  <!-- {{moment(item.comment_at).format('MMMM Do YYYY, h:mm:ss a')}} -->
                  {{ item.comment_at }}
                </td>
              </tr>
              <tr>
                <!-- <td></td> -->
                <td colspan="3 ">
                  <div class="content_list">
                    {{ item.comment_content }}

                    <div class="comment_menu">
                      <span>
                        <img
                          @click="love"
                          :data-id="item.comment_id"
                          v-if="xin == true"
                          src="comment/心1.png"
                          alt=""
                        />
                        <img
                          @click="love"
                          :data-id="item.comment_id"
                          v-else
                          src="comment/心.png"
                          alt=""
                        />

                        {{ item.dz_comment }}</span
                      >
                      <span
                        ><img
                          @click="addreply"
                          :data-id="item.comment_id"
                          src="comment/评论.png"
                          alt=""
                      /></span>
                      <span><img src="comment/分享.png" alt="" /></span>
                    </div>
                  </div>
                  <div>
                    <p>{{ item.reply_text }}</p>
                  </div>
                </td>
              </tr>
            </table>
            <div style="text-align: center; width: 124px; margin: 0 auto"></div>
            <!-- <span><router-link   to="/morecomment">点击查看更多评...</router-link></span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { get } from "../utils/request";
import { post } from "../utils/request";
import { del } from "../utils/request";
export default {
  data() {
    return {
      // 详情
      detail: {},
      // 评论
      comment: [],
      flg: true,
      author: {},
      xin: false,
      title: "",
      add_comment: "",
      dznumber: "",
      comment_id: -1,
      following: 0,
    };
  },
  mounted() {
    //调用封装的get请求
    // 获取新闻id
    var nid = this.$route.query.news_id;
    //获取用户id
    var uid = this.$store.state.user.user_id;
    // 声明URL为接口地址
    let url = `/getdetail?news_id=${nid}`;
    get(url).then((result) => {
      console.log(result);
      //把服务器返回的文章对象存入data
      this.detail = result.data.results;
      //因从服务器获取数据 有多余符号，特此处理
      let err = result.data.results;
      this.detail.image = err.image.slice(1, -1);
      this.detail.author_avatar = err.author_avatar.slice(1, -1);
      this.dznumber = result.data.results.dz_number;
      this.title = result.data.results.title;
      //添加用户历史记录
      let time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      //判断是否登录
      if (this.$store.state.islogin == 1) {
        let param = `user_id=${uid}&title=${this.title}&history_time=${time}&news_id=${nid}`;
        this.axios.post("/history", param).then((result) => {});
      }
      //判断当前用户是否已经关注
      get(
        `/getfollow?user_id=${uid}&author_id=${result.data.results.author_id}`
      ).then((result) => {
        console.log(result);
        if (result.data.result.length == 0) {
          //更新订阅状态
          this.following = 0;
        } else {
          this.following = 1;
        }
      });
    });

    //获得当前新闻评论内容
    url = `/comment?news_id=${nid}`;
    get(url).then((result) => {
      //把服务器返回的文章对象存入data
      this.comment = result.data.results;
      //处理评论的时间
      //获取评论的时间
      let time = result.data.results.comment_at;
      //时间函数
      let moment = require("moment");
      //获取当前时间
      this.comment.comment_at = moment(time).format("MMMM Do YYYY, h:mm:ss a");
    });
  },
  methods: {
    //回复评论
    addreply(e) {
      // 获取新闻id
      //获取用户id
      var uid = this.$store.state.user.user_id;
      if (this.$store.state.islogin == 1) {
        //mintui盒子
        this.$messagebox.prompt("回复评论").then(({ value, action }) => {
          this.comment_id = e.target.dataset.id;
          let param = `reply_text=${value}&user_id=${uid}&comment_id=${this.comment_id}`;
          post("/addreply", param).then((result) => {
            if (result.data.code == 200) {
              this.$toast({
                message: "回复成功",
                position: "center",
                duration: 1000,
              });
            }
          });
        });
      } else {
        this.$toast({
          message: "请先进行登录",
          position: "center",
          duration: 2000,
        });
      }
    },

    //添加新闻评论
    addComment() {
      // 获取新闻id
      var nid = this.$route.query.news_id;
      //获取用户id
      var uid = this.$store.state.user.user_id;
      if (this.$store.state.islogin == 1) {
        let time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
        let num = 0;
        let param = `user_id=${uid}&news_id=${nid}&comment_content=${this.add_comment}&user_name=${this.$store.state.user.user_name}&dz_comment=${num}&comment_at=${time}`;
        post("comment", param).then((result) => {
          if (result.data.code == 200) {
            this.$toast({
              message: "登录成功",
              position: "center",
              duration: 1000,
            });
          } else {
            this.$toast({
              message: "网络不是法外之地！",
              position: "center",
              duration: 1000,
            });
          }
        });
        this.add_comment = "";
      } else {
        this.$toast({
          message: "请先登录！",
          position: "center",
          duration: 2000,
        });
      }
    },

    love(e) {
      // console.log(this.title)
      // this.xin=true,
      // e.srcElement.dataset.item ==  true ? false : true;
    },

    //记录新闻点赞点赞
    zan() {
      // 获取新闻id
      var nid = this.$route.query.news_id;
      //获取用户id
      var uid = this.$store.state.user.user_id;
      this.dznumber++;
      let param = `news_id=${nid}&dz_number=${this.dznumber}`;
      post("/good", param).then((result) => {});
    },

    //关注新闻网站

    follow() {
      //获取用户id
      let uid = this.$store.state.user.user_id;
      let aid = this.detail.author_id;
      //判断登录状态
      if (this.$store.state.islogin == 1) {
        //判断当前用户是否已经关注
        get(`/getfollow?user_id=${uid}&author_id=${aid}`).then((result) => {
          console.log(result);
          if (result.data.result.length == 0) {
            //更新订阅状态
            this.following = 1;
            //存储关注新闻id及用户id
            let param = `user_id=${uid}&author_name=${this.detail.author_name}&author_id=${this.detail.author_id}&author_avatar=${this.detail.author_avatar}`;
            post("/follows", param).then((result) => {
              if (result.data.code == 200) {
                this.$toast({
                  message: "订阅成功",
                  position: "center",
                  duration: 1000,
                });
              }
            });
          } else {
            this.following = 0;
            del(`/dfollows?user_id=${uid}&author_id=${aid}`).then((result) => {
              if (result.data.code == 200) {
                this.$toast({
                  message: "已取消订阅",
                  position: "center",
                  duration: 1000,
                });
              }
            });
          }
        });
      } else {
        this.$toast({
          message: "先登录才可以订阅哦!",
          position: "center",
          duration: 2000,
        });
      }
    },
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
  /* border: 1px solid orange; */
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
  /* background-color: #555; */
  /* float: right; */
  /* box-shadow: #fff; */
  color: gray;
  /* border: 1px solid orange; */
  margin-right: 5px;
  /* padding-bottom: 2px; */
  font-size: 20px;
}
/* 每个用户评论的内容 */
.comment_user {
  margin: 30px 3px 15px 3px;
}
/* 评论内容下边框 */
/* .user-top clearfix{
  border-bottom: 1px solid gray;
} */
.content_list {
  /* padding-bottom: 38px; */
  /* border-bottom: 1px solid gray; */
  position: relative;
  /* margin-bottom: 20px; */
}
.comment-dz {
  color: #999;
  border: 1px solid #999;
}
/* 内容 */
.content {
  text-align: center;
}

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
  text-align: center;
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
  width: 90%;
  border-radius: 50%;
  padding-right: 9px;
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
.comment_ment {
  position: absolute;
  right: 0;
  bottom: 0;
}
.comment_menu /deep/ img {
  width: 20px;
  /* display: block; */
  /* float: right; */
  margin: 0px 5px;
}
.comment_ment /deep/ span {
  line-height: 30px;
}
.creat_time {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  margin-left: 14px;
}
/* 图片居中
.news_image /deep/ {
  text-align: center;
} */
.news_from {
  display: block;
  float: right;
  font-size: 9px;
  margin: 5px;
}
.addComment input {
  width: 80%;
  line-height: 30px;
}
.addComment {
  text-align: center;
  margin-top: 10px;
}
.addComment button {
  position: absolute;
  right: 30px;
  margin-top: 10px;
}
</style>



