<template>
  <div id="posts" v-if="posts.length">
    <div  v-for="post in posts" :key="post.id">
      <div class="posts">
        <el-tag class="post-tags">讨论</el-tag>
        <router-link class="post-title" :to="{name: 'Comments', param: {postId: post.id}, }">
          <span >{{post.title}}</span>
        </router-link>
        <span class="post-name">{{post.user.name}}</span>
        <div class="posts-avatar">
          <el-avatar size="small"  :src="post.user.avatar"></el-avatar>
        </div>
        <el-button class="delete_btn" type="text" icon="el-icon-delete"
                   @click="removePost(post.id)" circle></el-button>
      </div>
    </div>
    <el-pagination class="pagination" :current-page="page" background layout="prev, pager, next"
                   @current-change="handlePageChange" :total="total"></el-pagination>
    <!--      @current-change="changePage"-->
  </div>
</template>

<style>
#posts .el-card__body{
  padding: 5px;
  width: auto;
}
.posts{
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .12);
  padding: 5px;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.post-name{
  font-size: small;
  font-weight: bold;
}
.post-tags{
}
.post-title{
  margin-left: 3px;
  margin-right: auto;
}
.posts-avatar{
}
.pagination{
  margin-top: 20px;
  float: left;
}
.delete_btn{
}
</style>

<script>
export default {
  data() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/api/posts/getPosts?page=${1}`, false);
    xhttp.send();
    const res = JSON.parse(xhttp.responseText);
    res.page = 1;
    return res;
  },
  /* data() {
    return {
      posts: [
        {
          id: 1,
          user: {
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            id: 17373,
          },
          title: '道德的沦丧，还是人性的扭曲',
        },
        {
          id: 2,
          user: {
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            id: 17373,
          },
          title: '道德的沦丧，还是人性的扭曲',
        },
        {
          id: 1,
          user: {
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            id: 17373,
          },
          title: '道德的沦丧，还是人性的扭曲',
        },
      ],
      total: 0,
      page: 1,
    };
  }, */
  methods: {
    handlePageChange(val) {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', `/api/posts/getPosts?page=${val}`, false);
      xhttp.send();
      this.posts = JSON.parse(xhttp.responseText).posts;
    },
    removePost(postId) {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/api/posts/removePost', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(JSON.stringify({ postId }));
      let index;
      for (index = 0; index < this.posts.length; index += 1) {
        if (this.posts[index].id === postId) {
          break;
        }
      }
      this.posts.splice(index, 1);
    },
  },
};
</script>
