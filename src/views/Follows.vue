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
        <img :src="item.author_avatar" alt="">
       </div>
       <div>
        <span class="item" style="margin-left:5px">{{item.author_name}}</span>
       </div>
       <button @click="dfollow" :data-id='item.author_id'>取消关注</button>
      </div>
    </div>
    <!-- 收藏列表渲染结束 -->
  </div>
</template>

<script>
import { get } from "../utils/request";
import { post } from "../utils/request";
import { del } from "../utils/request";

export default {
  data() {
    return {
      follows: {},
    };
  },
  mounted() {
    //获取关注的媒体
    get(`/getfollows?user_id=${this.$store.state.user.user_id}`)
      .then((result) => {
        console.log(result);
        this.follows = result.data.result;
      });
  },
  methods:{
    //取消关注
    dfollow(e){
      let uid = this.$store.state.user.user_id;
      let auhtor_id = e.target.dataset.id;
      del(`/dfollows?user_id=${uid}&author_id=${auhtor_id}`).then((result)=>{
        if (result.data.code == 200) {
              this.$toast({
                message: "已取消关注",
                position: "center",
                duration: 1000,
              });
            }
      })

    }
  }
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

