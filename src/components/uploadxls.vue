<template>
  <div class="import-demo">
    <excel-import :on-success="onSuccess">
      <div class="import-btn">点击导入</div>
    </excel-import>
    <div class="code" v-if="json">
      {{json}}
    </div>
    <el-dialog :visible.sync="showImport" width="30%">
      <UploadXls />
    </el-dialog>
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
    };
  },
  methods: {
    /**
     * @name: 导入成功
     * @param {Array} response/生导入数据
     * @param {Object} file/导入文件
     * @return:
     */
    onSuccess(response, file) {
      this.json = JSON.stringify(response);
      return file;
    },
  },
};
</script>

<style scoped>
.import-demo {
  display: flex;
  justify-content: space-between;
}
.import-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  background: #ff7e00;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}
.code {
  padding: 20px 0;
  margin-left: 100px;
  width: calc(100% - 100px);
  background: #eee;
}
</style>
