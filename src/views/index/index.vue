<template>
  <el-container>
  <el-header>
    <div class="header-left">
      <i class="el-icon-s-operation icon"></i>
      <img class="index-logo" src="../../assets/index_logo.png" alt="">
      <span class="indexmm">黑马面面</span>
    </div>
    <div class="header-right">
      <img class="avatar" src="../../assets/avatar.png" alt="">
      <span class="username">利达,您好</span>
      <el-button size="small" type="primary">退出</el-button>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    name:"index"
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  background-color: #eee;
  // 头部
  .el-header{
    background-color: #fff;
    box-shadow:0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    .header-left{
      height: 100%;
      width: 250px;
      display:flex;
      align-items: center;
      .icon{
        font-size: 24px;
        margin-right: 15px;
      }
      .index-logo{
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .indexmm{
        font-size: 22px;
        color: #49A1FF;
      }
    }
    .header-right{
      display:flex;
      align-items: center;
      .avatar{
        width: 43px;
        height: 43px;
        border-radius: 43px;
        margin-right: 9px;
      }
      .username{
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .el-aside{
    background-color: skyblue;
  }
}
</style>