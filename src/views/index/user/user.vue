<template>
  <div class="user-container">
    <!-- 用户头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="userForm" ref="userForm" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userForm.role_id" placeholder="请选择角色">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">搜索</el-button>
          <el-button @click="resetFilter">清除</el-button>
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="userTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeState(scope.row)">{{scope.row.status === 0?"启用":"禁用"}}</el-button>
            <el-button type="text" @click="removeUser(scope.row)">删除</el-button>
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
    <!-- 新增用户的对话框 -->
    <userDialog/>
  </div>
</template>

<script>
import userDialog from './component/userDialog.vue'
import {getUserList,setUserStatus,removeUser} from '../../../api/user.js'
export default {
  name: "user",
  components: {
    userDialog,
  },
  data() {
    return {
      userForm: {
        username: "",
        email: "",
        role_id: "",
      },
      //暂时的假数据
      userTable: [
        {
          username: "user1",
          email: "js@qq.com",
          role_id: "管理员",
          create_time: "2019-12-4",
          status: 0
        },
        {
          username: "user2",
          email: "Java@qq.com",
          role_id: "管理员",
          create_time: "2019-12-5",
          status: 1
        }
      ],
      page: 1,
      total: 0,
      limit: 5,
      addFormVisible: false,
    };
  },
  methods: {
    //获取用户列表
    getUserList(){
      //调用接口
      getUserList({
        page:this.page,
        limit:this.limit,
        ...this.userForm
      }).then(res=>{
        window.console.log(res);
        if (res.data.code === 200) {
          this.userTable = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      })
    },
    //修改状态
    changeState(item){
      setUserStatus({
        id:item.id
      }).then(res=>{
        window.console.log(res)
        if (res.data.code === 200) {
          this.$message.success("状态修改成功!");
          this.getUserList();
        }
      })
    },
    //搜索功能
    filterData() {
      this.page = 1;
      this.getUserList();
    },
    //清除功能
    resetFilter() {
      this.$refs.userForm.resetFields();
    },
    //删除功能
    removeUser(item){
      this.$confirm("此操作将删除该用户信息,是否继续?", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用接口
          removeUser({
            id: item.id
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success("已删除");
              this.getUserList();
            }
          });
        })
        .catch(() => {});
    },
    //页容量改变
    handleSizeChange(limit) {
        this.limit = limit;
        this.page = 1;
        this.getUserList();
    },
    //页码改变
    handleCurrentChange(page) {
      this.page = page;
      this.getUserList();
    }
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
.user-container {
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
    .el-pagination{
      width: 550px;
      margin: 40px auto 8px;
    }
    span.red {
      color: red;
    }
  }
}
</style>