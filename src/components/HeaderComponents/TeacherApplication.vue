<template>
  <div>
    <el-form :label-position="labelPosition" :model="applicationForm"
      :rules="rules" ref="applicationForm" label-width="100px">
      <el-form-item label="姓 名" prop="name" label-width="90px">
        <el-input v-model="applicationForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="教 师 ID" prop="id" label-width="90px">
        <el-input v-model="applicationForm.id" placeholder="教师ID"></el-input>
      </el-form-item>
      <el-form-item label="申 请 描 述" prop="description" label-width="90px">
        <el-input type="textarea" v-model.trim="applicationForm.description"
          @keyup.enter.native="submitForm('applicationForm')" placeholder="申请描述">
        </el-input>
      </el-form-item>
      <div class="form-group-btn">
        <el-button type="primary" class="btn-block" @click="submitForm('loginForm')"
          style="widht:200px;">提交
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'TeacherApplication',
  data() {
    return {
      curUserID: null,
      labelPosition: 'left',
      applicationForm: {
        name: '',
        id: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        id: [
          { required: true, message: '请输入教师ID', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入申请描述', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    if (this.$cookies.isKey('userID')) {
      this.curUserID = this.$cookies.get('userID');
    }
  },
  methods: {
    submitForm() {
      this.$refs.applicationForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/api/applyTeacher', {
            name: this.applicationForm.name,
            teacherId: this.applicationForm.id,
            desc: this.applicationForm.description,
            id: this.curUserID,
          }).then((res) => {
            if (res.data.code === 0) {
              this.$notify({
                title: '申请成功，请等待审核。',
                type: 'success',
              });
              this.$router.go(0);
            } else {
              this.$notify({
                title: '申请失败',
                message: res.data.msg,
                type: 'warning',
              });
            }
          });
        }
      });
    },
    clear() {
      this.$refs.applicationForm.resetFields();
    },
  },
};
</script>
