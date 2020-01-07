<template>
  <div class="enterprise-container">
    <!-- 学科头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="enterpriseForm" ref="enterpriseForm" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username" class="short-input">
          <el-input v-model="enterpriseForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="enterpriseForm.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">搜索</el-button>
          <el-button @click="resetFilter">清除</el-button>
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="enterpriseTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">{{ scope.row.create_time | formatTime }}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeState(scope.row)"
            >{{scope.row.status === 0?"启用":"禁用"}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 6, 7, 8]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 新增企业的对话框 -->
    <enterpriseDialog />
  </div>
</template>

<script>
//导入新增企业的组件
import enterpriseDialog from "./component/enterpriseDialog.vue";
import {
  getEnterpriseList,
  setEnterpriseStatus
} from "../../../api/enterprise.js";
export default {
  name: "enterprise",
  components: {
    enterpriseDialog
  },
  data() {
    return {
      enterpriseForm: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      // 暂时的假数据
      enterpriseTable: [
        {
          eid: "enterprise1",
          name: "前端与移动开发",
          username: "管理员",
          create_time: "2019-12-4",
          status: 0
        },
        {
          eid: "enterprise2",
          name: "Java",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        }
      ],
      page: 1,
      total: 0,
      limit: 5,
      addFormVisible: false
    };
  },
  methods: {
    //获取企业列表数据
    getEnterpriseList() {
      //调用接口
      getEnterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.enterpriseForm
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.enterpriseTable = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    //改变企业状态
    changeState(item) {
      setEnterpriseStatus({
        id: item.id
      }).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.$message.success("状态修改成功!");
          this.getEnterpriseList();
        }
      });
    },
    //搜索功能 
    filterData(){
      this.page=1;
      this.getEnterpriseList();
    },
    //清除功能
    resetFilter(){
      this.$refs.enterpriseForm.resetFields();
    },
    onSubmit() {
      window.console.log("submit!");
    },
    //页容量改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.page = 1;
      this.getEnterpriseList();
    },
    //页码改变
    handleCurrentChange(page) {
      this.page = page;
      this.getEnterpriseList();
    }
  },
  created() {
    this.getEnterpriseList();
  }
};
</script>

<style lang="less" scoped>
.enterprise-container {
  .el-button--primary .plus {
    font-weight: 500;
  }
  .short-input {
    .el-form-item__content .el-input {
      width: 100px;
    }
  }
  .card-main {
    width: 100%;
    margin-top: 19px;
    .el-pagination {
      width: 550px;
      margin: 40px auto 8px;
    }
    span.red {
      color: red;
    }
  }
}
</style>