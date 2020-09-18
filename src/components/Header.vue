<template>
  <div>
    <el-header style="border-bottom: solid 1px #E1E7Eb; margin-bottom: 20px">
      <el-row type="flex" justify="center" style="margin-top: 20px">
        <el-col :span="3">
          <el-button type="text" icon="el-icon-video-camera-solid">
            <router-link to="/">知识传播社区</router-link>
          </el-button>
        </el-col>
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search">
            <el-select v-model="searchType" slot="prepend">
              <el-option label="搜课程" :value="1"></el-option>
              <el-option label="搜老师" :value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="1" :offset="3" v-if="curUserID === null">
          <el-button type="text" @click.native="showDialog = !showDialog">登录/注册</el-button>
        </el-col>
        <el-col :span="1" :offset="1" v-if="curUserID !== null">
          <el-badge :value="$store.state.msgNum" v-if="$store.state.msgNum !== 0">
            <el-button type="text">
              <router-link to="/personalCenter">个人中心</router-link>
            </el-button>
          </el-badge>
          <span v-if="$store.state.msgNum === 0">
            <el-button type="text">
              <router-link to="/personalCenter">个人中心</router-link>
            </el-button>
          </span>
        </el-col>
        <el-col :span="1" v-if="curUserID !== null && curUserType === 'teacher'">
          <el-button type="text" @click.native="showDialogCourse = !showDialogCourse">新增课程</el-button>
        </el-col>
        <el-col :span="1" v-if="curUserID !== null && curUserType === 'student'">
          <el-button @click.native="showApplication = !showApplication" type="text">教师认证</el-button>
        </el-col>
        <el-col :span="1" v-if="curUserID !== null">
          <el-button type="text" @click="quit">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-dialog :visible.sync="showDialog" width="40%" @close="closeDialog">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <Login ref="login" />
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <Register ref="register" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="showDialogCourse" width="40%" @close="closeDialogCourse">
      <AddCourse ref="addCourse" />
    </el-dialog>
    <el-dialog :visible.sync="showApplication" width="40%" @close="closeApplication">
      <el-tabs v-model="applicationName">
        <el-tab-pane label="教师认证" name="first">
          <TeacherApplication ref="teacherApplication" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import Login from './HeaderComponents/Login.vue';
import Register from './HeaderComponents/Register.vue';
import AddCourse from './HeaderComponents/AddCourse.vue';
import TeacherApplication from './HeaderComponents/TeacherApplication.vue';

export default {
  name: 'Header',
  components: {
    TeacherApplication,
    Register,
    Login,
    AddCourse,
  },
  data() {
    return {
      curUserID: null,
      curUserType: null,
      searchText: null,
      showDialog: false,
      showDialogCourse: false,
      showApplication: false,
      activeName: 'first',
      applicationName: 'first',
      searchType: 1,
    };
  },
  mounted() {
    if (this.$cookies.isKey('userID')) {
      this.curUserID = this.$cookies.get('userID');
      this.curUserType = this.$cookies.get('userType');
      this.$axios.get(`/api/getUnreadNum/?id=${this.curUserID}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '获取未读消息数量失败',
            message: res.data.msg,
            type: 'warning',
          });
        } else {
          this.$store.commit('changeNum',res.data.num);
        }
    });
    }
  },
  methods: {
    closeApplication() {
      this.$refs.teacherApplication.clear();
    },
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
      this.$cookies.remove('userType');
      this.$cookies.remove('username');
      this.$router.go(0);
    },
    search() {
      if (this.searchType === 2) {
        this.$router.push(`/teacherSearchResult/?text=${this.searchText}`);
      } else {
        this.$router.push(`/courseSearchResult/?text=${this.searchText}`);
      }
    },
  },
};
</script>

<style>
.el-select {
  width: 90px;
}
</style>
