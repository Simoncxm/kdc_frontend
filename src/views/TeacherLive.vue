<template>
  <div class="main_container">
    <Header />
      <div class="video">
        <div class="swf">
          <object>
            <embed
              id="rtmp-streamer"
              src="/RtmpStreamer.swf"
              bgcolor="#000000"
              quality="high"
              width="750"
              height="400"
              allowScriptAccess="sameDomain"
              type="application/x-shockwave-flash">
          </object>
        </div>

        <div class="btn-group">
          <el-button type="primary" @click="push">开始直播</el-button>
          <el-button type="error" @click="disconnect">结束直播</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'TeacherLive',
  components: { Header },
  data() {
    return {
      rtmp: 'rtmp://113575.livepush.myqcloud.com/live/haha?txSecret=2be958550b11121fbe47ab8b1e77d16d&txTime=5F640E09',
      quality: 90,
      camFrameInterval: 15,
      camWidth: 400,
      camHeight: 300,
      camFps: 15,
      bandwidth: 16384,
    };
  },
  mounted() {
    this.streamer = document.getElementById('rtmp-streamer');
  },
  methods: {
    push() {
      if (this.rtmp.length === 0) {
        return;
      }
      const urls = this.rtmp.split('/');
      const name = urls.pop();
      const url = urls.join('/');
      this.streamer.publish(url, name);
    },
    disconnect() {
      this.streamer.disconnect();
    },
  },
};
</script>

<style scoped>
  .main_container {
    height: 100%;
    width: 100%;
  }
  .video {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .swf {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .btn-group {
    margin-top: 10px;
    width: 40%;
    display: flex;
    justify-content: space-between;
  }
</style>
