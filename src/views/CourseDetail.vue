<template>
  <div class="home">
    <Header />
    <div class="main-box">
      <div class="main">
        <el-row :gutter="20" class="el-row" type="flex">
          <el-col :span="14" class="el-col">
            <img style="width: 400px" :src="course.pic" alt="..." />
          </el-col>
          <el-col :span="10" class="el-col">
            <div class="info">
              <div class="box-content">
                <span v-if="!isEmpty(course.name)">{{course.name}}</span>
                <span v-if="isEmpty(course.name)">暂无</span>
              </div>
            </div>
            <div class="content">
              学期：
              <span v-if="!isEmpty(course.term)">{{course.term}}</span>
              <span v-if="isEmpty(course.term)">暂无</span>
            </div>
            <div class="content">
              开课老师：
              <span v-if="!isEmpty(course.teacherName)">{{course.teacherName}}</span>
              <span v-if="isEmpty(course.teacherName)">暂无</span>
            </div>
            <div class="content">
              介绍：
              <span v-if="!isEmpty(course.synopsis)">{{course.synopsis}}</span>
              <span v-if="isEmpty(course.synopsis)">暂无</span>
            </div>
            <div class="buttons">
              <el-button v-if="userType === 0" type="success" @click="apply">申请加入</el-button>
              <el-button v-if="userType === 2" type="success" @click="showUpload = true">上传视频</el-button>
              <el-button v-if="userType === 2" type="success" @click="showImport = true">导入成员</el-button>
              <el-button v-if="userType === 2" type="success" @click="showCover = true">上传封面</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="box-bd" v-if="userType !== 0" style="padding-top: 35px">
          <el-tabs type="card" style="width: 70%">
            <el-tab-pane label="开课列表">
              <el-table
                :data="course.videoList">
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
            </el-tab-pane>
            <el-tab-pane label="学生名单" v-if="userType === 2">
              <el-table
                :data="course.studentList">
                <el-table-column
                  prop="studentID"
                  label="学号">
                </el-table-column>
                <el-table-column
                  prop="studentName"
                  label="用户名">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog title="上传视频" :visible.sync="showUpload" width="40%">
      <FileUploader />
    </el-dialog>
    <el-dialog title="导入成员" :visible.sync="showImport" width="40%">
      <el-row>
        <span>请将学生学号置于Excel文件第一列并将第一列表头改为studentId</span>
      </el-row>
      <el-row>
        <UploadXls :courseId="courseId" />
      </el-row>
    </el-dialog>
    <el-dialog title="上传封面" :visible.sync="showCover" width="40%">
      <el-upload
        class="avatar-uploader"
        action="/api/img/upload"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :limit="1">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import FileUploader from '@/components/FileUploader.vue';
import UploadXls from '@/components/uploadxls.vue';

export default {
  name: 'Home',
  data() {
    return {
      userType: 1,
      userId: null,
      courseId: null,
      course: null,
      showUpload: false,
      showImport: false,
      showCover: false,
    };
  },
  components: {
    Header,
    FileUploader,
    UploadXls,
  },
  mounted() {
    this.courseId = this.$route.query.courseId;
    let url = `/api/clazz/?courseId=${this.courseId}&userId=`;
    if (this.$cookies.isKey('userID')) {
      this.userId = this.$cookies.get('userID');
      url += `${this.userId}`;
    } else {
      url += '0';
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
        this.$axios
          .post('/api/joinCourse', {
            id: this.userId,
            courseId: this.courseId,
          })
          .then((res) => {
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
    handleAvatarSuccess(uRes, file) {
      this.this.course.pic = URL.createObjectURL(file.raw);
      this.$axios
        .post('/api/uploadCourseCover', {
          courseId: this.courseId,
          url: this.this.this.course.pic,
        })
        .then((res) => {
          if (res.data.code === -1) {
            this.$notify({
              title: '修改失败',
              message: res.data.msg,
              type: 'warning',
            });
          } else {
            this.$notify({
              title: '修改成功',
              type: 'success',
            });
            this.showCover = false;
          }
        });
    },
    beforeAvatarUpload(file) {
      const isPIC = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPIC) {
        this.$message.error('上传头像图片只能是JPG或PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isPIC && isLt2M;
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

.content {
  text-align: left;
  color: #333;
  font-size: 20px;
}

.buttons {
  position: absolute;
  right: 0px;
  bottom: 0px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
