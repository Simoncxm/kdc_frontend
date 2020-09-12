<template>
  <div class="home">
    <Header/>
      <div class="main-box">
        <div class="main">
          <el-row :gutter="20"  class="el-row" type="flex" >
            <el-col :span="10"  class="el-col" >
              <img class="avatar" :src="teacher.teacherPic"  alt="..." />
            </el-col>
            <el-col :span="14"  class="el-col" >
              <div class="info">
                <div class="box-content">
                  <span v-if="!isEmpty(teacher.name)">{{teacher.name}}</span>
                  <span  v-if="isEmpty(teacher.name)">暂无</span>
                </div>
              </div>
              <div class="content">国籍：
                <span v-if="!isEmpty(teacher.country)">{{teacher.country}}</span>
                <span v-if="isEmpty(teacher.country)">暂无</span>
              </div>
              <div class="content">机构：
                <span v-if="!isEmpty(teacher.affiliation)">{{teacher.affiliation}}</span>
                <span v-if="isEmpty(teacher.affiliation)">暂无</span>
              </div>
              <div class="content">联系方式：
                <span v-if="!isEmpty(teacher.email)">{{teacher.email}}</span>
                <span v-if="isEmpty(teacher.email)">暂无</span>
              </div>
              <div class="content">介绍：
                <span v-if="!isEmpty(teacher.intro)">{{teacher.intro}}</span>
                <span v-if="isEmpty(teacher.intro)">暂无</span>
              </div>
            </el-col>
          </el-row>
          <div class="box-hd">
            <div class="title">ta的课程</div>
          </div>
          <div class="box-bd">
            <course-list :courses="hotCourses" :filter="serachName" />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import CourseList from '@/components/course/CourseList.vue';

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
      teacher: {
        teacherPic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
        country: '',
        affiliation: '',
        email: '',
        name: '测试老师',
        intro: '北京航空航天大学创建于1952年，时名北京航空学院，由当时的清华大学、北洋大学、厦门大学、四川大学等八所院校的航空系合并组建，1988年4月改名为北京航空航天大学。',
      },
    };
  },
  components: {
    Header,
    CourseList,
  },
  methods: {
    isEmpty(obj) {
      return typeof obj === 'undefined' || obj === null || obj === '';
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

  .avatar{
    border-radius:50%;;
  }
</style>
