<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="3" :offset="4">
          <el-button type="text" icon="el-icon-video-camera-solid">知识传播社区</el-button>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-input placeholder="请输入内容" v-model="searchText">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="1" v-if="curUsername === null"
          @click.native="showLogin = !showLogin">
          <el-button type="text">登录/注册</el-button>
        </el-col>
        <el-col :span="3" :offset="1" v-if="curUsername !== null">
          <el-button type="text">我的课程</el-button>
        </el-col>
        <el-col :span="3" v-if="curUsername !== null">
          <el-button type="text">个人中心</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-dialog
      :visible.sync="showLogin"
      width="30%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-row style="margin-bottom: 15px">
            用户名：
            <el-input v-model="username" placeholder="请输入内容" style="width: 70%"></el-input>
          </el-row>
          <el-row>
            密  码：
            <el-input v-model="username" placeholder="请输入内容" style="width: 70%"></el-input>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">注册</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">取 消</el-button>
        <el-button type="primary" @click="showLogin = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      curUsername: null,
      searchText: null,
      showLogin: false,
      activeName: 'first',
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
