<template>
  <el-dialog
    center
    title="新增用户"
    class="user-dialog"
    :visible.sync="$parent.addFormVisible"
    :before-close="closeDialog"
  >
    <el-form ref="addForm" :model="addForm" :rules="rules">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="addForm.role_id" placeholder="请选择角色">
          <el-option label="超级管理员" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="addForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入新增接口
import { addUser } from "../../../../api/user.js";
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
  data() {
    return {
      addForm: {
        username: "wwww",
        email: "it123@itcast.com",
        phone: "",
        role_id: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        role_id: [
          { required: true, message: "角色不能为空", trigger: "blur" }
        ]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    //新增学科
    addUser() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //表单验证通过,调用接口
          addUser(this.addForm).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              this.$parent.addFormVisible = false;
              this.$parent.getUserList();
              this.$refs.addForm.resetFields();
            }else if(res.data.code === 201){
              return this.$message.warning(res.data.message)
            }
          });
        } else {
          //表单验证不通过
          return this.$message.warning("信息输入有误,请检查!");
        }
      });
    },
    closeDialog() {
      this.$parent.addFormVisible = false;
      // this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.user-dialog {
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      background: linear-gradient(
        to right,
        rgba(1, 198, 250, 1),
        rgba(20, 147, 250, 1)
      );
    }
    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
}
</style>