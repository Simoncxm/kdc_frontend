<template>
  <div v-if="posts.length">
    <div class="posts" v-for="post in posts" :key="post.id">
      <el-card>
        <el-avatar size="small" style="float: left"
                   :src="post.user.avatar">
        </el-avatar>
        <span style="float: left">{{post.title}}</span>
        <el-button style="float: right" type="danger" @click="removePost(post.id)">删除</el-button>
        <!--          v-if管理员权限-->
        <el-tag style="float: right">学习讨论</el-tag>
        <!--          v-for-->
      </el-card>
    </div>
    <el-pagination class="pagination" :current-page="page" background layout="prev, pager, next"
                   :total="total"></el-pagination>
    <!--      @current-change="changePage"-->
  </div>
</template>

<style>
.posts{
  margin-top: 5px;
}
.pagination{
  margin-top: 30px;
}
</style>

<script>
export default {
  data() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/posts/all', false);// 暂定向https://localhost:8083发送请求
    xhttp.send();
    return JSON.parse(xhttp.responseText);
  },
  methods: {
    removePost(postId) {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/posts/removePost', true);
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
