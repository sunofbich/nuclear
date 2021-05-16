<template>
  <div class="history">
    <div class="title">
      <span>历史记录</span>
      <mt-button size="small" @click="clear_history">清空</mt-button>
    </div>

    <div class="list" v-for="(item, index) in history" :key="index">
      <mt-cell
        :to="item.news_id"
        class="item"
        :title="item.title"
        :label="item.history_time"
        is-link
      ></mt-cell>
    </div>
  </div>
</template>


<script>
import { get } from "../utils/request";
import { del } from "../utils/request";
export default {
  data() {
    return {
      history: [],
    };
  },
  methods: {
    //清空历史浏览记录
    clear_history() {
      del(`/clhistory?user_id=${this.$store.state.user.user_id}`)
        .then((result) => {
          console.log(result);
          if (result.data.code == 200) {
            this.$toast({
              message: "删除成功",
              position: "bottom",
              duration: 2000,
            });
            this.history = result.data.result;
          }
        });
    },
  },
  mounted() {
    // console.log(this.$store.state.user.user_id);
    //获取用户浏览记录
    //  url = `/gethistory?user_id=${this.$route.query.news_id}`;

    get(`/gethistory?user_id=${this.$store.state.user.user_id}`)
      .then((result) => {
        console.log(result);
        this.history = result.data.result;

        console.log();
      });
  },
};
</script>

<style  scoped>
.title {
  height: 50px;
  text-align: center;
  background-color: #26a2ff;
  color: white;
  line-height: 20px;
  margin: 40px 0 15px 0;
  position: relative;
}
.title button {
  position: absolute;
  right: 10px;
  margin-top: 3px;
  background-color: #26a2ff;
}
.title span {
  line-height: 50px;
  font-size: 19px;
}
.list {
  margin: 3px;
}
.item {
  overflow: hidden;
  white-space: nowrap;
}
</style>