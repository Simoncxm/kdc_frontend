<template>
  <div>
    <Header></Header>
    <div class="mainBody" >
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
              <el-tabs type="border-card" shadow="never" @change="handleTabChange"
                       v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="看帖" name="Posts">
                  <router-view :circleId="circleId" v-if="isRouterAlive"></router-view>
                </el-tab-pane>
                <el-tab-pane label="精华" name="Elites">
                  <router-view :circleId="circleId"></router-view>
                </el-tab-pane>
                <el-tab-pane v-if="isTeacher==1" label="助教管理" name="CommunityManage">
                  <CommunityManage :circle-id="circleId"></CommunityManage>
                </el-tab-pane>
                <!--              v-if=老师-->
              </el-tabs>
            </el-row>
          </el-main>
          <el-aside class="side" v-if="isPageAlive">
            <el-row>
              <el-col :span="24">
                <el-card v-if="isStudent" shadow="hover" class="side-card">
                  <div>
                    <span style="text-align: center">当前积分:{{ points }}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover" class="side-card">
                  <div slot="header">
                    <span style="text-align: center; font-size: large">社区规则</span>
                  </div>
                  <div>
                    <span>{{ rules }}</span>
                    <AlterRule :circle-id="circleId"></AlterRule>
<!--                    v-if=助教-->
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <CreatePost :circle-id="circleId" style="margin-top: 4px"></CreatePost>
              </el-col>
            </el-row>
          </el-aside>
        </el-container>
      </el-container>
    </div>

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
  max-width: 1150px;
  min-width: 1150px;
}
.side{
  max-width: 250px;
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
import AlterRule from '../components/AlterRule.vue';
import CommunityManage from '../components/CommunityManage.vue';
import Header from '../components/Header.vue';

export default {

  components: {
    CreatePost,
    AlterRule,
    CommunityManage,
    Header,
  },
  provide() {
    return {
      reload: this.reload,
      reloadAll: this.reloadAll,
      rule: this.rules,
    };
  },
  data() {
    return {
      circleId: '',
      isRouterAlive: true,
      isPageAlive: true,
      activeName: 'Posts',
      rules: '',
      isStudent: 1,
      points: 0,
      isTeacher: 0,
      user: {},
    };
  },
  created() {
    const courseId = this.$route.query.courseId;
    this.$axios.get('/api/circle/courseToCircle?courseId='+ courseId).then((res) =>{
      if (res.data.code === -1) {
        this.$notify({
          title: '获取circleId失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.circleId = res.data.circleId;
      }
    });
  },
  mounted() {
    this.$axios.get('/api/circle/getRules?circleId='+this.circleId+'&userId='+this.$cookies.get('userID')).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取圈子规则失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.rules = res.data.rulesContent;
      }
    });
    this.$axios.get('/api/circle/isStudent?circleId='+this.circleId+'&userId='+this.$cookies.get('userID')).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取身份失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.isStudent = res.data.isStudent;
        if (this.isStudent === 1) {
          this.$axios.get('/api/posts/getStudentPoints?circleId='+this.circleId+'&userId='+this.$cookies.get('userID')).then((res2) => {
            if (res2.data.code === -1) {
              this.$notify({
                title: '获取积分失败',
                message: '',
                type: 'warning',
              });
            } else {
              this.points = res2.data.points;
            }
          });
        }
      }
    });
    this.$axios.get('/api/circle/isTeacher?circleId='+this.circleId+'&userId='+this.$cookies.get('userID')).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取老师失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.isTeacher = res.data.isTeacher;
        console.log(this.isTeacher);
      }
    });
    console.log(this.isTeacher);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    reloadAll() {
      this.isPageAlive = false;
      this.$nextTick(function () {
        this.isPageAlive = true;
      });
    },
    handleTabClick(val) {
      if(val.name !== 'CommunityManage') {
        this.$router.push({ name: val.name });
      }
    },
    handleTabChange(val) {
      this.$router.push({ name: val.name });
    },
  },
};
</script>
