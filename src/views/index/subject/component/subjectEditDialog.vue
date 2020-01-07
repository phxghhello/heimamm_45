<template>
  <el-dialog
    center
    title="修改学科"
    class="subject-dialog"
    :visible.sync="$parent.editFormVisible"
    :before-close="closeDialog"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" rows="1" v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="editSubject">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入编辑的方法
import { editSubject } from "../../../../api/subject.js";
export default {
  name: "subject-dialog",
  data() {
    return {
      editForm: {},
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    closeDialog() {
      this.$parent.editFormVisible = false;
    },
    editSubject() {
      this.$refs.editForm.validate(valid=>{
        if (valid) {
            //调用接口
            editSubject(this.editForm).then(res=>{
                window.console.log(res)
                if (res.data.code===200) {
                    this.$parent.getSubjectList()
                    this.$parent.editFormVisible = false;
                    this.$message.success("已修改!")
                }
            })
        }else{
            return this.$message.warning("学科信息输入有误,请检查!")
        }
      })
    }
  }
};
</script>

<style lang="less">
.subject-dialog {
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