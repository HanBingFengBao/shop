<template>
  <div class="container">
    <h2>商品详情编辑</h2>

    <form @submit.prevent="submitProduct" class="product-form" enctype="multipart/form-data">
      <div class="form-group">
        <label for="productName">商品名称:</label>
        <input type="text"  id="productName" v-model="product.productName" placeholder="商品名称" required />
      </div>

      <div class="form-group">
        <label for="productType">商品类型:</label>
        <input 
          type="text" 
          id="productType" 
          v-model="product.productType" 
          placeholder="商品类型" 
          required
        />
      </div>

      <div class="form-group">
        <label for="purchaseDate">购入日期:</label>
        <input 
          type="date" 
          id="purchaseDate" 
          v-model="product.purchaseDate" 
          required
        />
      </div>

      <div class="form-group">
        <label for="purchasePrice">购入价格:</label>
        <input 
          type="number" 
          id="purchasePrice" 
          v-model="product.purchasePrice" 
          placeholder="购入价格" 
          step="0.01" 
          required
        />
      </div>

      <div class="form-group">
        <label for="salePrice">出售价格:</label>
        <input 
          type="number" 
          id="salePrice" 
          v-model="product.salePrice" 
          placeholder="出售价格" 
          step="0.01" 
          required
        />
      </div>

      <div class="form-group">
        <label for="otherInfo">其他说明:</label>
        <textarea 
          id="otherInfo" 
          v-model="product.otherInfo" 
          placeholder="其他说明"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="productImage">商品图片:</label>
        <input 
          type="file" 
          id="productImage" 
          @change="handleFileUpload"
        />
      </div>

      <button type="submit" class="btn">提交</button>
    </form>

    <div v-if="message" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        productName: '',
        productType: '',
        purchaseDate: '',
        purchasePrice: '',
        salePrice: '',
        otherInfo: ''
      },
      productImage: null,
      message: '',
      messageClass: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.productImage = event.target.files[0];
    },
    async submitProduct() {
      try {
        const formData = new FormData();
        formData.append('productName', this.product.productName);
        formData.append('productType', this.product.productType);
        formData.append('purchaseDate', this.product.purchaseDate);
        formData.append('purchasePrice', this.product.purchasePrice);
        formData.append('salePrice', this.product.salePrice);
        formData.append('otherInfo', this.product.otherInfo);
        if (this.productImage) {
          formData.append('productImage', this.productImage);
        }

        const response = await fetch('/api/upload-product', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          this.message = '商品信息已提交！';
          this.messageClass = 'success-message';
          this.resetForm();
        } else {
          this.message = '提交失败，请稍后重试。';
          this.messageClass = 'error-message';
        }
      } catch (error) {
        console.error(error);
        this.message = '提交失败，请检查网络连接。';
        this.messageClass = 'error-message';
      }
    },
    resetForm() {
      this.product = {
        productName: '',
        productType: '',
        purchaseDate: '',
        purchasePrice: '',
        salePrice: '',
        otherInfo: ''
      };
      this.productImage = null;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
.btn {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>
