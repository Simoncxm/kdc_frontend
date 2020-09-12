<template>
  <div id="video">
    <div id="videotitle"><p v-html="title">{{ title }}</p></div>
    <video id="videoplayer" class="video-js" controls preload="auto">
      <source :src="source" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  data() {
    return {
      title: '',
      source: '',
    };
  },
  mounted() {
    const vid = this.$route.query.id;
    if (!vid) {
      this.$router.push('/');
    }
    this.$axios.get(`/api/getvideo?id=${vid}`)
      .then((res) => {
        this.title = res.data.title;
        this.source = res.data.source;
      });
  },
  methods: {},
};

</script>

<style scoped>
#video {
  margin: 0 auto;
  width: 75%;
}

#videotitle {
  font-size: 20px;
  text-align: left;
}

#videoplayer {
  height: 100%;
  width: 100%;
}
</style>
