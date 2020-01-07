<template>
  <div class="question-container">
    <!-- 学科头部 -->
    <el-card class="card-header">
      <el-form :inline="true" :model="questionForm" ref="questionForm" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questionForm.subject" placeholder="请选择学科">
            <el-option label="前端" :value="1"></el-option>
            <el-option label="后端" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questionForm.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="questionForm.enterprise" placeholder="请选择企业">
            <el-option label="黑马程序员" :value="1"></el-option>
            <el-option label="阿里" :value="2"></el-option>
            <el-option label="京东" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="questionForm.type" placeholder="请选择题型">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="questionForm.difficulty" placeholder="请选择难度">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="questionForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="questionForm.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-input v-model="questionForm.create_date" placeholder="选择日期"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title" class="long-input">
          <el-input v-model="questionForm.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">搜索</el-button>
          <el-button @click="resetFilter">清除</el-button>
          <el-button type="primary" @click="addFormVisible=true" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部 -->
    <el-card class="card-main">
      <el-table :data="questionTable">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="step" label="学科.阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="visit" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="enterEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="changeState(scope.row)">{{scope.row.status === 0?"启用":"禁用"}}</el-button>
            <el-button size="mini" type="text">删除</el-button>
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
    <!-- 新增题库的对话框 -->
    <questionDialog/>
  </div>
</template>

<script>
//导入接口
import {getQuestionList,setQuestionStatus} from '../../../api/question.js'
// 导入新增题库的组件
import questionDialog from './component/questionDialog.vue'
export default {
  name: "question",
components: {
    questionDialog,
  },
  data() {
    return {
      questionForm: {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        title: ""
      },
      questionTable: [
        {
          title: "ABC",
          step: "前端.初级",
          type: "多选",
          enterprise: "黑马",
          username: "管理员",
          status: 1,
          visit:0,
        },
      ],
      page: 1,
      total: 0,
      limit: 5,
      addFormVisible: false,
    };
  },
  methods: {
    //获取题库列表数据
    getQuestionList(){
      getQuestionList({
        page: this.page,
        limit: this.limit,
        ...this.questionForm,
      }).then(res=>{
        window.console.log(res);
        if (res.data.code === 200) {
          this.questionTable = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      })
    },
    //修改状态
    changeState(item){
      setQuestionStatus({
        id:item.id
      }).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          this.$message.success("状态修改成功!");
          this.getQuestionList();
        }
      });
    },
    //搜索功能
    filterData() {
      this.page = 1;
      this.getQuestionList();
    },
    //清除功能
    resetFilter() {
      this.$refs.questionForm.resetFields();
    },
    //页容量改变
    handleSizeChange(limit) {
      this.limit = limit;
      this.page = 1;
      this.getQuestionList();
    },
    //页码改变
    handleCurrentChange(page) {
      this.page = page;
      this.getQuestionList();
    }
  },
  created() {
    this.getQuestionList();
  },
};
</script>

<style lang="less" scoped>
.question-container {
  .el-button--primary .plus {
    font-weight: 500;
  }
  .long-input {
    .el-form-item__content .el-input {
      width: 388px;
    }
  }
  .el-form {
    width: 80%;
    .el-form-item {
      margin-right: 30px;
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