<template>
  <div>
    <div id="post">
      <el-card class="post">
        <div slot="header" class="post-title">
          <span style="font-size: large">{{post.title}}</span>
        </div>
        <el-row class="content-cell">
          <el-col :span="6">
            <img v-bind:src="post.user.avatar" class="image">
            <div style="text-align: center">
              <span class="name">{{post.user.name}}</span>
            </div>
          </el-col>
          <el-col :span="16">
            <span class="content">{{post.content}}</span>
          </el-col>
          <el-col :span="2">
            <span class="time">{{ post.time }}</span>
            <div>
              点赞
              <el-button style="float: right"
                         type="warning" icon="el-icon-star-off" circle></el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div id="comments" v-if="comments.length" >
      <div class="comments" v-for="comment in comments" :key="comment.id">
        <el-card class="post">
          <el-row class="content-cell">
            <el-col :span="6">
              <img v-bind:src="post.user.avatar" class="image">
              <div style="text-align: center">
                <span class="name">{{comment.user.name}}</span>
              </div>
            </el-col>
            <el-col :span="16">
              <span class="content">{{comment.content}}</span>
            </el-col>
            <el-col :span="2">
              <span class="time">发布时间</span>
              <div>
                <el-button style="float: right"
                           type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="text-align: right; background: aliceblue">
            回复
          </el-row>
        </el-card>
      </div>
    </div>
    <div>
      <el-pagination class="pagination"
                     :current-page="page" background layout="prev, pager, next"
                     @current-change="handlePageChange"
                     :total="total"></el-pagination>
    </div>

    <el-input class="textarea"
              v-model="send.content" type="textarea" :rows="3" placeholder="请输入内容">
    </el-input>
    <el-divider style="margin-top: 40px">发送回复</el-divider>
    <el-button class="send-btn" @click="comment"
               size="small" type="primary" icon="el-icon-chat-line-square">发送</el-button>
  </div>
</template>
<style>
.post-title{
  text-align: left;
}
.image{
  height: 180px;
  width: 180px;
}
.name{
  font-size: large;
  font-weight: bold;
}
.time{
  margin-bottom: 5px;
}
.content{
  margin-left: 10px;
}
.avatar-cell{
  display: table-cell;
}
.content-cell{
  min-height: 200px;
  text-align: left;
}
.comments{
  margin-top: 5px;
}
.delete_btn{
}
.pagination{
  margin-top: 20px;
  float: left;
}
.textarea{
  margin-top: 20px;
}
.send-btn{
  float: right;
}
</style>
<script>
export default {
  data() {
    let d;
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/api/posts/getPost?postId=${this.postId}`, false);
    xhttp.send();
    d.post = JSON.parse(xhttp.responseText).post;
    const xhttp2 = new XMLHttpRequest();
    xhttp2.open('GET', `/api/posts/getcomments?postId=${this.postId}&page=${1}`, false);
    xhttp2.send();
    d.comments = [];
    const { comments } = JSON.parse(xhttp2.responseText);
    let i;
    for (i = 0; i < comments.length; i += 2) {
      comments[i].user = comments[i + 1];
      d.comments[i / 2] = comments[i];
    }
    d.total = JSON.parse(xhttp2.responseText).total;
    d.page = 1;
    d.send = { content: '' };
    return d;
    /* return {
      page: 1,
      total: 1,
      post:
        {
          id: 1,
          user: {
            name: '张三',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            id: 17373,
          },
          title: '道德的沦丧，还是人性的扭曲',
          content: '如题',
          time: '',
        },
      send:
        {
          user: '',
          content: '',
        },
      comments:
        [
          {
            id: 1,
            user: {
              name: '张三',
              avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              id: 17373,
            },
            content: '如题',
            time: '',
          },
          {
            id: 1,
            user: {
              name: '张三',
              avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              id: 17373,
            },
            content: '如题',
            time: '',
          },
        ],
    }; */
  },
  methods: {
    handlePageChange(val) {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', `/api/posts/getcomments?postId=${this.postId}&page=${val}`, false);
      xhttp.send();
      this.comments = JSON.parse(xhttp.responseText).comments;
    },
    comment() {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/api/posts/comment', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      this.send.postId = this.postId;
      this.send.userId = 'loginuser';// 当前登录用户
      this.send.time = (new Date()).toISOString();
      xhttp.send(JSON.stringify(this.send));
      alert('已发送回复');
    },
  },
};
</script>
