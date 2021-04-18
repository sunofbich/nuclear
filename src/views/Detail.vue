<template>
  <div class="detail">
    <header>
      <!-- 头部图片位置 暂时用div代替-->
      <div style="width：100%;height:160px; background-color:red;"></div>
    </header>
    <!-- 头部结束 -->
    <!--正文开始  -->
    <div class="question">
      <!-- 正文导航 -->
      <div class="nav clearfix">
        <div class="nav_img">
          <img src="../assets/logo.png" alt class="n_img">
        </div>
        <span class="nav_s">新浪/刚刚</span>
        <!-- <span class="nav_a">新浪/刚刚</span> -->
        <router-link to="#" class="nav_a ">已订阅</router-link>
      </div>
      <!-- 导航结束 -->
      <!-- 正文标题 -->
      <div class="headline">
        <h2>核污染主要指核物质泄露后的遗留物对环境的破坏</h2>
      </div>
      <!-- 内容信息 -->
      <div class="content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem commodi temporibus doloribus consequatur cupiditate cumque culpa, quidem, veniam tenetur aliquid ad modi. Earum soluta natus, officia ullam sapiente dolorum quidem!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem commodi temporibus doloribus consequatur cupiditate cumque culpa, quidem, veniam tenetur aliquid ad modi. Earum soluta natus, officia ullam sapiente dolorum quidem!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem commodi temporibus doloribus consequatur cupiditate cumque culpa, quidem, veniam tenetur aliquid ad modi. Earum soluta natus, officia ullam sapiente dolorum quidem!</p>
      </div>
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
          <span class="c_count">9999</span>
        </div>
        <div>
          <div><img src="" alt=""></div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <button></button>
        </div>
      </div>
      <!-- 用户评论下半部分（查看评论） -->
      <div class="comment_bottom">

      </div>
    </div>
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
/* 导航样式 */
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
  top: 135px;
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
.headline{
  /* text-align: center; */
  margin: 20px 10px 15px 10px;
}
/* 内容 */
.content p{
  font-size:16px;
  margin: 0 10px 15px 10px;
}

/* 评论部分 */
.c_title{
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.c_count{
  margin-left: 5px;
  color: #777;
  font-size:14px;
 
}

/* 评论的下边距根据底部导航栏决定 */
.comment_top{
  margin: 15px 10px 15px 10px;
}
</style>

