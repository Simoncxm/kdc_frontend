<template>
  <div>
    <Header/>
    <TeacherCards :teachers="this.teachers"/>
  </div>
</template>

<script>

import TeacherCards from '../components/teacher/TeacherCards.vue';
import Header from '../components/Header.vue';

export default {
  name: 'SearchTeacherResult',
  data() {
    return {
      searchText: '',
      teachers: null,
    };
  },
  components: { Header, TeacherCards },
  mounted() {
    this.searchText = this.$route.query.text;
    this.$axios.get(`/api/searchTeacher/?key=${this.searchText}`)
      .then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '查询失败',
            message: res.data.msg,
            type: 'warning',
          });
        } else {
          this.teachers = res.data.list;
        }
      });
  },
};
</script>
