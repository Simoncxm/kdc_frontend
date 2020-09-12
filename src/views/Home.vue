<template>
  <div class="home">
    <Header/>
    <div class="main-box">
        <div class="main" v-if="curUserID !== null">
          <div class="box-hd">
              <div class="title">我的课程</div>
          </div>
          <div class="box-bd">
            <course-list :courses="myCourses" />
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="main">
          <div class="box-hd">
              <div class="title">热门课程</div>
          </div>
          <div class="box-bd">
            <course-list :courses="hotCourses" />
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="main">
          <div class="box-hd">
              <div class="title">热门老师</div>
          </div>
          <div class="box-bd">
            <teacher-list :teachers="hotTeachers" />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import CourseList from '@/components/course/CourseList.vue';
import TeacherList from '@/components/teacher/TeacherList.vue';

export default {
  name: 'Home',
  data() {
    return {
      curUserID: null,
      curUserType: null,
      hotCourses: null,
      hotTeachers: null,
      myCourses: null,
    };
  },
  components: {
    Header,
    CourseList,
    TeacherList,
  },
  mounted() {
    this.$axios.get('/api/getHotCourse').then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取热门课程失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.hotCourses = res.data.list;
        this.hotCourses.forEach((e) => {
          e.pic = 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png';
        });
      }
    });
    this.$axios.get('/api/getHotTeacher').then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取热门老师失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.hotTeachers = res.data.list;
        this.hotTeachers.forEach((e) => {
          e.pic = 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png';
        });
      }
    });
    if (this.$cookies.isKey('userID')) {
      this.curUserID = this.$cookies.get('userID');
      this.curUserType = this.$cookies.get('userType');
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
          if (this.myCourses.length > 8) {
            this.myCourses = this.myCourses.slice(0, 8);
          }
        }
      });
    }
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
</style>
