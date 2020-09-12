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
                  <span>{{ userInformation }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card shadow="hover" class="side-card">
                <div>
                  <span>{{ rules }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card shadow="hover" class="side-card">
                <div>
                  <span>{{ videoLinks }}</span>
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
    function ajaxFunction(url, callback) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          callback(this);
        }
      };
      xhttp.open('POST', url, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send();
    }

    let res;

    function getUserInformation(xhttp) {
      res.userInformation = JSON.parse(xhttp.responseText).points;
    }
    function getRules(xhttp) {
      res.rules = JSON.parse(xhttp.responseText).rules;
    }
    function getVideoLinks(xhttp) {
      res.videoLinks = JSON.parse(xhttp.responseText).videoLinks;
    }
    ajaxFunction('/api/user/getUserInformation', getUserInformation);
    ajaxFunction('/api/community/getCommunityInformation', getRules);
    ajaxFunction('/api/community/getVideoLinks', getVideoLinks);
    return res;
    /* return {
      userInformation: '个人信息（积分活跃度）',
      rules: '教师和课程信息',
      videoLinks: '课程视频（直播和录播）',
    }; */
  },
};
</script>
