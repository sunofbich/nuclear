<template>
  <div class="detail">
    <header>
      <!-- 详情页 固定布局页头 -->
      <div class="header-nav"></div>
      <!-- 头部图片位置 暂时用div代替-->
      <div style="width：100%;height:160px; background-color:red;"></div>
      <!-- <img :src="detail.image" style="width：100%;height:160px;" alt=""> -->
    </header>
    <!-- 头部结束 -->
    <!--正文开始  -->
    <div class="question">
      <!-- 正文导航 -->
      <div class="nav clearfix">
        <div class="nav_img">
          <!-- 作者头像 待修改 -->
          <img src="../assets/logo.png" alt class="n_img">
        </div>
        <span class="nav_s" >{{detail.created_at}}</span>
        <!-- <span class="nav_a">新浪/刚刚</span> -->
       
        <router-link to="#" class="nav_a">已订阅</router-link> <router-link to="#" class="nav_a">赞{{detail.dz_number}}</router-link>
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
          <span class="c_title">全部评论</span>
          <span class="c_count">{{comment.length}}</span>
        </div>
        <div>
          <div>
           
            <table class="comment_user" 
                   v-for="(item,i) in comment" :key="i">
              <tr  class="user-top clearfix">
                 <!-- 用户头像 -->
                <td rowspan="2" class="user-top-image">
                  <img src="../assets/logo.png" alt>
                </td>
                <!-- 用户名 -->
                <td class="user-right  dz">
                  <p>{{item.user_name}}</p>
                </td>
                <!-- 点赞 -->
                <td class="user-right dz">
                 <router-link to="#" class="dz_a dz_right">
                   <span>点赞</span>
                 </router-link>
                </td>
                <!-- 点赞数量 -->
                <td class="user-right ">
                  <router-link to="#" class="dz_a dz_left">
                  <span>{{detail.dz_number}}</span>
                  </router-link>
                </td>
              </tr>
              <tr>
                <!-- <td></td> -->
                <td colspan="3 ">
                  <div>{{item.comment_content}}</div>
                </td>
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
      comment: []
    };
  },
  mounted() {
    // 获取新闻id
    let id = this.$route.query.news_id;
    //打印新闻id
    console.log(id);
    // 声明URL为接口地址
    let url = `/detail?news_id=${id}`;
    console.log(url);
    this.axios.get(url).then(result => {
      //打印从服务器端返回的数据
      console.log(result);
      //把服务器返回的文章对象存入data
      this.detail = result.data.results;
      // 处理一下时间  通过毫秒值时间戳  获取moment对象
      let m = this.moment(detail.created_at);
      console.log(`11111${m}`)
      // 新增属性create
      // dStr用于保存格式化后的时间字符串;
      this.detail.createdStr = m.format("YYYY年MM月DD日");
      // moment(m,'MMMM DD YYYY');
      
    });
    url = `/comment?news_id=${id}`;
    this.axios.get(url).then(result => {
      //打印从服务器端返回的数据
      console.log(result);
      //把服务器返回的文章对象存入data
      this.comment = result.data.results;  
    });
    url = `/?news_id=${id}`;
    this.axios.get(url).then(result => {
      //打印从服务器端返回的数据
      console.log(result);
      //把服务器返回的文章对象存入data
      this.comment = result.data.results;
      
    });
  }
};
</script>

<style scoped>
/* 导航样式 */
header{
  /* 设置上边距留出导航栏 */
  margin-top: 40px;
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
/* 内容 */

.content /deep/ p {
  font-size: 16px;
  margin: 0 3% 15px 3%;
  line-height: 20px;
  text-indent: 32px;
}
.content /deep/ img {
  width: 80%;
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
  width: 45px;
  border-radius: 50%;
  overflow: hidden;
  padding-top:5px; 
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
  font-size: 28px;
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
.dz_left span{
  float: left;
}
.dz_right span{
  float: right;
}
table{
  width: 80%;
}
.dz{
  width: 38%;
}
.dz_a {
  text-decoration: none;
  color: orange;
  height: 20px;
  width: 70px;
  text-align: center;
  line-height: 20px;
}
</style>



