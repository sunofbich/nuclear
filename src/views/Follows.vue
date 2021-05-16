<template>
  <div class="follow">
    <!-- 顶部标题 -->
    <div class="title" style="margin-top:40px;">
      <p>我的关注</p>
    </div>
    <!-- 顶部标题结束 -->
    <!-- 收藏列表渲染 -->
    <div v-for="(item,i) in follows" :key=i class="list">
      <!-- v-for="(item,index) in likes" :key="index" -->
      <div class="list_item" style="height:50px">
       <div class="author_avatar">
         <!-- 图片路径是动态值 -->
        <img src="" alt="">
       </div>
       <div>
        <span class="item" style="margin-left:5px">{{item.author_name}}</span>
       </div>
       <button>取消关注</button>
      </div>
    </div>
    <!-- 收藏列表渲染结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      follows: {},
    };
  },
  mounted() {
    console.log(this.$store.state.user.user_id);
    //获取关注的媒体
    //  url = `/gethistory?user_id=${this.$route.query.news_id}`;

    this.axios
      .get(`/getfollows?user_id=${this.$store.state.user.user_id}`)
      .then((result) => {
        console.log(result);
        this.follows = result.data.result;
      });
  },
};
</script>

<style  scoped>
button{
  color: #1e90ff;
  background-color: white;
  border: none;
  background-color:transparent;
  margin-left: auto;
}
.title {
  height: 20px;
  line-height: 55px;
  padding-bottom: 35px;
}
.list{
  width: 100%;
  background-color: #dcdcdc;
}
.list_item{
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid gray;
}
.item{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:rgb(102, 102, 102);
}
.item_http{
  padding: 5px;
  font-size: 0.8em;
  color: #a9a9a9;
}
.title p{
  text-align:center;
  font-weight: bold;
  font-size: 1em;
}
img{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

</style>

