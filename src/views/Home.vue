<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <mt-spinner type="snake"></mt-spinner>
<mt-spinner type="double-bounce"></mt-spinner>
<mt-spinner type="triple-bounce"></mt-spinner>
<mt-spinner type="fading-circle"></mt-spinner>

<!-- 或者接受传入类型的序号 -->
<mt-spinner :type="0"></mt-spinner>
<mt-spinner :type="1"></mt-spinner>
<mt-spinner :type="2"></mt-spinner>
<mt-spinner :type="3"></mt-spinner>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
