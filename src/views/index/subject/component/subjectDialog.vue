<template>
  <el-dialog center title="新增学科" class="subject-dialog" :visible.sync="$parent.addFormVisible" :before-close="closeDialog">
    <el-form ref="addForm" :model="addForm" :rules="rules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input type="textarea" rows="1" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addSubject">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入新增的方法
import { addSubject } from "../../../../api/subject.js";
export default {
  data() {
    return {
      addForm: {
        rid: "qd0001",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    //新增学科
    addSubject() {
    this.$refs.addForm.validate(valid=>{
        if (valid) {
            //表单验证通过,调用接口
            addSubject(this.addForm).then(res=>{
                window.console.log(res);
                if (res.data.code===200) {
                    this.$parent.addFormVisible = false
                    this.$parent.getSubjectList()
                    this.$refs.addForm.resetFields()
                }else if (res.data.code===201) {
                    this.$message.warning("该学科编号已存在!")
                }
            })

        } else {
            //表单验证不通过
            return this.$message.warning("信息输入有误,请检查!")
        }
    })
    },
    closeDialog(){
        this.$parent.addFormVisible = false
        this.$refs.addForm.resetFields()
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