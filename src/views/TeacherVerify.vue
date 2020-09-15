<template>
  <div>
    <Header/>
    <el-col :span="10" :offset="7" style="margin-top: 5px">
      <el-row v-for="application in applications" :key="application.id" style="margin-bottom: 8px">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="float: left;font-size: large" >教师申请</span>
          </div>
          <el-row>
            <el-col>
              <div class="item text">姓名：{{application.name}}</div>
              <div class="item text">所在机构：{{application.institute}}</div>
              <div class="item text">教工ID：{{application.teacherApprove}}</div>
              <div class="item text">国籍：{{application.nation}}</div>
              <div class="item text">联系方式：{{application.contact}}</div>
              <div class="item text">申请描述：{{application.desc}}</div>
            </el-col>
          </el-row>
          <div style="float: right; padding: 3px 0;margin-bottom: 5px">
            <el-button  type="primary" size="small" @click="agree(application)">同意</el-button>
            <el-button  type="danger" size="small" @click="disagree(application)">拒绝</el-button>
          </div>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'TeacherVerify',
  data() {
    return {
      applications: null,
    };
  },
  components: { Header },
  mounted() {
    this.$axios.get('/api/getTeacherApplicationList').then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取申请列表失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.applications = res.data.list;
      }
    });
  },
  methods: {
    agree(app) {
      this.$axios.post('/api/agreeTeacherApply', {
        id: app.id,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '有问题',
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
      this.applications = this.applications.filter((e) => e.id !== app.id);
    },
    disagree(app) {
      this.$axios.post('/api/disagreeTeacherApply', {
        id: app.id,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '有问题',
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
      this.applications = this.applications.filter((e) => e.id !== app.id);
    },
  },
};
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    text-align: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
