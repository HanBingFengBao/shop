<template>

<AppNavbar />

    <div class="favorites-container">
        <div class="title-container">
            <div class="title">宝贝收藏</div>
            <div>
                <!-- <button class="batch-manage">批量管理</button> -->
                <input type="text" v-model="searchQuery" placeholder="输入商品标题" class="search-input" />
                <button @click="searchProducts" class="search-button">搜索</button>
            </div>
        </div>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="!loading && products.length === 0" class="no-data">暂无收藏商品</div>
        <div v-if="!loading && products.length > 0" class="products-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                <div class="product-image-container">
                    <img :src="product.image" alt="商品图片" class="product-image" />
                    <button @click="removeFavorite(product.favorite_id)" class="image-trash-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="16px"
                            height="16px">
                            <path
                                d="M3 6h18v2H3V6zm2 4h14l-1.4 12.6c-.1.9-.9 1.4-1.8 1.4H8.2c-.9 0-1.7-.5-1.8-1.4L5 10zm6 2v8h2v-8h-2zm4 0v8h2v-8h-2zm-8 0v8h2v-8H7zm8-7V4H9v1H4v2h16V5h-5z" />
                        </svg>
                    </button>

                </div>
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <span class="price">&yen;{{ product.price }}</span>

                </div>
            </div>

        </div>
    </div>
</template>


<script>
import axios from "axios";
import AppNavbar from './NavBar.vue'; // 导入 Navbar 组件
export default {
    components: {
        AppNavbar  // 注册 Navbar 组件
    },
    data() {
        return {
            products: [], // 收藏商品列表
            filteredProducts: [], // 筛选后的商品列表
            loading: true,
            searchQuery: "", // 搜索框的输入内容
        };
    },
    methods: {
        searchProducts() {
            if (this.searchQuery.trim() === "") {
                // 如果搜索框为空，直接返回所有商品
                this.filteredProducts = this.products;
            } else {
                // 否则，根据商品名进行搜索
                this.filteredProducts = this.products.filter(product =>
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
        },
        async fetchFavorites() {
            try {
                // const response = await axios.get(`http://localhost:8080/api/favorites/${userId}`); 
                const response = await axios.get(`http://localhost:8080/api/favorites/1`);
                console.log("获取收藏", response.data.products);
                this.products = response.data.products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image_urls,
                    favorite_id: product.favorite_id,
                }))
                // 初始化时展示所有商品
                this.filteredProducts = this.products;
            } catch (error) {
                console.error("获取收藏商品列表失败", error);
            } finally {
                this.loading = false;
            }
        },
        async removeFavorite(productId) {
            if (confirm("确定要取消收藏该商品吗？")) {
                try {
                    console.log(productId);
                    await axios.delete(`http://localhost:8080/api/favorites/${productId}`);
                    // this.products = this.products.filter((product) => product.id !== productId);
                    const productIndex = this.products.findIndex(product => product.favorite_id === productId);
                    if (productIndex !== -1) {
                        this.products.splice(productIndex, 1); // 使用 splice 删除该商品
                    }
                    // 更新过滤后的商品列表
                    this.filteredProducts = [...this.products];  // 重新赋值触发视图更新
                    alert("取消收藏成功");
                } catch (error) {
                    console.error("取消收藏失败", error);
                    alert("取消收藏失败，请稍后再试");
                }
            }
        },
    },
    async mounted() {
        await this.fetchFavorites();
    },
};
</script>


<style scoped>
.favorites-container {
    /* max-width: 1800px; */
    margin: 60px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 20px;
}

#app {
    max-width: 1580px;
}

h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    font-weight: bold;
    /* 使字体加粗 */
    font-size: 20px;
    padding: 5px;
}

.batch-manage {
    background: #1976d2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-right: 15px;
}

.search-input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 300px;
}

.search-button {
    background-color: #1976d2;
    /* 蓝色背景 */
    color: white;
    /* 白色字体 */
    border: none;
    /* 去除边框 */
    padding: 10px 20px;
    /* 上下10px，左右20px的内边距 */
    font-size: 14px;
    /* 字体大小 */
    border-radius: 5px;
    /* 圆角按钮 */
    cursor: pointer;
    /* 鼠标悬停时显示手形 */
    transition: background-color 0.3s ease;
    /* 鼠标悬停时的过渡效果 */
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}

.product-card {
    position: relative;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* .product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
} */

.product-image-container {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 0 auto 10px;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

.image-trash-button {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    background: #d8d6d6;
    border: none;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.image-trash-button i {
    color: #fff;
    font-size: 14px;
}

.product-card:hover .image-trash-button {
    display: block;
}

.image-trash-button:hover {
    background: #979797;
}

.product-info {
    text-align: left;
}

.product-info .price {
    font-size: 18px;
    color: #e91e63;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

.product-info h3 {
    font-size: 16px;
    margin: 10px 0;
    text-align: left;
    display: -webkit-box;
    /* -webkit-line-clamp: 2; */
    line-clamp: 2; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}


.product-info .price {
    font-size: 18px;
    color: #e91e63;
    font-weight: bold;
    margin-bottom: 10px;
}


.remove-button {
    background-color: #979797;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    margin-left: 50px;
}

.remove-button:hover {
    background-color: #979797;
}
</style>
