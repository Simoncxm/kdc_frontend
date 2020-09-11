<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-button type="text" icon="el-icon-video-camera-solid">
            <router-link to="/">知识传播社区</router-link>
          </el-button>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-input placeholder="请输入内容" v-model="searchText">
            <el-select v-model="searchType" slot="prepend">
              <el-option label="搜课程" :value="1"></el-option>
              <el-option label="搜老师" :value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="1" v-if="curUserID === null"
          @click.native="showDialog = !showDialog">
          <el-button type="text">登录/注册</el-button>
        </el-col>
        <el-col :span="2" :offset="1" v-if="curUserID !== null">
          <el-button type="text">我的课程</el-button>
        </el-col>
        <el-col :span="2" :offset="1" v-if="curUserID !== null"
          @click.native="showDialogCourse = !showDialogCourse">
          <el-button type="text">新增课程</el-button>
        </el-col>
        <el-col :span="2" v-if="curUserID !== null">
          <el-button type="text">个人中心</el-button>
        </el-col>
        <el-col :span="2" v-if="curUserID !== null">
          <el-button type="text" @click="quit">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-dialog
      :visible.sync="showDialog"
      width="30%" @close="closeDialog">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <Login ref="login"/>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <Register ref="register"/>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      :visible.sync="showDialogCourse"
      width="30%" @close="closeDialogCourse">
          <AddCourse ref="addCourse"/>
    </el-dialog>
  </div>
</template>

<script>

import Login from './HeaderComponents/Login.vue';
import Register from './HeaderComponents/Register.vue';
import AddCourse from './HeaderComponents/AddCourse.vue';

export default {
  name: 'Header',
  components: { Register, Login, AddCourse },
  data() {
    return {
      curUserID: 111,
      searchText: null,
      showDialog: false,
      showDialogCourse: false,
      activeName: 'first',
      searchType: 1,
    };
  },
  mounted() {
    if (this.$cookies.isKey('userID')) {
      this.curUserID = this.$cookies.get('userID');
    }
  },
  methods: {
    closeDialog() {
      this.$refs.login.clear();
      this.$refs.register.clear();
    },
    closeDialogCourse() {
      this.$refs.addCourse.clear();
    },
    quit() {
      this.curUserID = null;
      this.$cookies.remove('userID');
      this.$router.go(0);
    },
    search() {
      console.log(this.searchType);
      console.log(this.searchText);
    },
  },
};
</script>

<style scoped>
</style>
