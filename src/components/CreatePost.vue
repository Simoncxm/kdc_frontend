<!--发送帖子-->
<template>
  <div >
    <el-button type="primary" @click="createPostVisible = true">发帖</el-button>
    <el-dialog title="发帖" :visible.sync="createPostVisible">
      <el-form label-position="top" :model="postForm" :rules="rules" ref="postForm"
               label-width="100px" class="demo-postForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="帖子内容" prop="content">
          <Editor v-model="postForm.content" :is-clear="isClear"></Editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(postForm)">发帖</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style></style>

<script>
import Editor from '@/components/Editor.vue';

export default {
  inject: ['reload'],
  components: {
    Editor,
  },
  props:[
      'circleId',
  ],
  data() {
    return {
      isClear: false,
      createPostVisible: false,
      postForm: {
        title: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur',
          },
        ],
        content: [
          { required: true, message: '请填写帖子详细内容', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(form) {
      if ( form.title === '') {
        this.$notify({
          title: '帖子标题不能为空',
          message: '',
          type: 'warning',
        });
        return;
      }
      if ( form.content === '') {
        this.$notify({
          title: '帖子内容不能为空',
          message: '',
          type: 'warning',
        });
        return;
      }
      const finalform = form;
      finalform.time = (new Date()).toLocaleString();
      finalform.circleId = this.circleId;// 圈子id暂未获取
      finalform.userId = this.$cookies.get('userID');// 用户身份暂未获取
      this.$axios.post('/api/posts/createPost', {
        circleId: finalform.circleId,
        userId: finalform.userId,
        title: finalform.title,
        content: finalform.content,
        time: finalform.time,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '发帖失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '发帖成功',
            message: '',
            type: 'success',
          });
          this.resetForm();
          this.createPostVisible = false;
          this.reload();
        }
      });
    },
    resetForm() {
      this.postForm.title = '';
      this.postForm.content = '';
    },
  },
};
</script>
