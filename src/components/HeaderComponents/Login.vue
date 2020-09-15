<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="账 号" prop="account" label-width="60px">
        <el-input v-model="loginForm.account" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password" label-width="60px">
        <el-input type="password" v-model.trim="loginForm.password" maxlength="16"
          @keyup.enter.native="submitForm('loginForm')" placeholder="密 码">
        </el-input>
      </el-form-item>
      <div class="form-group-btn">
        <el-button type="primary" class="btn-block" @click="submitForm('loginForm')"
          style="widht:200px;">
          登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/api/login', {
            name: this.loginForm.account,
            password: this.loginForm.password,
          }).then((res) => {
            if (res.data.code === -1) {
              this.$notify({
                title: '登录失败',
                message: res.data.msg,
                type: 'warning',
              });
            } else {
              this.$cookies.set('userID', res.data.id);
              this.$cookies.set('userType', res.data.identity);
              this.$cookies.set('username', this.loginForm.account);
              this.$router.go(0);
            }
          });
        }
      });
    },
    clear() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>
