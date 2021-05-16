<template>
  <div id="app">
    <mt-header fixed title="核污染专题栏目" class="important-header">
        <mt-button icon="back" @click="back" slot="left" ></mt-button>
        <router-link v-if="this.$store.state.islogin==0" to="/login" slot="right">登录/注册</router-link>
        <!-- <router-link v-else slot="right" to="/me">{{this.$store.state.user.user_name}}</router-link> -->
    </mt-header>

    <!-- 路由内容 -->
    <router-view />
    <!-- 底部选项卡开始 -->
      <mt-tabbar v-model="selected" fixed>
              <mt-tab-item id="home">
                  <img
            v-if="selected == 'home'"
            src="./assets/home/main_1.png"
            slot="icon"
          />
                  <img v-else src="./assets/home/main_0.png" slot="icon" />
                </mt-tab-item
        >
              <mt-tab-item id="me">
                  <img
            v-if="selected == 'me'"
            src="./assets/home/me_1.png"
            slot="icon"
          />
                  <img v-else src="./assets/home/me_0.png" slot="icon" />
                </mt-tab-item
        >
            </mt-tabbar
      >
      <!-- 底部选项卡结束 -->
  </div>
</template>



<script>
export default {
data(){
	return{
	selected: "home",
	}
},
  methods: {
	// logout(){
	// this.$store.state.islogin=0
	// },
	back(){
        this.$router.push(history.go(-1));
    }
  },
  watch: {
    selected(newval) {
      if (newval == "home") {
        this.$router.push("/");
      } else if (newval == "me") {
        this.$router.push("/me");
      }
    },
  },
}
</script>