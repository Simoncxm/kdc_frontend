<template>
    <div>
      <el-container class="mainbody">
        <el-container>
          <el-header class="theme-top">
            <el-row>
              <el-col :span="18">
                <span style="float: left">Community name</span>
              </el-col>
              <el-col :span="6">
                <CreatePost style="float: right"></CreatePost>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <router-view></router-view>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-aside>
          <el-row>
            <el-col :span="24">
              <el-card class="side-card">
                <div>
                  <span>个人信息（积分活跃度）</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="side-card">
                <div>
                  <span>教师简介，课程内容</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="side-card">
                <div>
                  <span>直播录播入口</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-aside>
      </el-container>
    </div>
</template>
<style>
  .mainbody{
    /*background: aliceblue;*/
    max-width: 1300px;
  }
  .side-card{
    min-height: 100px;
    max-width: 200px;
    margin-top: 10px;
  }
  .theme-top{
  }
</style>
<script>
import CreatePost from '../components/CreatePost.vue';

export default {
  components: {
    CreatePost,
  },
  data() {
    return {};
  },
};
</script>
