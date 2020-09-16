<template>
  <div>
    <Header />
    <CourseCards :courses="this.courses" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import CourseCards from '../components/course/CourseCards.vue';

export default {
  name: 'SearchCourseResult',
  data() {
    return {
      searchText: '',
      courses: null,
    };
  },
  mounted() {
    this.searchText = this.$route.query.text;
    this.$axios.get(`/api/searchCourse/?key=${this.searchText}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '查询失败',
          message: res.data.msg,
          type: 'warning',
        });
      } else {
        this.courses = res.data.list;
      }
    });
  },
  components: { CourseCards, Header },
};
</script>
