<template>
    <!-- 顶部导航 -->
    <div class="navbar">
    <div class="logo">Second-hand Shop</div>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/center">个人中心</a></li>
      <li><a href="/talk">沟通消息</a></li>
      <li><a href="/edit">上传商品</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar',
};
</script>

<style scoped>
/* 顶部导航 */
.navbar {
    height: 70px;
    background: #333;
    color: white;
    padding: 0.8em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 0px;
}
.navbar .logo {
    font-size: 1.5em;
    font-weight: bold;
}
/* 顶部快速导航 */
.navbar ul { 
    display: flex;
    gap: 1em;
}
.navbar ul li {
margin-top: 5px;
    display: inline;
}
.navbar ul li a {
    color: white;
    font-size: 1em;
    transition: color 0.3s ease;
}
.navbar ul li a:hover {
    color:  #1abc9c;
}
</style>