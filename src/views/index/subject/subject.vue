<template>
  <div class="subject-container">
    <!-- 学科头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="subjectForm" ref="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username" class="short-input">
          <el-input v-model="subjectForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="subjectForm.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">
            新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjectForm: {
        rid: "",
        name: "",
        username: "",
        status: "",
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
  }
};
</script>

<style lang="less" scoped>
.subject-container {
  .el-button--primary .plus {
    font-weight: 500;
  }
  .short-input{
    .el-form-item__content .el-input{
        width: 100px;
    }
  }
  .card-main{
      margin-top: 19px;
  }
}
</style>