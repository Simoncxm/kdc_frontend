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
      hotCourses: [
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsddsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4auRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/d54d1ff638fe49f7a08aa4ab56e63cdc.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 17,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4auMRfKG7',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/3dcf0cc76a1c43d78962ff5385761329.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 18,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1d0b4ad8056c4dafaf3c9da5a1f8ae88.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 19,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdauMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/4b2cf7f16b994e3d88209f73788a726b.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 20,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
      ],
      hotTeachers: [
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          teacherId: 'sjlWsdTdsC4auMRfKG27',
          teacherName: 'sdfsd',
          teacherNum: '371947',
          teacherPic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          teacherId: 'sjlWsfKG27',
          teacherName: 'sdfsd',
          teacherNum: '371947',
          teacherPic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          teacherId: 'sjlWsdTdsC4auMG27',
          teacherName: 'sdfsd',
          teacherNum: '371947',
          teacherPic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          teacherId: 'sjlWsduMRfKG27',
          teacherName: 'sdfsd',
          teacherNum: '371947',
          teacherPic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          teacherId: 'sjlWsd4auMRfKG27',
          teacherName: 'sdfsd',
          teacherNum: '371947',
          teacherPic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/instructor_image/link/0253d4da52e643c98076e7e06110b0c4.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
      ],
      myCourses: [
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsd123auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1f9ef43fb5214614a1a40144e119e5f3.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWs134341MRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/d54d1ff638fe49f7a08aa4ab56e63cdc.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 17,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4a132427',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/3dcf0cc76a1c43d78962ff5385761329.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 18,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4134MRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/1d0b4ad8056c4dafaf3c9da5a1f8ae88.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 19,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdT13241235fKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'https://gxbfile-gs.gaoxiaobang.com/uploads/course_image/link/4b2cf7f16b994e3d88209f73788a726b.png',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 20,
          resourcesNum: null,
          synopsis: 'sdfds',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '游客',
          term: '2019-2020',
        },
      ],
    };
  },
  components: {
    Header,
    CourseList,
    TeacherList,
  },
  mounted() {
    if (this.$cookies.isKey('userID')) {
      this.curUserID = this.$cookies.get('userID');
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
