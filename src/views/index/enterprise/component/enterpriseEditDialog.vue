<template>
  <el-dialog
    center
    title="修改企业"
    class="enterprise-dialog"
    :visible.sync="$parent.editFormVisible"
    :before-close="closeDialog"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="editForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" rows="1" v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="editEnterprise">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入编辑的方法
import { editEnterprise } from "../../../../api/enterprise.js";
export default {
  name: "enterprise-dialog",
  data() {
    return {
      editForm: {},
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
        intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }],
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    closeDialog() {
      this.$parent.editFormVisible = false;
    },
    editEnterprise() {
      this.$refs.editForm.validate(valid=>{
        if (valid) {
            //调用接口
            editEnterprise(this.editForm).then(res=>{
                window.console.log(res)
                if (res.data.code===200) {
                    this.$parent.getEnterpriseList()
                    this.$parent.editFormVisible = false;
                    this.$message.success("修改成功")
                }
            })
        }else{
            return this.$message.warning("企业信息输入有误,请检查!")
        }
      })
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