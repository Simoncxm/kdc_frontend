<template>
  <div>
    <el-form :model="registerForm" :rules="rules"  ref="registerForm" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" prop="email">
        <el-input v-model.trim="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input type="password" v-model.trim="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode" class="mb-2">
        <el-input v-model.trim="registerForm.verifyCode">
          <el-button slot="append" @click="getVerifyCode"
            :disabled="displayed" :loading="displayed">{{verifyHint}}</el-button>
        </el-input>
      </el-form-item>
      <div style="padding-top: 20px" >
        <el-button type="primary" class="btn-block"
          @click="submitForm('registerForm')">
          注册
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      time: 0,
      displayed: false,
      verifyHint: '获取验证码',
      registerForm: {
        username: '',
        password: '',
        email: '',
        verifyCode: '',
      },
      rules: {
        username: [
          {
            required: true, message: '请输入用户名', trigger: 'change',
          },
          {
            min: 2, max: 10, message: '长度在2到10位', trigger: ['blur', 'change'],
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6, max: 15, message: '长度在6到15位', trigger: ['blur', 'change'],
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/api/register', {
            name: this.registerForm.username,
            password: this.registerForm.password,
            captcha: this.registerForm.verifyCode,
            email: this.registerForm.email,
          }).then((res) => {
            if (res.data.code === -1) {
              this.$notify({
                title: '注册失败',
                message: res.data.msg,
                type: 'warning',
              });
            } else {
              this.$notify({
                title: '注册成功',
                type: 'success',
              });
              this.$router.go(0);
            }
          });
        }
      });
    },
    clear() {
      this.$refs.registerForm.resetFields();
    },
    getVerifyCode() {
      this.$axios.post('/api/sendEmail', {
        email: this.registerForm.email,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '登录失败',
            message: res.data.msg,
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '发送成功',
            type: 'success',
          });
        }
      });
      this.time = 60;
      this.displayed = true;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.time -= 1;
        this.verifyHint = `${this.time}s后重新获取`;
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.verifyHint = '重新获取';
        this.displayed = false;
      }
    },
  },
};
</script>
