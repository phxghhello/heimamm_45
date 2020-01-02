<template>
  <div class="login-container">
    <!-- 左边的表单 -->
    <div class="left">
      <!-- 头部标题 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单区域 -->
      <el-form ref="form" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked" class="checkbox-value">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="signin-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <div class="right">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
//验证逻辑的导入

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  display: flex;
  // 上下居中
  align-items: center;
  // 左右平分
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 7px;
    .title-box {
      display: flex;
      padding-left: 43px;
      align-items: center;
      height: 99px;
      img {
        width: 22px;
        height: 17px;
        margin-right: 13px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 28px;
        margin-right: 14px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    .login-form {
      padding-left: 43px;
      padding-right: 41px;
      // 多选框
      .checkbox-value.checkbox-value {
        height: 16px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
      }
      //登录按钮
      .el-form-item__content .login-btn,
      .el-form-item__content .signin-btn{
        width: 100%;
      }
    }
  }
}
</style>