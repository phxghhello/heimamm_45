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
        <el-radio-group v-model="addForm.difficulty">
          <el-radio label="简单"></el-radio>
          <el-radio label="一般"></el-radio>
          <el-radio label="困难"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div ref="titleHeader" class="title-header"></div>
      <div ref="titleMain" class="title-main"></div>
      <!-- 单选 -->
      <el-form-item
        label="单选"
        v-if="addForm.type===1"
        class="single-item"
        prop="single_select_answer"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="addForm.single_select_answer">
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addForm.select_options[0].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleASuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addForm.select_options[1].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleBSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addForm.select_options[2].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleCSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addForm.select_options[3].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleDSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        label="多选"
        v-if="addForm.type===2"
        class="multiple-item"
        prop="multiple_select_answer"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="addForm.multiple_select_answer">
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addForm.select_options[0].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleASuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addForm.select_options[1].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleBSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addForm.select_options[2].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleCSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addForm.select_options[3].text" placeholder></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handleDSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item v-else label="简答" class="answer-item" prop="short_answer">
        <el-input v-model="addForm.short_answer" type="textarea" rows="3"></el-input>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="解析视频" prop="video" class="video-item" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传video/mp4文件，且不超过2048kb</div>
        </el-upload>
        <video class="video" controls :src="videoUrl"></video>
      </el-form-item>
      <!-- 时间线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze"></el-form-item>
      <div ref="answerHeader" class="answer-header"></div>
      <div ref="answerMain" class="answer-main"></div>
      <!-- 简答 -->
      <el-form-item label="试题备注" prop="remark" class="answer-item">
        <el-input v-model="addForm.remark" type="textarea" rows="3" placeholder></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addQuestion">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入富文本
import Wangeditor from "wangeditor";
//导入新增的方法
import { addQuestion } from "../../../../api/enterprise.js";
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
      formLabelWidth: "80px",
      titleEditor: undefined,
      answerEditor: undefined
    };
  },
  methods: {
    //新增题库
    addQuestion() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //表单验证通过,调用接口
          addQuestion(this.addForm).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              // 富文本的清空需要自己来
              this.titleEditor.txt.html("");
              this.answerEditor.txt.html("");
              this.$parent.addFormVisible = false;
              this.$parent.getQuestionList();
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
    opened() {
      if (!this.titleEditor) {
        this.titleEditor = new Wangeditor(
          this.$refs.titleHeader,
          this.$refs.titleMain
        );
        // 绑定 change事件
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // console.log(html);
          this.form.title = html;
        };
        this.titleEditor.create();
      }
      if (!this.answerEditor) {
        this.answerEditor = new Wangeditor(
          this.$refs.answerHeader,
          this.$refs.answerMain
        );
        // 绑定 change事件
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // console.log(html);
          this.form.answer_analyze = html;
        };
        this.answerEditor.create();
      }
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
    .el-select {
      width: 364px;
    }
    .el-select,
    .el-radio-group {
      margin-left: 41px;
    }
  }
}
</style>