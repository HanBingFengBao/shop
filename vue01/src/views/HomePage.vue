<template>
  <div>
    <!-- 顶部导航 -->
    <div class="navbar">
    <div class="logo">Second-hand Shop</div>
    <div class="search-box">
      <input v-model="searchWord" type="text" placeholder="Search...">
      <el-button type="success"  >搜索</el-button>
    </div>
    <ul>
      <li><a href="/favorites">我的收藏</a></li>
      <li><a href="/talk">沟通消息</a></li>
      <li><a href="/center">个人中心</a></li>
      <li><a href="/edit">上传商品</a></li>
      <el-button type="text" @click="showLogin">登录</el-button>
      <el-button type="text" @click="showRegister">注册</el-button>
    </ul>
  </div>

  <!-- 版心区域 -->
  <div class="banner"> <!-- 侧面导航 -->
    <div class="aside">
      <ul>
        <li><a href="#"><b>生鲜</b><span>水果 蔬菜 鲜肉 ></span></a></li>
        <li><a href="#"><b>家电</b><span>手机 数码 风扇 ></span></a></li>
        <li><a href="#"><b>家居</b><span>床帘 厨具 桌椅 ></span></a></li>
        <li><a href="#"><b>美妆</b><span>服饰 眉笔 大衣 ></span></a></li>
        <li><a href="#"><b>玩具</b><span>积木 游戏 拼图 ></span></a></li>
        <li><a href="#"><b>食品</b><span>零食 饼干 速冻 ></span></a></li>
        <li><a href="#"><b>图书</b><span>插画 教育 教材 ></span></a></li>
        <li><a href="#"><b>鲜花</b><span>种子 雏菊 花艺 ></span></a></li>
        <li><a href="#"><b>医药</b><span>保健 护具 药丸 ></span></a></li>
      </ul>
    </div>

    <div class="layout">    <!-- 轮播图 -->
      <el-carousel height="220px">
      <el-carousel-item v-for="(item, index) in imgPaths" :key="index">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
    </div>
    
    <div class="card"> <!-- 右边卡片展示 -->
      <ul>
        <li v-for="goods in allgoods" :key="goods.goodId">
          <a @click="showProductDetails(goods.goodId)"> <!-- 点击查看商品详情 -->
            <img :src="goods.img" >
            <h3>{{ goods.goodName }}</h3>
            <div>￥<span>{{ goods.price }}</span></div>
            <b>今日热门</b>
          </a>
        </li>
        </ul>
      </div>
    </div>
  <!-- 搜索频道 -->
  <div class="channels">
    <button id="">开学锦囊</button>
    <button id="">放假宝盒</button>
    <button id="">宿舍好物</button>
    <button id="">学习好物</button>
    <button id="">大一专区</button>
    <button id="">大二专区</button>
    <button id="">大三专区</button>
    <button id="">大四专区</button>
  </div>

  <!-- 主卡片展示 -->
  <div class="showCard">
    <ul>
      <li v-for="goods in allgoods" :key="goods.goodId">
          <a @click="showProductDetails(goods.goodId)"> <!-- 点击查看商品详情 -->
            <img :src="goods.img" >
            <h3>{{ goods.goodName }}</h3>
            <div>￥<span>{{ goods.price }}</span></div>
          </a>
        </li>
    </ul>
  </div>

  <!-- 商品详情页 -->
  <div id="product1" class="detail-container" style="display: none">
      <div class="detail-content" >
        <button class="close-btn" @click="closeProductDetails">×</button>
        <div class="product-image" id="productImage">  </div>
        <div class="product-price" id="productPrice"> </div>
        <div class="product-details" id="productDetails"> </div>
        <div class="button-container">
          <el-button type="primary" round>联系卖家</el-button>
          <el-button type="primary" round>加入购物车</el-button>
          <el-button type="primary" round>立即购买</el-button>
        </div>
      </div>
    </div>
  <!-- 版权区域 -->
  <div class="footer">
    <div class="top">
      <ul>
        <li>
          <span>绿色环保</span>
        </li>
        <li>
          <span>无需物流</span>
        </li>
        <li>
          <span>方便快捷</span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <p>
        <a href="#">关于我们</a> |
        <a href="#">帮助中心</a> |
        <a href="#">售后服务</a> |
        <a href="#">配送与验收</a> |
        <a href="#">商务合作</a> |
        <a href="#">搜索推荐</a> |
        <a href="#">友情链接</a>
      </p>
      <p>CopyRight @ 二手商城</p>
    </div>
  </div>
     <!-- 注册弹窗 -->
     <div class="register-overlay" id="registerOverlay" style="display: none">
      <div class="register-modal">
        <button class="close-button" @click="closeRegister()">&times;</button>
        <h2>注册</h2>
          <form @submit.prevent="submitRegister(event)">
          <div class="form-group">
            <label for="username">用户名</label>
            <input id="reg-username" required />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input id="reg-password" type="password" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword">确认密码</label>
            <input id="confirmPassword" type="password" required />
          </div>
          <div class="button-group">
            <button type="submit">注册</button>
            <button type="button" @click="closeRegister()">取消</button>
          </div>
        </form>
      </div>
    </div>
  <!-- 登录弹窗 -->
  <div class="login-overlay" id="loginOverlay" style="display: none">
      <div class="login-modal">
        <button class="close-button" @click="closeLogin()">&times;</button>
        <h2>登录</h2>
          <form @submit.prevent="submitLogin(event)">
          <div class="form-group">
            <label for="username">用户名</label>
            <input id="username" required v-model="username" />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input id="password" type="password" required  v-model="passwd" />
          </div>
          <div class="button-group">
            <!-- <button type="submit">登录</button> -->
          <el-button type="success" plain @click="clicklogin">登录</el-button>

            <button type="button" @click="closeLogin()">取消</button>
          </div>
        </form>
      </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      site: "http://localhost:8081",
      allgoods: [], //发送异步请求，把所有商品放在这个变量当中
      searchWord:'',//用户的输入搜索词汇   
      imgPaths:[
        '/Image/p1.jpg',
        '/Image/EnterBg.png',
        '/Image/EnterBg4.png',
        '/Image/run.jpg',
      ],
      username: "", //用户名
      passwd: "", //密码
    }
  }, 
  methods: {
    //搜索
    search() {
    // 将 goodsName 参数传递给服务器，后面跟着实际的商品名称(this.searchWord)
    axios.get(this.site + "/searcher?goodsName=" + this.searchWord).then((result) => {
        this.allgoods = result.data.data;
        // result.data：这是服务器返回的数据内容
      })

    },
    // 打开和关闭注册弹窗
    showRegister() {
      document.getElementById("registerOverlay").style.display = "flex";
      },
    closeRegister() {
      document.getElementById("registerOverlay").style.display = "none";
      },
      // 提交注册表单
    async submitRegister(event) {
        event.preventDefault();
        const username = document.getElementById("reg-username").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
          alert("密码和确认密码不匹配");
          return;
        }

        // 暂时先无加密操作const encryptedPassword = CryptoJS.SHA256(password).toString();
        const encryptedPassword = password;
        try {
          const response = await axios.post(
            "http://192.168.15.128:8080/register",
            {
              username: username,
              password: encryptedPassword,
            }
          );

          if (response.data && response.data.status === "success") {
            console.log("注册成功:", response.data);
            window.location.href = "/";
          } else {
            alert("注册失败，请稍后再试");
          }
        } catch (error) {
          console.error("注册失败:", error);
          alert("注册失败，请稍后再试");
        }
      },
      // 打开和关闭登录弹窗
    showLogin() {
      document.getElementById("loginOverlay").style.display = "flex";
      },
    closeLogin() {
      document.getElementById("loginOverlay").style.display = "none";
      },
      // 提交登录表单
    async submitLogin(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        // 暂时不加密const encryptedPassword = CryptoJS.SHA256(password).toString();
        const encryptedPassword = password.toString();

        try {
          const response = await axios.post(
            "http://192.168.15.128:8080/login",
            {
              username: username,
              password: encryptedPassword,
            }
          );

          if (response.data && response.data.status === "success") {
            console.log("登录成功:", response.data);
            window.location.href = "/";
          } else {
            alert("登录失败，请检查您的用户名和密码");
          }
        } catch (error) {
          console.error("登录失败:", error);
          alert("登录失败，请检查您的用户名和密码");
        }
      },

   // 显示商品详情
  showProductDetails(goodId) {
        const good = this.allgoods[goodId];
        if (good) {
          document.getElementById(
            "productImage"
          ).innerHTML = `<img src="${good.img}" alt="Product Image" width="100%" />`;
          document.getElementById("productPrice").innerText = '￥'+good.price;
          document.getElementById("productDetails").innerText ='商品详细信息：'+ good.detail;
          document.getElementById("product1").style.display = "flex";
        }
      },

      // 关闭商品详情
      closeProductDetails() {
        document.getElementById("product1").style.display = "none";
      },

      // 联系卖家
      contactSeller() {
        // 跳转到卖家联系页面
        alert("联系卖家");
      },

      // 将商品放入购物车
      // asyncaddToCart() {
      //   // 获取商品ID，假设为商品1
      //   const productId = 1;

      //   try {
      //     const response = await axios.post(
      //       "http://192.168.15.128:8080/cart/add",
      //       {
      //         productId: productId,
      //         quantity: 1, // 假设每次添加一个商品
      //       }
      //     );

      //     if (response.data && response.data.status === "success") {
      //       alert("商品已成功放入购物车");
      //     } else {
      //       alert("加入购物车失败，请稍后再试");
      //     }
      //   } catch (error) {
      //     console.error("添加到购物车失败:", error);
      //     alert("加入购物车失败，请稍后再试");
      //   }
      // },

      // // 立即购买
      // async  buyNow() {
      //   // 获取商品ID，假设为商品1
      //   const productId = 1;

      //   try {
      //     const response = await axios.post(
      //       "http://192.168.15.128:8080/order/create",
      //       {
      //         productId: productId,
      //         quantity: 1, // 假设购买一个商品
      //       }
      //     );

      //     if (response.data && response.data.status === "success") {
      //       // 假设成功后跳转到支付页面
      //       window.location.href = "/payment";
      //     } else {
      //       alert("立即购买失败，请稍后再试");
      //     }
      //   } catch (error) {
      //     console.error("立即购买失败:", error);
      //     alert("立即购买失败，请稍后再试");
      //   }
      // },




 
  },
  mounted(){

    axios.get('http://localhost:8081/database/goods.json').then((res) => { //使用 axios 发送 GET 请求，从 this.site + '/goodlist' 获取商品数据。
    console.log(res)
    if(res.data.code === 200){
     this.allgoods =  res.data.data; //拿到所有商品信息
    }
  })
  }
}
</script>

<style scoped>
  @import "../assets/CSS/home.css";/* 基本的css*/
  @import "../assets/CSS/login.css"/*按钮点击：包括登录、注册、商品详细信息 */
</style>