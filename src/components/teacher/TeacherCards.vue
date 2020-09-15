<template>
  <div>
    <el-col :span="12" :offset="6">
      <el-row v-for="teacher in teachers" :key="teacher.id" style="margin-bottom: 20px">
        <div @click="bindTeac(teacher)">
          <el-card :body-style="{ padding: '0px' }">
            <el-col :span="8">
              <img src="https://wx4.sinaimg.cn/mw690/c5a9a113gy1gidakzh7rsj21s02dcqv5.jpg" alt="..." width="80%"  style="float: left">
            </el-col>
            <el-col :span="16" class="teacher-info" style="margin-top: 10px;margin-bottom: 10px" >
              <p style="font-size: large">{{teacher.name}}</p>
              <p>国籍：{{teacher.nation}}</p>
              <p>所在机构：{{teacher.institute}}</p>
              <p>联系方式：{{teacher.contact}}</p>
              <el-divider></el-divider>
              <p style="color: #2c3e50">{{teacher.synopsis}}</p>
            </el-col>
          </el-card>
        </div>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'TeacherCards',
  data() {
    return {
      teachers: [
        {
          id: '123231',
          name: '程旭元',
          courseList: [
            {
              id: '1111111111',
              name: 'C语言程序基础',
              videoList: [],
              tercherId: '123231',
              teacherName: '程旭元',
              term: '2019-2020',
              synopsis: '这个课非常好。',
              studentList: [],
            },
          ],
          userId: '123231233313',
          nation: '中国',
          institute: '北京航空航天大学',
          contact: '123123@123.com',
          synopsis: '这个老师非常好。',
        },
        {
          id: '123231',
          name: '程旭元',
          courseList: [
            {
              id: '1111111111',
              name: 'C语言程序基础',
              videoList: [],
              tercherId: '123231',
              teacherName: '程旭元',
              term: '2019-2020',
              synopsis: '这个课非常好。',
              studentList: [],
            },
          ],
          userId: '123231233313',
          nation: '中国',
          institute: '北京航空航天大学',
          contact: '123123@123.com',
          synopsis: '这个老师非常好。',
        },
        {
          id: '123231',
          name: '程旭元',
          courseList: [
            {
              id: '1111111111',
              name: 'C语言程序基础',
              videoList: [],
              tercherId: '123231',
              teacherName: '程旭元',
              term: '2019-2020',
              synopsis: '这个课非常好。',
              studentList: [],
            },
          ],
          userId: '123231233313',
          nation: '中国',
          institute: '北京航空航天大学',
          contact: '123123@123.com',
          synopsis: '这个老师非常好。',
        },
      ],
    };
  },
  methods: {
    bindTeac(teacher) {
      this.$router.push(`/teacher/?id=${teacher.id}`);
    },
  },
};
</script>

<style>
  .teacher-info {
    text-align: left;
    font-size: small;
    color: #333;
    padding-left: 0.6rem;
  }
</style>
