<template>
  <div class="history">
    <div class="title" style="margin-top:40px;">
      <p>历史记录</p>
    </div>
    <div class="list" v-for="(item, index) in likes" :key="index">
        <span class="item">{{item.title}}</span>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      likes: {},
    };
  },
  mounted() {
    console.log(this.$store.state.user.user_id);
    //获取用户浏览记录
    //  url = `/gethistory?user_id=${this.$route.query.news_id}`;

    this.axios
      .get(`/getlikes?user_id=${this.$store.state.user.user_id}`)
      .then((result) => {
        console.log(result);
        this.likes = result.data.result;
      });
  },
};
</script>



<style  scoped>
.title {
  height: 20px;
  text-align: center;
  background-color: #26a2ff;
  color: white;
  line-height: 20px;
}
.list{
    margin:3px;
}
.item{
    display: block;
    width: 330px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom:1px solid gray;
    margin-top:4px ;
}
</style>