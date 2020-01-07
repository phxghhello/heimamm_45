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
          <el-button type="primary" @click="filterData">搜索</el-button>
          <el-button @click="resetFilter">清除</el-button>
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <!-- 表格 -->
      <el-table :data="subjectTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
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
          <!-- 要获取该行的数据 template必须加上 -->
          <template slot-scope="scope">
            <el-button type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeState(scope.row)">{{scope.row.status === 0?"启用":"禁用"}}</el-button>
            <el-button type="text" @click="removeSubject(scope.row)">删除</el-button>
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
    <!-- 新增学科的对话框 -->
    <subjectDialog/>
  </div>
</template>

<script>
// 导入学科的接口
import {getSubjectList,setSubjectStatus,removeSubject} from '../../../api/subject.js'
//导入新增学科的组件
import subjectDialog from './component/subjectDialog.vue'

export default {
  name:'subject',
  //注册组件
  components:{
    subjectDialog
  },
  data() {
    return {
      subjectForm: {
        rid: "",
        name: "",
        username: "",
        status: "",
      },
      //暂时的假数据
      subjectTable: [
        {
          rid: "subject1",
          name: "前端与移动开发",
          short_name: "前端",
          username: "管理员",
          create_time: "2019-12-4",
          status: 0
        },
        {
          rid: "subject2",
          name: "Java",
          short_name: "后端",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        },
        {
          rid: "subject3",
          name: "Java",
          short_name: "后端",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        },
        {
          rid: "subject4",
          name: "Java",
          short_name: "后端",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        },
        {
          rid: "subject5",
          name: "Java",
          short_name: "后端",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        },
        {
          rid: "subject6",
          name: "Java",
          short_name: "后端",
          username: "管理员",
          create_time: "2019-12-5",
          status: 1
        },
      ],
      //当前页-高亮显示
      page: 1,
      //总的数据的条数
      total: 0,
      //页容量,每页显示多少条信息
      limit: 5,
      //新增学科的对话框默认不可见
      addFormVisible:false,

    };
  },
  methods: {
    //获取学科列表数据
    getSubjectList(){
      //调用接口
      getSubjectList({
        page:this.page,
        limit:this.limit,
        // ...this.subjectForm,  //映射
        name:this.subjectForm.name,
        rid:this.subjectForm.rid,
        username:this.subjectForm.username,
        status:this.subjectForm.status,
      }).then(res=>{
        window.console.log(res);
        this.subjectTable = res.data.data.items;
        this.total = res.data.data.pagination.total;
      })
    },
    //修改状态
    changeState(item){
      setSubjectStatus(item.id).then(res=>{
        window.console.log(res)
        if (res.data.code===200) {
          this.$message.success("状态修改成功!")
          this.getSubjectList();
        }
      })
    },
    //搜索功能 功能没有效果,为啥?
    filterData(){
      this.page=1;
      this.getSubjectList();
    },
    //清除功能
    resetFilter(){
      this.$refs.subjectForm.resetFields();
    },
    //删除学科列表
    removeSubject(item){
      this.$confirm('此操作将删除这个学科,是否继续?', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用接口
        removeSubject({
          id:item.id
        }).then(res=>{
          if (res.data.code===200) {
            this.$message.success("已删除");
            this.getSubjectList();
          }
        })
      }).catch(() => {});
    },
    //页容量改变
    handleSizeChange(limit) {
      this.limit=limit;
      this.page=1;
      //重新获取学科列表数据
      this.getSubjectList()
    },
    //页码改变
    handleCurrentChange(page) {
      this.page=page;
      //重新获取数据
      this.getSubjectList()
    }
  },
  //页面一加载默认返回学科列表的数据
  created() {
    this.getSubjectList();
  },
};
</script>

<style lang="less" scoped>
.subject-container {
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
    span.red{
      color: red;
    }
  }
}
</style>