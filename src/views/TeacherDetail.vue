<template>
  <div class="home">
    <Header />
    <div class="main-box">
      <div class="main">
        <el-row :gutter="20" class="el-row" type="flex">
          <el-col :span="10" class="el-col">
            <img style="width: 400px" :src="teacher.url" alt="..." />
          </el-col>
          <el-col :span="14" class="el-col">
            <div class="info">
              <div class="box-content">
                <span v-if="!isEmpty(teacher.name)">{{teacher.name}}</span>
                <span v-if="isEmpty(teacher.name)">暂无</span>
              </div>
            </div>
            <div class="content">
              国籍：
              <span v-if="!isEmpty(teacher.nation)">{{teacher.nation}}</span>
              <span v-if="isEmpty(teacher.nation)">暂无</span>
            </div>
            <div class="content">
              机构：
              <span v-if="!isEmpty(teacher.institute)">{{teacher.institute}}</span>
              <span v-if="isEmpty(teacher.institute)">暂无</span>
            </div>
            <div class="content">
              联系方式：
              <span v-if="!isEmpty(teacher.contact)">{{teacher.contact}}</span>
              <span v-if="isEmpty(teacher.contact)">暂无</span>
            </div>
            <div class="content">
              介绍：
              <span v-if="!isEmpty(teacher.synopsis)">{{teacher.synopsis}}</span>
              <span v-if="isEmpty(teacher.synopsis)">暂无</span>
            </div>
          </el-col>
        </el-row>
        <div class="box-hd">
          <div class="title">ta的课程</div>
        </div>
        <div class="box-bd">
          <course-list :courses="courses" />
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
  name: 'TeacherDetail',
  data() {
    return {
      teacherId: null,
      courses: null,
      teacher: null,
    };
  },
  components: {
    Header,
    CourseList,
  },
  mounted() {
    this.teacherId = this.$route.query.id;
    this.$axios.get(`/api/teacher/?id=${this.teacherId}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取老师失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.teacher = res.data.teacher;
      }
    });
    this.$axios.get(`/api/getCourseByTeacherId/?id=${this.teacherId}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取课程失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.courses = res.data.list;
      }
    });
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

.content {
  text-align: left;
  color: #333;
  font-size: 20px;
}
</style>
