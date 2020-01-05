<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <i class="el-icon-s-operation icon"></i>
        <img class="index-logo" src="../../assets/index_logo.png" alt />
        <span class="indexmm">黑马面面</span>
      </div>
      <div class="header-right">
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="username">{{userInfo.username}}, 您好</span>
        <el-button size="small" type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from "../../api/user.js";

export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    logout() {
      this.$confirm("确定退出黑马面面吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用退出接口
          logout().then(res => {
            if (res.code === 200) {
              window.localStorage.removeItem("mmtoken");
              this.$store.commit("SETINFO", undefined);
              // 跳转去登录页
              this.$router.push("/login");
              // this.$message({
              //   type: 'success',
              //   message: '退出成功!'
              // });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-color: #eee;
  // 头部
  .el-header {
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    .header-left {
      height: 100%;
      width: 250px;
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 15px;
      }
      .index-logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .indexmm {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 43px;
        margin-right: 9px;
      }
      .username {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .el-aside {
    background-color: skyblue;
  }
}
</style>