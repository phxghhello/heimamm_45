<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            class="high-input"
            prefix-icon="el-icon-user"
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 验证码 -->
              <!-- <img src="../../assets/code.jpg" alt="" /> -->
              <img @click="changeCode" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
    <!-- 注册的对话框 -->
    <el-dialog center width="603px" title="用户注册" :visible.sync="dialogFormVisible" @closed="closeRegForm">
      <el-form :model="registerForm" ref="registerForm" :rules="rules" >
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="messageCodeUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input type="hidden" v-model="registerForm.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input show-password v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7" class="code-col">
              <img :src="regCodeUrl" alt @click="changeRegCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <el-button :disabled="delayTime!=0" @click="getMessage">{{btnMessage}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegisterForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入login接口
import { login, sendsms, register } from "../../api/login.js";
//导入token
import {saveToken} from '../../utils/token.js'
//定义验证邮箱的方法
const validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("邮箱不能为空"));
  } else {
    // 定义正则 正则  对象
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 验证
    if (reg.test(value) == true) {
      // 对
      callback();
    } else {
      // 错
      callback(new Error("邮箱格式不正确"));
    }
  }
};
// 定义验证手机号的方法
const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else {
    // 定义正则 正则  对象
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 验证
    if (reg.test(value) == true) {
      // 对
      callback();
    } else {
      // 错
      callback(new Error("手机号的格式不正确"));
    }
  }
};
export default {
  name: "login",
  data() {
    return {
      // 登录验证码的地址
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "12345678",
        code: "",
        // 是否勾选
        checked: false
      },
      rules: {
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在必须为4", trigger: "change" }
        ],
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        username: [
          { required: true, message: "头像不能为空", trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        rcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在必须为4", trigger: "change" }
        ]
      },
      //关于注册框
      regCodeUrl: `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms`,
      dialogFormVisible: false,
      formLabelWidth: "70px",
      registerForm: {
        phone: "",
        code: "",
        avatar: "",
        username: "",
        email: "",
        password: "",
        rcode: ""
      },
      imageUrl: "",
      messageCodeUrl: `${process.env.VUE_APP_BASEURL}/uploads`,
      delayTime:0,
      btnMessage:'获取用户验证码',
    };
  },
  methods: {
    // 登录点击事件
    submitForm(formName) {
      // 是否勾选
      if (this.ruleForm.checked == false) {
        // 提示
        this.$message.warning("亲爱的用户，请先勾选用户协议哦！");
        return;
      }
      // 等同于 this.$refs.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            window.console.log(res);
            if (res.data.code === 202) {
              // 错误
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              this.$message.success("老铁，你可算回来啦！！！");
              // window.localStorage.setItem("mmtoken",res.data.data.token);
              saveToken(res.data.data.token)
              this.$router.push('/index')
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    //注册提交事件
    submitRegisterForm() {
      this.$refs.registerForm.validate(valid => {
        if (valid){
          register(this.registerForm).then(res => {
            // window.console.log(res);
            if (res.data.code==200) {
              this.imageUrl='';
              this.dialogFormVisible=false;
              this.$message.success("恭喜您!注册成功!请登录");
            }else{
              return this.$message.error(res.data.message);
            }
          });
        } else {
          return this.$message.error("格式不对哦，检查一下呗！");
        }
      });
    },
    //关闭注册对话事件-清空表单
    closeRegForm(){
      this.$refs.registerForm.resetFields();
      this.imageUrl="";
    },
    // 切换登录验证码
    changeCode() {
      // 必须要有分隔符
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Date.now()
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    //切换注册的验证码
    changeRegCode() {
      this.regCodeUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&t=${Date.now()}`;
    },
    getMessage() {
      //判断手机格式
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        return this.$message.error("手机格式不正确");
      }
      //判断图形码的长度
      if (this.registerForm.code.length != 4) {
        return this.$message.error("图形码格式不正确");
      }
      //延时1min禁用获取短信验证码
      if (this.delayTime==0) {
        this.delayTime=60;
        var timeId = setInterval(() => {
          this.delayTime--;
          this.btnMessage="还剩"+this.delayTime+"秒可获取!"
          if (this.delayTime==0) {
            clearInterval(timeId)
            this.btnMessage= '获取用户验证码'
          }
        }, 100);
      }else{
        return;
      }
      sendsms({
        code: this.registerForm.code,
        phone: this.registerForm.phone
      }).then(res => {
        if (res.data.code==0) {
          return this.$message.error(res.data.message)
        }
        this.$message.success("短信验证码是: " + res.data.data.captcha);
        window.console.log(res);
      });
    },
    //头像上传
    handleAvatarSuccess(res, file) {
      //上传成功,生成的图片的路径
      this.imageUrl = URL.createObjectURL(file.raw);
      //图片的路径赋值
      this.registerForm.avatar =res.data.file_path;
      window.console.log(res.data.file_path);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 居中 */
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    // 标题盒子
    .title-box {
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    // 登录表单
    .login-form {
      padding-right: 41px;
      margin-top: 27px;
      // 更高的文本框
      .high-input > input {
        height: 45px;
        line-height: 45px;
      }
    }
    // 表单内部的 按钮
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn {
      margin-top: 28px;
    }
  }
  // 栅格 验证码
  .code-col {
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      // 小手手
      cursor: pointer;
    }
  }
  .el-dialog__header {
    background: linear-gradient(
      to right,
      rgba(1, 198, 250, 1),
      rgba(20, 147, 250, 1)
    );
  }
  .el-dialog__title {
    color: #fff;
  }
  //头像上传
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
