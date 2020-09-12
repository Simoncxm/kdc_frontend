<template>
  <div id="uploader">
    <div>
      <div style="margin: 5px">
        <el-input v-model="title" :disabled="uploading" placeholder="视频标题"></el-input>
      </div>
      <div>
        <input type="file" ref="fileinput" :disabled="uploading" @change="handleFileChange"/>
        <el-button type="primary" @click="handleUpload" :disabled="uploading || !file">
          上传
        </el-button>
      </div>
      <div>
        <el-progress :percentage="progress"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';

export default {
  name: 'FileUploader',
  data() {
    return {
      courseid: '',
      title: '',
      uploading: false,
      file: false,
      progress: 0,
      hash: '',
    };
  },
  methods: {
    handleFileChange() {
      const self = this;
      let fileReader = new FileReader();
      let spark = new SparkMD5.ArrayBuffer;
      fileReader.readAsArrayBuffer(this.$refs.fileinput.files[0]);
      fileReader.onload = function (e) {
        spark.append(e.target.result);
        self.hash = spark.end(false);
      };
      console.log(this.hash);
      this.file = true;
    },
    handleUpload() {
      if (this.title === '') {
        this.$message({
          message: '请输入视频标题',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      this.uploading = true;
      let formData = new window.FormData();
      formData.append('file', this.$refs.fileinput.files[0]);
      formData.append('courseid', this.courseid);
      formData.append('title', this.title);
      formData.append('hash', this.hash);
      formData.forEach((value, key) => {
        console.log(`key: ${key}, value: ${value}`);
      });
      let config = {
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        }
      };
      this.$axios.post('/api/video/uploadVideo', formData, config)
        .then((res) => {
          if (res.data === 'success') {
            this.$message({
              message: '上传成功',
              type: 'success',
              showClose: true,
            });
          } else {
            this.$message({
              message: '上传失败',
              type: 'error',
              showClose: true,
            });
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
