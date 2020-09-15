<template>
  <div>
    <el-col :span="12" :offset="6">
      <el-row v-for="course in courses" :key="course.courseID" style="margin-bottom: 20px">
        <el-card :body-style="{ padding: '0px' }">
          <el-col :span="8">
            <img :src="course.coursePic" alt="..." width="80%"  style="float: left">
          </el-col>
          <el-col :span="16" class="course-info" style="margin-top: 10px;margin-bottom: 10px" >
            <p style="font-size: large">{{course.courseName}}</p>
            <p>指导老师：{{course.teacherName}}</p>
            <p>课程时间：{{course.term}}</p>
            <p>已有{{course.List.length}}人参加</p>
            <el-divider></el-divider>
            <p style="color: #2c3e50">{{course.synopsis}}</p>
          </el-col>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'CourseCards',
  data() {
    return {
      courses: [
        {
          appraise: false,
          arrivesNum: null,
          clazzName: 'sd',
          courseId: 'sjlWsdTdsC4auMRfKG27',
          courseName: 'C语言基础训练',
          courseNum: '371947',
          coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
          experiencesNum: null,
          gmtCreate: 1599574910000,
          gmtModified: 1599575501000,
          id: 16,
          resourcesNum: null,
          synopsis: '这个课确实好',
          teacherId: 'R411PCsfE8bFzJvJ',
          teacherName: '程旭元',
          term: '2019-2020',
          List: [
          ],
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
          List: [
          ],
        },
      ],
    };
  },
};
</script>

<style>
  .course-info {
    text-align: left;
    font-size: small;
    color: #333;
    padding-left: 0.6rem;
  > * {
    margin: 0;
    padding: 0.3rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .course-name {
    font-size: 1.1rem;
  }
  .course-num {
    font-size: 0.8rem;
  }
  .clazz-term {
    font-size: 0.8rem;
  }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
