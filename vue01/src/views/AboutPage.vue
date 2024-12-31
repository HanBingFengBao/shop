<template>
    <div>
        <h1>About Page</h1>
     
    </div>
</template>

<script>
import axios from "axios";
import lottie from 'lottie-web';

    export default {
  
    data() {
        return {
        }

    },
    mounted(){
axios.get('/lottie/animation.json').then(response => {
    lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: response.data  // 使用加载的动画数据
    });
  })
  .catch(error => {
    console.error('加载动画文件失败:', error);
  });

}

}
</script>
