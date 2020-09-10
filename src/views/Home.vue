<template>
  <div class="home">
    <Header/>
      <div class="main-box">
        <div class="main">
          <div class="box-hd">
              <div class="title">热门课程</div>
          </div>
          <div class="box-bd">
            <course-list :courses="hotCourses" :filter="serachName" />
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="main">
          <div class="box-hd">
              <div class="title">热门老师</div>
          </div>
          <div class="box-bd">
            <teacher-list :teachers="hotTeachers" :filter="serachName" />
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
      serachName: '',
      hotCourses: [
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
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
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
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
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
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
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
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
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'sdfsd',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
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
          teacherPic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: 'sdfds',
        },
      ],
    };
  },
  components: {
    Header,
    CourseList,
    TeacherList,
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
