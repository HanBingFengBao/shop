<template>
  <AppNavbar />

 <div class="container">
    <h1>个人中心</h1>

   <!-- 个人信息 -->
   <div class="banner">
     <div  v-if="userInfo.name" class="banner_left">
       <p><strong>真实姓名：</strong><span>{{ userInfo.name  }}</span></p><br>
       <p><strong>昵称：</strong><span>{{ userInfo.nickname }}</span></p><br>
       <p><strong>联系方式：</strong><span>{{ userInfo.email }}</span></p><br>
       <p><strong>交易地址：</strong><span>{{ userInfo.address }}</span></p><br>
     </div>
     <div class="banner_bnt"><!-- 触发弹窗的按钮 -->
       <button @click="openModal">修改个人信息</button>
       <button @click="EditPage">继续上传商品</button>
     </div>
   </div>

   <div class="banner_right">     <!-- Lottie 动画容器 -->
       <div ref="lottieContainer" style="width: 300px; height: 300px;"></div>
   </div>

   <!-- 个人信息修改弹窗 -->
 <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
   <div class="modal" @click.stop>
     <h2>修改个人信息</h2>
     <form @submit.prevent="submitForm">
       <div class="form-group">
         <label for="name">真实姓名</label>
         <input type="text" id="name" v-model="formData.name" placeholder="请输入真实姓名" />
       </div>

       <div class="form-group">
         <label for="nickname">昵称</label>
         <input type="text" id="nickname" v-model="formData.nickname" placeholder="请输入昵称"/>
       </div>

       <div class="form-group">
         <label for="email">联系方式</label>
         <input type="text" id="email" v-model="formData.email" placeholder="请输入联系方式"/>
       </div>

       <div class="form-group">
         <label for="address">交易地址</label>
         <input type="text" id="address" v-model="formData.address" placeholder="请输入交易地址"
         />
       </div>
       <div class="form-group">
         <button type="submit">提交修改</button>
         <button type="button" @click="closeModal">取消</button>
       </div>
     </form>
   </div>
 </div>

 <!-- 商品信息修改弹窗 -->
 <div v-if="isGoodsVisible" class="modal-overlay" @click="closeGoodsModal">
   <div class="modal" @click.stop>
     <h2>修改商品信息</h2>
     <form @submit.prevent="submitGoodsForm">
       <div class="form-group">
         <label for="goodName">商品名称</label>
         <input type="text" id="goodName" v-model="selectedGoods.goodName" placeholder="请输入商品名称" />
       </div>
       <div class="form-group">
         <label for="price">价格</label>
         <input type="number" id="price" v-model="selectedGoods.price" placeholder="请输入商品价格"/>
       </div>
       <div class="form-group">
         <label for="detail">商品描述</label>
         <input type="text" id="detail" v-model="selectedGoods.detail" placeholder="请输入商品描述"/>
       </div>
       <div class="form-group">
         <button type="submit">提交修改</button>
         <button type="button" @click="closeGoodsModal">取消</button>
       </div>
     </form>
   </div>
 </div>

   <h2 class="lsit_Name">个人上传的商品列表</h2>
   <!-- 商品列表 -->
   <section class="goods-list">

       <div v-for="goods in allgoods" :key="goods.goodId" class="goods-item">
      <!-- 点击查看商品详情 -->
         <img :src="goods.img" alt="商品图片" />
       <div><p class="goodsName"><strong>商品名称：</strong>{{ goods.goodName }}</p> </div> 
       <p class="goodsPrice"><strong>价格：</strong>￥<span>{{ goods.price }}</span></p> 
       <p class="goodsDetail"><strong>商品描述：</strong>{{ goods.detail }}</p> 
        
       <div class="good-btn">
         <button @click="editGoods(goods.goods)">修改商品信息</button>
         <button @click="deleteGoods(goods.goodId)" class="deleBtn">删除商品信息</button>
       </div>
     
     </div>
   </section>

 </div>

</template>

<script>
import AppNavbar from './NavBar.vue'; // 导入 Navbar 组件
import axios from "axios";
import lottie from 'lottie-web';  //动画
export default {
components: {
 AppNavbar  // 注册 Navbar 组件
},
 data() {
   return {
     allgoods: [],        //所有商品
     selectedGoods: { goodId: " ",img: " ",goodName: " ", price: " ",detail: " " }, // 选中的商品
     isGoodsVisible: false, 
     allusers:[],         //所有用户信息
     userInfo:{ name: '', nickname: '', email: '', address: '' }, // 当前登录用户信息
     isModalVisible: false, 

   };
 },
 methods: {
 EditPage(){   
   window.location.href = "/edit";
 },  
 openModal() {    // 修改个人信息打开弹窗
   this.formData = { ...this.userInfo };  
   this.isModalVisible = true;
 },
 closeModal() {    // 关闭修改个人信息弹窗
   this.isModalVisible = false;
 },  
 submitForm() {  // 提交表单并更新个人信息
   console.log("提交的个人信息：", this.formData);
   this.userInfo = { ...this.formData }; // 更新用户信息
   this.closeModal(); // 提交后关闭弹窗
 },

 // 打开商品信息修改弹窗
 editGoods(goods) {
   this.selectedGoods = { ...goods }; 
   console.log("选择的商品 ID:", this.selectedGoods.goodId);  // 获取商品 ID
   this.isGoodsVisible = true;
 },
 closeGoodsModal() {
   this.isGoodsVisible = false;
 },
 // 提交商品信息修改
 submitGoodsForm() {
   if (!this.selectedGoods.goodId) {
       console.error("商品ID无效！");
       return;
     }
   console.log("提交的商品信息：", this.selectedGoods);
   axios.put(`http://localhost:8081/database/goods.json/${this.selectedGoods.goodId}`, this.selectedGoods)
     .then((res) => {
       console.log(res+'商品修改')
       this.isGoodsVisible = false;
       // 更新本地商品列表，替换掉已修改的商品信息
         const index = this.allgoods.findIndex(goods => goods.goodId === this.selectedGoods.goodId);
         if (index !== -1) {
         this.$set(this.allgoods, index, this.selectedGoods);
       }
     })
     .catch(error => {
       console.error('修改商品失败', error);
     });
 },

// 删除商品
 deleteGoods(goodId) {
   console.log(goodId+'商品id')
   axios.delete(`http://localhost:8081/database/goods.json/${goodId}`)
     .then(() => {
       // 处理删除后的逻辑，移除删除的商品
       this.allgoods = this.allgoods.filter(goods => goods.goodId !== goodId);
     })
     .catch(error => {
       console.error('删除商品失败', error);
     });
 },



 },
 
mounted(){
 axios.get('http://localhost:8081/database/goods.json').then((res) => { //使用 axios 发送 GET 请求，从 this.site + '/goodlist' 获取商品数据。
     if(res.data.code === 200){
     this.allgoods =  res.data.data; //拿到所有商品信息
     this.allgoods.forEach(goods => {
     console.log('商品 ID:', goods.goodId); // 获取每个商品的 ID
   });
 }
 });
 axios.get('http://localhost:8081/database/user.json').then((res) => {
   if (res.data.code === 200) {
     this.allusers = res.data.data; // 存储所有用户信息
     const foundUser = this.allusers.find((user) => user.userId === 1); 
     if (foundUser) {
         this.userInfo = { ...foundUser };
       }
     this.$nextTick(() => { console.log("筛选出的用户信息:", this.userInfo);
     });
   }
 })
 .catch((err) => {
   console.error("请求失败:", err);
 });

 axios.get('/lottie/animation.json').then(response => { // 使用加载的动画数据
 lottie.loadAnimation({
   container: this.$refs.lottieContainer,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: response.data 
 });
})
.catch(error => {
 console.error('加载动画文件失败:', error);
});



}

 
};
</script>

<style scoped>

.container {
position: relative;
width: 100%; 
max-width: 1200px; 
margin:0 150px;
}

h1 {
margin: 10px 100px;
 font-size: 24px;
 color: #333;
}
/* 个人信息区域 */
.banner{
height: 300px;
width: 300px;
position: relative;
border-radius: 12px;
margin-left: 250px;
background-color:white;
box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px; 
}
.banner_left{
text-align: center;
position:absolute;
margin-top: 25px;
top:0;
left:10;
padding: 10px;
}
.banner_bnt{
position:absolute;
top:70%;
left:10%;
}
.banner:hover { /* 鼠标悬停时放大卡片 */
 transform: scale(1.1); /* 鼠标悬停时，卡片放大10% */
 box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时，增加阴影 */
}
.banner_right{
width: 350px;
height: 350px;
padding: 25px;
position:absolute;
top:50px;
left:50%;
}
/* 商品列表 */
.lsit_Name{
background-color: beige;
margin: 50px 400px;
font-size: 24px;
text-align: center;
color: #333;
}
.goods-list {
width: 900px;
margin: 0px 125px; 
border-radius: 12px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px; 
}

.goods-item {
display: flex;
align-items: center;
margin-bottom: 20px;
position: relative;
border-radius: 12px;
background-color:white;
box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px; 
}
.goods-item:hover { /* 鼠标悬停时放大卡片 */
 transform: scale(1.05); /* 鼠标悬停时，卡片放大5% */
 box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时，增加阴影 */
}
.goods-item img {
margin-left: 50px;
 width: 150px;
 height: 150px;
 object-fit: cover;
 margin-right: 20px;
 border-radius: 8px;
}

.goods-item p{
 font-size: 16px;
}

.goodsName{
 height:25px;
 width:400px;
 position:absolute;
 top:20%;
 left:30%;
}
.goodsPrice{
 height:25px;
 width:400px;
 position:absolute;
 top:40%;
 left:30%;
}
.goodsDetail{
 height:100px;
 width:150px;
 position:absolute;
 top:60%;
 left:30%;
}
.good-btn{
 height:100px;
 width:150px;
 position:absolute;
 top:10%;
 right:0;
}
/* 弹窗内容 */
.modal-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
display: flex;
justify-content: center;
align-items: center;
z-index: 1000; 
}
.modal {
background-color: white;
padding: 20px;
width: 400px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
position: fixed;
top: 50%; 
left: 50%; 
transform: translate(-50%, -50%); /* 通过平移使其完全居中 */
display: flex;
flex-direction: column;
}

/* 输入框样式 */
.form-group {
margin-bottom: 15px;
}

label {
font-size: 14px;
margin-bottom: 5px;
display: block;
}

input {
width: 100%;
padding: 8px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 4px;
}

/* 按钮样式 */
button {
padding: 10px 15px;
background-color:rgb(134, 208, 242);
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
margin: 10px;
}

button:hover {
background-color: rgba(118, 155, 202, 0.8);
 box-shadow: 0 0 10px rgba(118, 155, 202, 0.8);
}

/* 取消按钮 */
button[type="button"] {
background-color: #f0f0f0;
color: #333;
}

button[type="button"]:hover {
background-color: #e5e5e5;
}

.deleBtn{
background-color: rgba(230, 83, 83, 0.8);
}
</style>
