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
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
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
            <el-col :span="7">
              <div class="captcha">
                <img
                  class="captcha"
                  src="http://127.0.0.1/heimamm/public/captcha?type=login"
                  alt
                  ref="captcha"
                  @click="getRandomCode"
                />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked" class="checkbox-value" prop="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
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
    var checkPhone = (rule, value, callback) => {
      // 正则
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 正则验证
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的手机号"));
      }
      callback();
    };
    var checkAgree = (rule, value, callback) => {
      if (value == false) {
        return callback(new Error("必须勾选协议"));
      }
      callback();
    };
    return {
      loginForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        // 待修改
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        checked: [{ validator: checkAgree }]
      }
    };
  },
  methods: {
    getRandomCode() {
      // 时间戳
      this.$refs.captcha.src = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.$axios({
            url:'/login',
            method:'post',
            data: this.loginForm,
            // ?
            withCredentials:true
          }).then(res=>{
            //成功回调
            // window.console.log(res)
            if (res.data.code == 200) {
              this.$message.success(res.data.message)
              window.localStorage.setItem("token",res.data.data.token)
              // 跳转到首页
              this.$router.push("/index");
            }else {
              this.$message.warning(res.data.message)
            }
          });
        } else {
          this.$message({
            message:'请正确输入内容',
            type:"warning",
          })
          return false;
        }
      });
    }
  },
  created() {}
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
      .el-col-7 .captcha {
        width: 100%;
        height: 38px;
        padding: 2px;
        background-color: #fff;
      }
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
      .el-form-item__content .signin-btn {
        width: 100%;
      }
    }
  }
}
</style>