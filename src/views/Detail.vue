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
          <span>已订阅</span>   
          <!-- <span>订阅</span>    -->
          </button>
        <!-- <router-link to="#" @click="follow" class="nav_a">已订阅</router-link> -->

       <span v-model="dznumber" class="dz-button">
         <img width="20px"  @click="zan" src="comment/点赞1.png" alt="">
         {{ this.dznumber }}</span>
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
                        <img  @click="love" :data-id="item.comment_id" v-if="xin == true" src="comment/心1.png" alt="" />
                        <img  @click="love" :data-id="item.comment_id" v-else src="comment/心.png" alt="" />

                        {{ item.dz_comment }}</span
                      >
                      <span  ><img @click="addreply" :data-id="item.comment_id" src="comment/评论.png" alt="" /></span>
                      <span><img src="comment/分享.png" alt="" /></span>
                    </div>
                  </div>
                       <div>
                      <p>{{item.reply_text}}</p>
                  </div>
                </td>
              </tr>
            </table>
            <div style="text-align:center;width:124px;margin:0 auto;"></div>
                 <!-- <span><router-link   to="/morecomment">点击查看更多评...</router-link></span> -->
          </div>
        </div>
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
      xin: false,
      title: "",
      add_comment:'',
      dznumber:'',
      comment_id:-1
    };
  },
  mounted() {

   
    // //验证是否关注
    // this.axios
    //   .get(`/getfollows?user_id=${this.$store.state.user.user_id}`)
    //   .then((result) => {
    //     console.log(result);
    //     this.follows = result.data.result;
    //   });

    // 获取新闻id
    let id = this.$route.query.news_id;
    //打印新闻id
    console.log(id);
    // 声明URL为接口地址
    let url = `/getdetail?news_id=${id}`;
    //console.log(url);
    this.axios.get(url).then((result) => {
      //打印从服务器端返回的数据
      console.log(result);

      //把服务器返回的文章对象存入data
      this.detail = result.data.results;
      //console.log(this.detail)
      //因从服务器获取数据 有多余符号，特此处理
      let err = result.data.results;
      // // console.log(test.image.slice(1,-1));
      this.detail.image = err.image.slice(1, -1);
      this.detail.author_avatar = err.author_avatar.slice(1, -1);
      //header头像
      this.dznumber=result.data.results.dz_number
      //存储title
      this.title = result.data.results.title;
    //    //获得回复
    //  let url=`/getreply?cpmment_id=${this.comment_id}`
    //  this.axios.get(url).then((result) => {
    //   //打印从服务器端返回的数据
    //   console.log(result);
    //   this.reply=result.data.result
      
    // })
      

      // this.detail.image = require(`${this.detail.image}`)
      // 处理一下时间  通过毫秒值时间戳  获取moment对象
      // let m = this.moment(detail.created_at);
      // console.log(`11111${m}`)
      // 新增属性create
      // dStr用于保存格式化后的时间字符串;
      // this.detail.createdStr = m.format("YYYY年MM月DD日");
      // moment(m,'MMMM DD YYYY');

      //添加历史记录
      let time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      if(this.$store.state.islogin==1){
         let param = `user_id=${this.$store.state.user.user_id}&title=${this.title}&history_time=${time}&news_id=${this.$route.query.news_id}`;
      // console.log(param);
      this.axios.post("/history", param).then((result) => {
        // console.log(result);
      });
      }
    });
    //获得评论内容
    url = `/comment?news_id=${id}`;
    this.axios.get(url).then((result) => {
      //打印从服务器端返回的数据
      console.log(result);

      //获取评论用户头型信息 路径可以拿到，但是记载不了
      let user_id = result.data.results.user_id;
      let a = result.data.results;
      // url = `/avatar?user_id=${id}`;
      // this.axios.get(url).then((result) => {
      //   //打印从服务器端返回的数据
      //   console.log(result);
      //   this.comment=a
      //   this.comment.avatar=result.data.result.avatar
      //   console.log(this.comment)
      //   //把服务器返回的文章对象存入data
      //   //this.author = result.data.author;
      //   //评论头像
      //   this.comment.avatar = result.data.result.avatar
      //   console.log(this.comment.avatar);
      //   //this.author.avatar = require(`${this.author.avatar}`)
      // });

      //把服务器返回的文章对象存入data
      this.comment = result.data.results;
      //评论头像
      //console.log(this.comment)
      //this.comment.avatar = require(`${this.article.avatar}`)
      //处理时间
      let time = result.data.results.comment_at;
      var moment = require("moment");
      this.comment.comment_at = moment(time).format("MMMM Do YYYY, h:mm:ss a");
      //console.log(this.comment.comment_at)
    });

    // //获取评论用户头型信息 路径可以拿到，但是记载不了
    //  user_id = this.comment.user_id;
    // url = `/avatar?user_id=${id}`;
    // this.axios.get(url).then((result) => {
    //   //打印从服务器端返回的数据
    //   //console.log(result);
    //   //把服务器返回的文章对象存入data
    //   //this.author = result.data.author;
    //   //评论头像
    //   this.comment.avatar = result.data.result[0].avatar.slice(1, -1);
    //   //console.log(this.comment.avatar);
    //   //this.author.avatar = require(`${this.author.avatar}`)
    // });
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
    //回复评论
    addreply(e){
      if(this.$store.state.islogin==1){
      this.$messagebox.prompt('回复评论').then(({ value, action }) => {
        // console.log(value)
        
      // console.log(e.target.dataset.id)
      this.comment_id=e.target.dataset.id
      // let param=`user_id=${this.$store.state.user.user_id}&`
      let param=`reply_text=${value}&user_id=${this.$store.state.user.user_id}&comment_id=${this.comment_id}`

      this.axios.post('/addreply',param).then((result)=>{
        // console.log(result)
        if (result.data.code == 200) {
            this.$toast({
              message: "回复成功",
              position: "center",
              duration: 1000,
            });
            // this.result.
          }
      })
  });

      }else{
        this.$toast({
              message: "请先进行登录",
              position: "center",
              duration: 2000,
            });
      }
      
    },
    //写评论
    addComment() {
      // MessageBox.prompt('Please tell me your name').then(({ value, action }) => {
      //     console.log(value)
      //     console.log(action)
      // });
      if(this.$store.state.islogin==1){
        let time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      let num = 0
      let param=`user_id=${this.$store.state.user.user_id}&news_id=${this.$route.query.news_id}&comment_content=${this.add_comment}&user_name=${this.$store.state.user.user_name}&dz_comment=${num}&comment_at=${time}`;
      this.axios.post('comment',param).then((result)=>{
        // console.log(result)
          if (result.data.code == 200) {
            this.$toast({
              message: "登录成功",
              position: "center",
              duration: 1000,
            });
          }else{
            this.$toast({
              message: "网络不是法外之地！",
              position: "center",
              duration: 1000,
            });
          }
      
      })
      this.add_comment=''
      }else{
         this.$toast({
              message: "请先登录！",
              position: "center",
              duration: 2000,
            });
      }
      
    },
    //添加历史浏览记录
    user_like() {},
    //aixin
    //存储用户点赞
    love(e) {
      // console.log(this.title)
      // this.xin=true,
    
      // e.srcElement.dataset.item ==  true ? false : true;
    },
    //文章点赞
    zan() {
      // console.log(this.dznumber)
      // detail.dz_number
      // console.log(detail.dz_number)
      this.dznumber++
      // console.log(this.dznumber)
      let param = `news_id=${this.$route.query.news_id}&dz_number=${this.dznumber}`
      this.axios.post('/good',param).then((result)=>{
        // console.log(result)
      })
      // let param = `user_id=${this.$store.state.user.user_id}&dz_comment=${this.dzcomment}`;
      // this.axios.post("/adddz", param).then((result) => {
      //   console.log(result);
      // });
    },

    //关注新闻网站
    follow() {
      // console.log(this.detail.author_name);
      let id = this.$route.query.news_id;
      let param = `user_id=${this.$store.state.user.user_id}&author_name=${this.detail.author_name}&news_id=${id}&author_avatar=${this.detail.author_avatar}`;
      // console.log(param);
      this.axios.post("/follows", param).then((result) => {
        // console.log(result);
      });
    },
    // zan: function () {
    //   if (this.flg) {
    //     let num = this.comment.dz_comment++;
    //     let url = "/dz?news_id=${id}";
    //     this.axios.post(url, num).then((result) => {
    //       //console.log(result);
    //       if (result.data.code == 200) {
    //         this.$toast({
    //           message: "成功",
    //         });
    //       }
    //     });
    //   } else {
    //     this.detail.dz_number--;
    //     this.flg = true;
    //   }
    // },
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
.addComment input{
width: 80%;
line-height: 30px;
}
.addComment{
  text-align: center;
  margin-top:10px ;
}
.addComment button{
  position: absolute;
  right: 30px;
  margin-top: 10px;
}
</style>



