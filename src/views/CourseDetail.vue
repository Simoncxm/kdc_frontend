<template>
  <div class="home">
    <Header />
    <div class="main-box">
      <div class="main">
        <el-row :gutter="20" class="el-row" type="flex">
          <el-col :span="14" class="el-col">
            <img style="width: 400px" :src="course.url" alt="..." />
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
              <el-button v-if="userType !== 0" type="success" @click="community">进入圈子</el-button>
              <el-button v-if="userType === 2" type="success" @click="showMsg = true">群发通知</el-button>
              <el-button v-if="userType === 2" type="success" @click="showImport = true">导入成员</el-button>
              <el-button v-if="userType === 2" type="success" @click="showCover = true">上传封面</el-button>
              <el-button v-if="userType === 2" type="success" @click="showUpload = true">上传视频</el-button>
              <el-button v-if="userType === 2" type="success" @click="openlive">开启直播</el-button>
              <el-button v-if="userType === 1" type="success" @click="inlive">进入直播</el-button>
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
                :data="studentList">
                <el-table-column
                  prop="studentId"
                  label="学号">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  label="用户名">
                </el-table-column>
                <el-table-column label="总学习时长" prop="totalTime" width="100">
                </el-table-column>
                <el-table-column label="学习次数" prop="count" width="100">
                </el-table-column>
                <el-table-column label="上次学习时间" prop="lastLearningTime" width="150">
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
    <el-dialog title="群发通知" :visible.sync="showMsg" width="40%">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="3" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div align="right">
        <el-button type="primary" @click="send">发送</el-button>
        <el-button @click="showMsg=false">取消</el-button>
      </div>
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

const WEB_LIVE_SMS_LOGIN_INFO = 'web_live_sms_login_info';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      userType: 1,
      userId: null,
      courseId: null,
      circleId: null,
      course: null,
      studentList: [],
      studyData: [],
      showUpload: false,
      showImport: false,
      showCover: false,
      showMsg: false,
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
        if (this.userType === 2) {
          this.$axios.get(`/api/getStudentByCourseId?id=${this.courseId}`)
            .then((res) => {
              if (res.data.code === -1) {
                this.$notify({
                  title: '获取课程名单失败',
                  message: res.data.msg,
                  type: 'warning',
                });
              } else {
                this.studentList = res.data.list;
                this.$axios.get('/api/video/getAllProgress?courseId='+this.courseId).then((res4) => {
                  if (res4.data.code === -1) {
                    this.$notify({
                      title: '获取学生学习详情失败',
                      message: '',
                      type: 'warning',
                    });
                  } else {
                    this.studyData = res4.data;
                    this.addStudyData();
                  }
                });
              }
            });
          
        }
      }
    });
    this.$axios.get('/api/circle/courseToCircle?courseId='+ this.courseId).then((res) =>{
      if (res.data.code === -1) {
        this.$notify({
          title: '获取circleId失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.circleId = res.data;
      }
    });
  },
  methods: {
    send() {
      this.$axios
        .post('/api/sendMessage', {
          teacherName: this.course.teacherName,
          courseId: this.course.id,
          title: this.form.title,
          msg: this.form.content
        })
        .then((res) => {
          if (res.data.code === -1) {
            this.$notify({
              title: '发送失败',
              message: res.data.msg,
              type: 'warning',
            });
          } else {
            this.$notify({
              title: '发送成功',
              type: 'success',
            });
            this.showMsg = false;
          }
        });
    },
    isEmpty(obj) {
      return typeof obj === 'undefined' || obj === null || obj === '';
    },
    getHashCode(str,caseSensitive) {
      if (!caseSensitive) {
          str = str.toLowerCase();
      }
      // 1315423911=b'1001110011001111100011010100111'
      let hash  =   1315423911,i,ch;
      for (i = str.length - 1; i >= 0; i--) {
          ch = str.charCodeAt(i);
          hash ^= ((hash << 5) + ch + (hash >> 2));
      }
      
      return  (hash & 0x7FFFFFFF);
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
    openlive() {
      let userID = this.getHashCode(this.userId,false).toString();
      let userSig = window.genTestUserSig(userID).userSig;
      this.im.login({
        userID: userID,
        userSig: userSig
      }).then(() => {
        this.loading = false;
        this.$store.commit('toggleIsLogin', true);
        this.$store.commit('setRole', 'pusher');
        let _webLiveSmsLoginInfo = {
          loginTime: Date.now(),
          roomID: this.getHashCode(this.courseId,false).toString(),
          userSig:userSig,
          userID: userID,
          streamID: this.courseId,
          role: 'pusher',
          resolution: '720p'
        };
        localStorage.setItem(WEB_LIVE_SMS_LOGIN_INFO, JSON.stringify(_webLiveSmsLoginInfo));
        let _LoginInfo = localStorage.getItem(WEB_LIVE_SMS_LOGIN_INFO);
        const LoginInfo = JSON.parse(_LoginInfo);
        this.$store.commit('setChatInfo', LoginInfo);
        this.$store.commit('showMessage', { message: '登录成功', type: 'success' });
        this.$router.push('/pc-pusher');
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        this.$store.commit('showMessage', { message: '登录失败', type: 'error' });
      });
    },
    inlive() {
      let userID = this.getHashCode(this.userId,false).toString();
      let userSig = window.genTestUserSig(userID).userSig;
      this.im.login({
        userID: userID,
        userSig: userSig
      }).then(() => {
        this.loading = false;
        this.$store.commit('toggleIsLogin', true);
        this.$store.commit('setRole', 'pusher');
        let _webLiveSmsLoginInfo = {
          loginTime: Date.now(),
          roomID: this.getHashCode(this.courseId,false).toString(),
          userSig:userSig,
          userID: userID,
          streamID: this.courseId,
          role: 'player',
          resolution: '720p'
        };
        localStorage.setItem(WEB_LIVE_SMS_LOGIN_INFO, JSON.stringify(_webLiveSmsLoginInfo));
        let _LoginInfo = localStorage.getItem(WEB_LIVE_SMS_LOGIN_INFO);
        const LoginInfo = JSON.parse(_LoginInfo);
        this.$store.commit('setChatInfo', LoginInfo);
        this.$store.commit('showMessage', { message: '登录成功', type: 'success' });
        this.$router.push('/pc-player');
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        this.$store.commit('showMessage', { message: '登录失败', type: 'error' });
      });
    },
    handleClick(row) {
      this.$router.push(`/videoPlayer/?id=${row.id}&userId=${this.userId}`);
      return row;
    },
    handleAvatarSuccess(uRes, file) {
      this.course.url = uRes;
      this.$axios
        .post('/api/uploadCourseCover', {
          courseId: this.courseId,
          url: this.course.url,
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
    community() {
      this.$router.push(`/community/?circleId=${this.circleId}`);
    },
    addStudyData() {
      const that = this;
      this.studentList.forEach((value) => {
        for (const x of that.studyData) {
          if (x.userId === value.id) {
            value.totalTime = x.totalTime;
            value.lastLearningTime = x.lastLearningTime;
            value.count = x.count;
          }
        }
      });
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
