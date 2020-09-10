<template>
    <div v-if="posts.length">
      <div class="posts" v-for="post in posts" :key="post.id">
        <el-card>
          <el-avatar size="small" style="float: left"
                     :src="post.user.avatar">
          </el-avatar>
          <span style="float: left">{{post.title}}</span>
          <el-button style="float: right" type="danger">删除</el-button>
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
  },
};
</script>
