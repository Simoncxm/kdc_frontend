<template>
  <div>
    <el-col :span="12" :offset="6">
      <el-row v-for="teacher in teachers" :key="teacher.id" style="margin-bottom: 20px">
        <div @click="bindTeac(teacher)">
          <el-card :body-style="{ padding: '0px' }">
            <el-col :span="8">
              <img
                src="https://wx4.sinaimg.cn/mw690/c5a9a113gy1gidakzh7rsj21s02dcqv5.jpg"
                alt="..."
                width="80%"
                style="float: left"
              />
            </el-col>
            <el-col :span="16" class="teacher-info" style="margin-top: 10px;margin-bottom: 10px">
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
  props: ['teachers'],
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
