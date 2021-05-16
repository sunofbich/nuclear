<template>
  <div>
    <div>
      <div class="header_top">
        <!-- 头像及个人信息 -->
        <div class="user_ava">
          <img v-if="this.$store.state.islogin == 0" src="user/person_01.png" />
          <img v-else src="" />
        </div>

        <div class="user_btn">
          <span v-if="this.$store.state.islogin == 0"
            ><router-link to="/login" style="color: white"
              >立即登录</router-link
            ></span
          >
          <span v-else>{{ this.$store.state.user.user_name }}</span>
        </div>
      </div>
    </div>
    <div class="body">
      <mt-cell title="我的消息"  is-link ></mt-cell>
      <mt-cell title="我的关注" to="/follows" is-link></mt-cell>
      <mt-cell title="我的点赞" to="/likes" is-link ></mt-cell>
      <mt-cell title="历史记录" to="/history" is-link ></mt-cell>
      <mt-cell title="其他设置"  is-link ></mt-cell>
      <span  @click="logout">
      <mt-cell  title="退出登录"  ></mt-cell>
      </span>
    </div>

    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img
          v-if="selected == 'home'"
          src="../assets/home/main_1.png"
          slot="icon"
        />
        <img v-else src="../assets/home/main_0.png" slot="icon" />
      </mt-tab-item>
      <mt-tab-item id="me">
        <img
          v-if="selected == 'me'"
          src="../assets/home/me_1.png"
          slot="icon"
        />
        <img v-else src="../assets/home/me_0.png" slot="icon" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "me",
    };
  },
  methods: {
    logout() {
      this.$store.state.islogin = 0;
       this.$toast({
              message: "您已退出登录",
              position: "center",
              duration: 2000,
            });

    },
  },
  //监听底部选项卡,用于跳转主页以及me
  watch: {
    selected(newval) {
      if (newval == "home") {
        this.$router.push("/list");
      } else if (newval == "me") {
        this.$router.push("/me");
      }
    },
  },
};
</script>

<style scoped>
.header_top {
  background-color: #26a2ff;
  margin-top: 40px;
  text-align: center;
}
.user_ava {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  overflow: hidden;
  border: 2px solid #fff;
  text-align: center;
  display: inline-block;
}
.user_ava img {
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.user_btn {
  margin-top: 22px;
  text-align: center;
  margin-bottom: 10px;
}
.user_btn span {
  font-size: 0.18rem;
  color: #fff;
  line-height: 36px;
  border: 1px solid #fff;
  border-radius: 3px;
  background-color: #26a2ff;
  display: block;
  height: 36.3px;
  width: 98.7px;
  margin: 0 auto;
  text-align: center;
}
.body {
  margin: 0 18px;
}
.body-item {
  border-bottom: 1px solid #f6f6f6;
  padding: 15px 0;
  color: #797979;
  font-size: 0.16rem;
  line-height: 0.16rem;
}
.body-item i {
  display: inline-block;
  widows: 20px;
  height: 27px;
  vertical-align: -7px;
  margin-right: 7px;
  /* background: url('user/profile_icons.png') no-repeat ;  */
  background-size: 20.5px auto;
}
.body-item .msg i {
  background-position: -3px 3px;
}
.body-item .favor i {
  background-position: -3px -32px;
}
.body-item .logout i {
  background-position: -3px -217px;
}
</style>