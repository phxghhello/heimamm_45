<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <i class="el-icon-s-operation icon" @click="isCollapse = !isCollapse"></i>
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
      <el-aside style="width:auto" width="isCollapse?200px:60px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo" router :collapse="isCollapse"
        >
          <template v-for="(item, index) in routes[2].children" >
            <el-menu-item v-if="item.meta.roles.includes($store.state.userInfo.role)" :key="index" :index="item.meta.fullPath">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入退出接口
import { logout } from "../../api/user.js";
//导入路由信息
import routes from '../../router/routes.js'
//导入token
import {removeToken} from '../../utils/token.js'

export default {
  name: "index",
  data() {
    return {
      routes,
      isCollapse: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    //退出登录
    logout() {
      this.$confirm("确定退出黑马面面吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          //调用退出接口
          logout().then(res => {
            if (res.data.code === 200) {
              removeToken();
              this.$store.commit("SETINFO", undefined);
              // 跳转去登录页
              this.$router.push("/login");
            }
          });
        }).catch(() => {
          //什么也不用执行
        });
    },
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
        cursor: pointer;
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
    // 侧边导航
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 200px;
  }
  .el-menu--collapse{
    height: 100%;
  }
    .main {
    background-color: #e8e9ec;
  }
}
</style>