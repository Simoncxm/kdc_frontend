<template>
  <div>
    <el-row v-for="course in courses" :key="course.courseID" style="margin-bottom: 20px">
      <div @click="bindClazz(course)">
        <el-card :body-style="{ padding: '0px' }">
          <el-col :span="8">
            <img :src="course.url" alt="..." width="80%" style="float: left" />
          </el-col>
          <el-col :span="16" class="course-info" style="margin-top: 10px;margin-bottom: 10px">
            <p style="font-size: large">{{course.name}}</p>
            <p>指导老师：{{course.teacherName}}</p>
            <p>课程时间：{{course.term}}</p>
            <el-divider></el-divider>
            <p style="color: #2c3e50">{{course.synopsis}}</p>
          </el-col>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CourseCards',
  props: ['courses'],
  methods: {
    bindClazz(course) {
      this.$router.push(`/course/?courseId=${course.id}`);
    },
  },
};
</script>

<style>
.course-info {
  text-align: left;
  font-size: small;
  color: #333;
  padding-left: 0.6rem;
}
</style>
