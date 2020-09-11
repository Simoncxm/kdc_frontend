<template>
    <div class="mainBody">
      <el-container class="container">
        <el-header class="theme-top">
          <el-row>
            <el-col :span="18">
              <span class="name">知识社区</span>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-main>
            <el-row>
              <el-tabs type="border-card" shadow="never"
                       v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="看帖" name="first">
                  <router-view></router-view>
                </el-tab-pane>
                <el-tab-pane label="精华" name="second">精华</el-tab-pane>
                <el-tab-pane label="学习讨论" name="third">学习讨论</el-tab-pane>
                <el-tab-pane label="问题提问" name="fourth">问题提问</el-tab-pane>
              </el-tabs>
            </el-row>
          </el-main>
          <el-aside class="side">
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover" class="side-card">
                  <div>
                    <span>个人信息（积分活跃度）</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover" class="side-card">
                  <div>
                    <span>教师简介，课程内容</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover" class="side-card">
                  <div>
                    <span>直播录播入口</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <CreatePost style="margin-top: 4px"></CreatePost>
              </el-col>
            </el-row>
          </el-aside>
        </el-container>
      </el-container>
    </div>
</template>
<style>
  .el-main{
    padding: 5px;
  }
  .mainBody{
    /*background: aliceblue;*/
    display: flex;
    justify-content: center;
  }
  .container{
    max-width: 1000px;
    min-width: 1000px;
  }
  .side{
    max-width: 150px;
  }
  .side-card{
    margin-top: 4px;
  }
  .theme-top{
    margin-top: 10px;
  }
  .name{
    font-weight: bold;
    font-size: x-large;
    font-size: x-large;
    float: left;
  }
  .el-tabs__item{
    font-size: large;
  }
</style>
<script>
import CreatePost from '../components/CreatePost.vue';

export default {
  components: {
    CreatePost,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
};
</script>
