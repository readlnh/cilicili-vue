<template>
  <el-menu
    class="top-bar"
    mode="horizontal"
    router
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/postvideo">投稿</el-menu-item>
    <el-menu-item index="about" >关于</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.top-bar {
    margin-bottom: 20px;
}
</style>
