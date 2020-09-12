<template>
  <div>
    <el-form :model="addCourseForm" :rules="rules" ref="addCourseForm" label-width="100px">
      <el-form-item label="课程名称" prop="name" label-width="120px">
        <el-input v-model="addCourseForm.name" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="开课学期" prop="term" label-width="120px">
        <el-select v-model="addCourseForm.term" style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程简介" prop="synopsis" label-width="120px">
        <el-input type="textarea" v-model="addCourseForm.synopsis" placeholder="课程简介">
        </el-input>
      </el-form-item>
      <div class="form-group-btn">
        <el-button type="primary" class="btn-block" @click="submitForm('addCourseForm')"
          style="widht:200px;">
          提交
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'AddCourse',
  data() {
    return {
      addCourseForm: {
        name: '',
        term: '',
        synopsis: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
        ],
        term: [
          { required: true, message: '请输入课程学期', trigger: 'blur' },
        ],
        synopsis: [
          { required: true, message: '请输入课程简介', trigger: 'blur' },
        ],
      },
      options: [{
        value: '2018秋季',
        label: '2018秋季',
      }, {
        value: '2019春季',
        label: '2019春季',
      }, {
        value: '2019秋季',
        label: '2019秋季',
      }, {
        value: '2020春季',
        label: '2020春季',
      }, {
        value: '2020秋季',
        label: '2020秋季',
      }, {
        value: '2021春季',
        label: '2021春季',
      }],
    };
  },
  methods: {
    submitForm() {
      console.log(this.addCourseForm.name);
      console.log(this.addCourseForm.term);
      console.log(this.addCourseForm.synopsis);
      return null;
    },
    clear() {
      this.$refs.addCourseForm.resetFields();
    },
  },
};
</script>
