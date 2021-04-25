<template>
  <div id="app">
    <mt-header fixed title="核污染专题栏目" class="important-header">
        <mt-button icon="back" @click="back" slot="left" ></mt-button>
        <router-link to="/login">
        <mt-button disabled  slot="right">登录</mt-button>

        </router-link>
    </mt-header>

    <!-- 路由内容 -->
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    back(){
        this.$router.push(history.go(-1));
    }
  },
}
</script>