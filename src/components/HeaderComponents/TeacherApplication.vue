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
      <el-form-item label="国 籍" prop="nation" label-width="90px">
        <el-input v-model="applicationForm.nation" placeholder="国籍"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contact" label-width="90px">
        <el-input v-model="applicationForm.contact" placeholder="邮箱或手机号"></el-input>
      </el-form-item>
      <el-form-item label="机 构" prop="institute" label-width="90px">
        <el-input v-model="applicationForm.institute" placeholder="所在院校"></el-input>
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
        nation: '',
        contact: '',
        institute: '',
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
        nation: [
          { required: true, message: '请输入国籍', trigger: 'blur' },
        ],
        contact: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        institute: [
          { required: true, message: '请输入所在机构', trigger: 'blur' },
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
            teacherApprove: this.applicationForm.id,
            desc: this.applicationForm.description,
            nation: this.applicationForm.nation,
            contact: this.applicationForm.contact,
            institute: this.applicationForm.institute,
            id: this.curUserID,
          }).then((res) => {
            if (res.data.code === -1) {
              this.$notify({
                title: '申请失败',
                message: res.data.msg,
                type: 'warning',
              });
            } else {
              this.$notify({
                title: '申请成功，请等待审核。',
                type: 'success',
              });
              this.$router.go(0);
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
