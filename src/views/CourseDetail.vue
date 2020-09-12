<template>
  <div class="home">
    <Header/>
    <div class="main-box">
      <div class="main">
        <el-row :gutter="20"  class="el-row" type="flex" >
          <el-col :span="14"  class="el-col" >
            <img class="avatar" :src="course.pic"  alt="..." />
          </el-col>
          <el-col :span="10"  class="el-col" >
            <div class="info">
              <div class="box-content">
                <span v-if="!isEmpty(course.name)">{{course.name}}</span>
                <span  v-if="isEmpty(course.name)">暂无</span>
              </div>
            </div>
            <div class="content">学期：
              <span v-if="!isEmpty(course.term)">{{course.term}}</span>
              <span v-if="isEmpty(course.term)">暂无</span>
            </div>
            <div class="content">开课老师：
              <span v-if="!isEmpty(course.teacherName)">{{course.teacherName}}</span>
              <span v-if="isEmpty(course.teacherName)">暂无</span>
            </div>
            <div class="content">介绍：
              <span v-if="!isEmpty(course.synopsis)">{{course.synopsis}}</span>
              <span v-if="isEmpty(course.synopsis)">暂无</span>
            </div>
            <div class="buttons">
              <el-button v-if="userType === 0" type="success" @click="apply">申请加入</el-button>
              <el-button v-if="userType === 2" type="success"
                @click="showUpload = true">上传视频</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="box-hd" v-if="userType !== 0">
          <div class="title">开课列表</div>
        </div>
        <div class="box-bd" v-if="userType !== 0">
          <el-table
            :data="course.videoList"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="date"
              label="开课日期">
            </el-table-column>
            <el-table-column
              prop="time"
              label="时长">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">
                  进入课程
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showUpload"
      width="30%" @close="closeUpload">
      <FileUploader />
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: 'Home',
  data() {
    return {
      userType: 1,
      userId: null,
      courseId: null,
      serachName: '',
      course: null,
      showUpload: false,
    };
  },
  components: {
    Header,
    FileUploader,
  },
  mounted() {
    this.courseId = this.$route.query.courseId;
    let url = `/api/clazz/?courseId=${this.courseId}`;
    if (this.$cookies.isKey('userID')) {
      this.userId = this.$cookies.get('userID');
      url += `&userId=${this.userId}`;
    }
    this.$axios.get(url).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取课程失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.userType = res.data.code;
        this.course = res.data.course;
        this.course.pic = 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png';
      }
    });
  },
  methods: {
    isEmpty(obj) {
      return typeof obj === 'undefined' || obj === null || obj === '';
    },
    apply() {
      if (this.userId) {
        this.$axios.post('/api/joinCourse', {
          id: this.userId,
          courseId: this.courseId,
        }).then((res) => {
          if (res.data.code === -1) {
            this.$notify({
              title: '申请加入课程失败',
              message: res.data.msg,
              type: 'warning',
            });
          } else {
            this.$notify({
              title: '申请加入课程成功，请等待审核。',
              type: 'success',
            });
          }
        });
      } else {
        this.$notify({
          title: '请先登录',
          type: 'warning',
        });
      }
    },
    handleClick(row) {
      this.$router.push(`/videoPlayer/?id=${row.id}`);
      return row;
    },
  },
};
</script>

<style scoped>
  .main-box {
    padding-bottom: 20px;
  }

  .main {
    margin: 0 auto;
    max-width: 1225px;
  }

  .title {
  float: left;
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333;
}

  .box-hd {
  height: 58px;
  margin: 20px 0 0 0;
  }

  .info {
  font-size: 30px;
  font-weight: 1000;
  line-height: 58px;
  }

  .content{
    text-align: left;
    color: #333;
    font-size: 20px;
  }

  .buttons{
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
</style>
