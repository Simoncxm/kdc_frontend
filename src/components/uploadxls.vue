<template>
  <div class="import-demo">
    <el-col :span="10">
      <excel-import :on-success="onSuccess">
        <el-button type="primary">点击导入</el-button>
      </excel-import>
      <el-button type="primary" @click="importStudent" v-if="json" style="margin-top: 20px">上传名单</el-button>
    </el-col>
    <div class="code" v-if="json">{{list}}</div>
  </div>
</template>

<script>
import { ExcelImport } from 'pikaz-excel-js';

export default {
  name: 'UploadXls',
  components: { ExcelImport },
  data() {
    return {
      json: '',
      list: [],
    };
  },
  props: ['courseId'],
  methods: {
    /**
     * @name: 导入成功
     * @param {Array} response/生导入数据
     * @param {Object} file/导入文件
     * @return:
     */
    onSuccess(response, file) {
      this.json = JSON.parse(JSON.stringify(response));
      this.list = [];
      this.json[0].data.forEach((e) => {
        this.list.push(e.studentId);
      });
      return file;
    },
    importStudent() {
      this.$axios
        .post('/api/importStudent', {
          courseId: this.courseId,
          list: this.list,
        })
        .then((res) => {
          if (res.data.code === -1) {
            this.$notify({
              title: '导入名单失败',
              message: res.data.msg,
              type: 'warning',
            });
          } else {
            this.$notify({
              title: '导入成功',
              type: 'success',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.import-demo {
  display: flex;
  justify-content: space-between;
}
.code {
  padding: 20px 0;
  margin-left: 20px;
  background: #eee;
}
</style>
