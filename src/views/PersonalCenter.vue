<template>
  <div>
    <Header />
    <el-col :span="14" :offset="5" style="margin-top: 30px">
      <el-tabs tab-position="left">
        <el-tab-pane label="我的课程">
          <CourseCards :courses="myCourses" style="margin-left: 30px" />
        </el-tab-pane>
        <el-tab-pane v-if="curUserType === 'teacher'" label="开设课程">
          <CourseCards :courses="myOpenCourses" style="margin-left: 30px" />
        </el-tab-pane>
        <el-tab-pane label="个人设置">
          <div style="margin-left: 30px">
            <el-tabs>
              <el-tab-pane label="个人信息">
                <el-row :gutter="20">
                  <el-col :span="3">用户名：</el-col>
                  <el-col :span="10">{{username}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">邮 箱：</el-col>
                  <el-col :span="10">{{email}}</el-col>
                </el-row>
                <el-row>
                  <el-col v-if="curUserType === 'student'" :span="3">学 号：</el-col>
                  <el-col v-else :span="3">职工号：</el-col>
                  <el-col v-if="id === 0" style="width: 400px">
                    <el-input @keyup.enter.native="bindStudentId" v-model="newId"></el-input>
                  </el-col>
                  <el-col v-if="id === 0" :span="4" style="margin-left: 20px">
                    <el-button @click="bindStudentId" type="primary">立刻绑定</el-button>
                  </el-col>
                  <el-col v-else :span="10">{{id}}</el-col>
                </el-row>
                <el-row v-if="curUserType === 'teacher'">
                  <el-col :span="3">国 籍：</el-col>
                  <el-col :span="10">{{nation}}</el-col>
                </el-row>
                <el-row v-if="curUserType === 'teacher'">
                  <el-col :span="3">机 构：</el-col>
                  <el-col :span="10">{{institute}}</el-col>
                </el-row>
                <el-row v-if="curUserType === 'teacher'">
                  <el-col :span="3">简 介：</el-col>
                  <el-col :span="10">{{desc}}</el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="修改头像">
                <el-row>
                  <el-col :span="12">
                    当前头像：
                    <img class="avatar" :src="avatar" alt="..." style="margin-top: 20px" />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/img/upload"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :limit="1">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CourseCards from '../components/course/CourseCards.vue';

export default {
  name: 'PersonalCenter',
  components: {
    Header,
    CourseCards,
  },
  data() {
    return {
      curUserID: null,
      curUserType: null,
      myCourses: null,
      myOpenCourses: null,
      username: null,
      email: null,
      id: null,
      teacherId: null,
      nation: null,
      institute: null,
      desc: null,
      newId: null,
      avatar: null,
    };
  },
  mounted() {
    this.curUserID = this.$cookies.get('userID');
    this.curUserType = this.$cookies.get('userType');
    this.$axios.get(`/api/getUserInfo/?id=${this.curUserID}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取个人信息失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.username = res.data.username;
        this.email = res.data.email;
        this.avatar = res.data.avatar;
        if (res.data.code === 0 && this.curUserType === 'student') {
          this.id = res.data.studentId;
        } else if (res.data.code === 1 && this.curUserType === 'teacher') {
          this.id = res.data.teacherApprove;
          this.teacherId = res.data.teacherId;
          this.nation = res.data.nation;
          this.institute = res.data.institute;
          this.desc = res.data.desc;
          this.$axios.get(`/api/getCourseByTeacherId/?id=${this.teacherId}`).then((tres) => {
            if (tres.data.code === -1) {
              this.$notify({
                title: '获取开设课程失败',
                message: tres.data.msg,
                type: 'warning',
              });
            } else {
              this.myOpenCourses = tres.data.list;
              this.myOpenCourses.forEach((e) => {
                e.pic = 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png';
              });
            }
          });
        } else {
          this.$notify({
            title: '身份认证失败',
            message: res.data.msg,
            type: 'warning',
          });
        }
      }
    });
    this.$axios.get(`/api/getCourseByUserId/?id=${this.curUserID}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取我的课程失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.myCourses = res.data.list;
        this.myCourses.forEach((e) => {
          e.pic = 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png';
        });
      }
    });
  },
  methods: {
    bindStudentId() {
      this.$axios
        .post('/api/bindStudentId', {
          id: this.curUserID,
          studentId: this.newId,
        })
        .then((res) => {
          if (res.data.code === -1) {
            this.$notify({
              title: '绑定失败',
              message: res.data.msg,
              type: 'warning',
            });
          } else {
            this.$notify({
              title: '绑定成功',
              type: 'success',
            });
            this.id = this.newId;
          }
        });
    },
    handleAvatarSuccess(uRes, file) {
      this.avatar = URL.createObjectURL(file.raw);
      this.$axios
        .post('/api/uploadAvatar', {
          userId: this.curUserID,
          url: this.avatar,
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
.el-row {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  text-align: left;
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
