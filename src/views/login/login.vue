<template>
  <div class="login-container">
    <!-- 左边的表单 -->
   <div class="left"></div>
   <!-- 右边的图片 -->
   <div class="right">
     <img src="../../assets/login_banner_ele.png" alt="">
   </div>
  </div>
</template>

<script>
//验证逻辑的导入

export default {
  name: "login",
  data(){
    return {
    }
  },
  methods:{

  },
};
</script>

<style lang="less" scoped>
.login-container{
  height: 100%;
  background:linear-gradient(225deg,rgba(1,198,250,1),rgba(20,147,250,1));
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left{
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
  }
}
</style>