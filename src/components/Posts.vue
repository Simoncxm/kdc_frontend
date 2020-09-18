<template>
  <div id="posts" v-if="posts.length">
    <div  v-for="post in posts" :key="post.id">
      <div class="posts">
        <el-tag v-if="post.isSticky==1" class="post-tags">置顶</el-tag>
        <el-tag v-if="post.isElite==0" class="post-tags">讨论</el-tag>
        <el-tag v-if="post.isElite==1" class="post-tags">精华</el-tag>
        <router-link class="post-title"
                     :to="{path: '/community/comments', query: {postId: post.id, circleId: $route.query.circleId}, }">
          <span >{{post.title}}</span>
        </router-link>
        <span class="post-name">{{post.user.userName}}</span>
        <el-button v-if="authority == 1" class="delete_btn" type="text" icon="el-icon-delete"
                   @click="removePost(post.id)" circle></el-button>
      </div>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next"
                   @current-change="handlePageChange" :total="total" :current-page="page"
                   :page-size="pageSize"></el-pagination>
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
    return {
      posts: [],
      allPosts: [],
      total: 0,
      pageSize: 9,
      page: 1,
      authority: 0,
    };
  },
  methods: {
    handlePageChange(val) {
      this.posts = this.allPosts.slice((val - 1) * 9, val * 9);
      this.page = val;
    },
    removePost(postId) {
      this.$axios.post('/api/posts/removePost', {
        postId,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '删帖失败',
            message: '',
            type: 'warning',
          });
        } else {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.allPosts.length; i++) {
            if (this.allPosts[i].id === postId) {
              this.allPosts.splice(i, 1);
              break;
            }
          }
          this.total -= 1;
          this.posts = this.allPosts.slice((this.page - 1) * 9, this.page * 9);
          if (this.page * 9 === this.total) {
            this.handlePageChange(this.page - 1);
          }
        }
      });
    },
  },
  mounted() {
    console.log(this.circleId);
    this.$axios.get('/api/posts/getAllPosts?circleId='+this.$route.query.circleId+'&userId='+this.$cookies.get('userID')).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取帖子失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.authority = res.data.authority;
        this.allPosts = res.data.posts;
        this.posts = this.allPosts.slice(0, 9);
        this.total = res.data.total;
      }
    });
  },
};
</script>
