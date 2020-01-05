<template>
  <div class="subject-container">
    <!-- 学科头部 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region">
            <el-option label="禁用" value="quit"></el-option>
            <el-option label="启用" value="start"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button >清除</el-button>
          <el-button type="primary"> <span class="plus">+</span> 新增学科 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
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
.subject-container{
    .el-button--primary .plus{
        font-weight: 500;
    }
}
</style>