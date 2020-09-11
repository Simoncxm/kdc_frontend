<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="账 号" prop="account" label-width="60px">
        <el-input v-model="loginForm.account" placeholder="邮箱 / 手机号"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password" label-width="60px">
        <el-input type="password" v-model.trim="loginForm.password" maxlength="16"
          @keyup.enter.native="submitForm('loginForm')" placeholder="密 码">
        </el-input>
      </el-form-item>
      <div class="form-group-btn">
        <el-button type="primary" @click="submitForm('loginForm')"
          style="widht:200px;">登录
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
          console.log(this.loginForm.account);
          console.log(this.loginForm.password);
        }
      });
    },
    clear() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>
