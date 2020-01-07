<template>
  <el-dialog
    center
    fullscreen
    title="新增题库"
    class="enterprise-dialog"
    :visible.sync="$parent.addFormVisible"
    :before-close="closeDialog"
  >
    <el-form ref="addForm" :model="addForm" :rules="rules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="addForm.subject" placeholder="请选择学科">
          <el-option label="前端" :value="1"></el-option>
          <el-option label="后端" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="addForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="addForm.enterprise" placeholder="请选择企业">
          <el-option label="黑马程序员" :value="1"></el-option>
          <el-option label="阿里" :value="2"></el-option>
          <el-option label="京东" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <el-select v-model="addForm.city" placeholder="请选择城市">
          <el-option label="北京" :value="1"></el-option>
          <el-option label="天津" :value="2"></el-option>
          <el-option label="上海" :value="3"></el-option>
          <el-option label="重庆" :value="4"></el-option>
          <el-option label="河北" :value="5"></el-option>
          <el-option label="河南" :value="6"></el-option>
          <el-option label="云南" :value="7"></el-option>
          <el-option label="辽宁" :value="8"></el-option>
          <el-option label="黑龙江" :value="9"></el-option>
          <el-option label="湖南" :value="10"></el-option>
          <el-option label="安徽" :value="11"></el-option>
          <el-option label="山东" :value="12"></el-option>
          <el-option label="新疆" :value="13"></el-option>
          <el-option label="江苏" :value="14"></el-option>
          <el-option label="浙江" :value="15"></el-option>
          <el-option label="江西" :value="16"></el-option>
          <el-option label="湖北" :value="17"></el-option>
          <el-option label="广西" :value="18"></el-option>
          <el-option label="甘肃" :value="19"></el-option>
          <el-option label="山西" :value="20"></el-option>
          <el-option label="内蒙古" :value="21"></el-option>
          <el-option label="陕西" :value="22"></el-option>
          <el-option label="吉林" :value="23"></el-option>
          <el-option label="福建" :value="24"></el-option>
          <el-option label="贵州" :value="25"></el-option>
          <el-option label="广东" :value="26"></el-option>
          <el-option label="青海" :value="27"></el-option>
          <el-option label="西藏" :value="28"></el-option>
          <el-option label="四川" :value="29"></el-option>
          <el-option label="宁夏" :value="30"></el-option>
          <el-option label="海南" :value="31"></el-option>
          <el-option label="台湾" :value="32"></el-option>
          <el-option label="香港" :value="33"></el-option>
          <el-option label="澳门" :value="34"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.type">
          <el-radio label="单选"></el-radio>
          <el-radio label="多选"></el-radio>
          <el-radio label="简答"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.type">
          <el-radio label="简单"></el-radio>
          <el-radio label="一般"></el-radio>
          <el-radio label="困难"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addEnterprise">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入新增的方法
import { addEnterprise } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      addForm: {
        eid: "qy0001",
        name: "黑马程序员1",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    //新增学科
    addEnterprise() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //表单验证通过,调用接口
          addEnterprise(this.addForm).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              this.$parent.addFormVisible = false;
              this.$parent.getEnterpriseList();
              this.$refs.addForm.resetFields();
            } else if (res.data.code === 201) {
              this.$message.warning("该学科编号已存在!");
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
      this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.enterprise-dialog {
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