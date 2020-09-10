<!--发送帖子-->
<template>
  <div>
    <el-button type="primary" @click="createPostVisible = true">发帖</el-button>
    <el-dialog title="发帖" :visible.sync="createPostVisible">
      <el-form label-position="top" :model="postForm" :rules="rules" ref="postForm"
               label-width="100px" class="demo-postForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-tag>学习讨论</el-tag>
          <el-tag type="success">问题提问</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">精华</el-tag>
          <el-tag type="danger">标签五</el-tag>
        </el-form-item>
        <el-form-item label="帖子内容" prop="content">
          <el-input v-model="postForm.content" type="textarea" :rows="3" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('postForm')">发帖</el-button>
          <el-button @click="resetForm('postForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style></style>

<script>
export default {
  data() {
    return {
      createPostVisible: false,
      postForm: {
        title: '',
        tags: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur',
          },
        ],
        tags: { required: true, message: '请添加标签', trigger: 'blur' },
        content: [
          { required: true, message: '请填写帖子详细内容', trigger: 'blur' },
        ],
      },
      methods: {
        // submitForm(form) {
        //
        // },
        // resetForm(form) {
        //
        // },
      },
    };
  },
};
</script>
