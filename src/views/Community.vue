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
                  <span>{{ userInformation }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="side-card">
                <div>
                  <span >{{ rules }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="side-card">
                <div>
                  <span>{{ videoLinks}}</span>
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
    function ajaxFunction(url, callback){
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

    function getUserInformation(xhttp){
      res.userInformation = JSON.parse(xhttp.responseText).points;
    }
    function getRules(xhttp) {
      res.rules = JSON.parse(xhttp.responseText).rules;
    }
    function getVideoLinks(xhttp){
      res.videoLinks = JSON.parse(xhttp.responseText).videoLinks;
    }
    ajaxFunction('/user/getUserInformation', getUserInformation);
    ajaxFunction('/community/getCommunityInformation', getRules);
    ajaxFunction('/community/getVideoLinks', getVideoLinks);
    return res;
    /* return {
      userInformation: '个人信息（积分活跃度）',
      rules: '教师和课程信息',
      videoLinks: '课程视频（直播和录播）',
    }; */
  },
};
</script>
