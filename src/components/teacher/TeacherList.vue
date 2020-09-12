<template>
  <el-row :gutter="20">
    <el-col v-for="teacher in teachers" :key="teacher.teacherId"
      :xs="24" :sm="8" :md="6" class="mb-3">
      <a class="teacher-card img-hover pointer" @click="bindTeac(teacher)" >
        <el-row>
          <el-col :xs="9" class="teacher-pic">
            <img :src="teacher.teacherPic"  alt="..." />
          </el-col>
          <el-col :xs="15">
            <div class="text-dark teacher-info">
              <p class="teacher-name">{{teacher.teacherName}}</p>
            </div>
          </el-col>
        </el-row>
      </a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TeacherCard',
  props: ['teachers'],
  data: () => ({
    thisUserId: 123,
  }),
  computed: {
  },
  methods: {
    bindTeac(teacher) {
      this.$router.push(`/teacher/${teacher.teacherId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$border-radius: 0.25rem;
.teacher-card {
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    background-clip: border-box;
    border-radius: $border-radius;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    .teacher-pic {
      overflow: hidden;
      max-height: 230px;
      img {
        width: 100%;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    .teacher-info {
      text-align: center;
      color: #333;
      padding-left: 0.6rem;
      > * {
        margin: 0;
        padding: 0.3rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .teacher-name {
        font-size: 1.1rem;
      }
      .teacher-num {
        font-size: 0.8rem;
      }
      .clazz-term {
        font-size: 0.8rem;
      }
    }
  }
</style>
