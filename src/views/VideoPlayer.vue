<template>
  <div id="video">
    <div id="videotitle">
      <p v-html="title">{{ title }}</p>
    </div>
    <video id="videoplayer" ref="videoPlayer" class="video-js"/>
    <el-button @click="leaving">保存学习进度</el-button>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoPlayer',
  data() {
    return {
      title: '',
      source: '',
      ready: false,
      time: 0,
    };
  },
  mounted() {
    const vid = this.$route.query.id;
    if (!vid) {
      this.$router.push('/');
    }
    const uid = this.$route.query.userId;
    if (!uid) {
      this.$router.push('/');
    }
    this.source = `/api/video/playVideo?id=${vid}`;
    this.$axios.get(`/api/video/getTitleByVideoId?id=${vid}`)
        .then((res) => {
          this.title = res.data;
        });
    /*
    this.source = 'http://vjs.zencdn.net/v/oceans.mp4';
    this.title = '仅用于测试';
     */
    const self = this;
    this.$video(this.$refs.videoPlayer, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [
        {
          src: this.source,
          type: 'video/mp4',
        }
      ]
    }, function onPlayerReady() {
      self.ready = true;
    });
    setInterval(function () {
      if (self.ready) {
        if (!self.$video(self.$refs.videoPlayer)
            .paused()) {
          self.time++;
        }
      }
    }, 1000);
  },
  methods: {
    /*
    testMethod() {
      console.log({
        id: this.$route.query.id,
        user: this.$route.query.userId,
        progress: this.$video(this.$refs.videoPlayer)
          .currentTime(),
        totalTime: this.time,
      });
    },
     */
    leaving() {
      if (this.ready) {
        console.log({
          'id': this.$route.query.id,
          'user': this.$route.query.userId,
          'progress': this.$video(this.$refs.videoPlayer)
              .currentTime(),
          'totalTime': this.time,
        });
        this.$axios.get(`/api/video/saveProgress?id=${this.$route.query.id}&user=${this.$route.query.userId}&progress=${this.$video(this.$refs.videoPlayer)
            .currentTime()}&totalTime=${this.time}`);
      }
    }
  }
};
</script>

<style scoped>
#video {
  margin: 10px;
  width: 75%;
}

#videotitle {
  margin: 10px;
  font-size: 20px;
  text-align: left;
}

#videoplayer {
  margin: 10px;
  height: 360px;
  width: 640px;
}
</style>
