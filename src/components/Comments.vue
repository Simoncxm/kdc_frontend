<template>
  <div>
    <div id="post">
      <el-card class="post">
        <div slot="header" class="post-title">
          <span style="font-size: large">{{post.title}}</span>
          <el-button v-if="authority==1&&post.isElite==1" style="float: right" size="mini"
                     @click="switchToInelite"
                     type="warning" icon="el-icon-star-on"></el-button>
          <el-button v-if="authority==1&&post.isElite==0" style="float: right" size="mini"
                     @click="switchToElite"
                     type="primary" icon="el-icon-star-off"></el-button>
          <el-button v-if="authority==1&&post.isSticky==0" style="float: right; margin-right: 5px;"
                     size="mini" @click="switchToSticky"
                     type="primary" icon="el-icon-top">置顶帖子</el-button>
          <el-button v-if="authority==1&&post.isSticky==1" style="float: right; margin-right: 5px;"
                     size="mini" @click="switchToUnsticky"
                     type="primary" icon="el-icon-top">取消置顶</el-button>
        </div>
        <div>
          <el-row class="content-cell">
            <el-col :span="1">
              <el-avatar class="image"
                         shape="square" :src="post.user.avatar"></el-avatar>
            </el-col>
            <el-col :span="23">
              <span class="usr-name">{{post.user.name}}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row class="content-row">
            <el-col :span="24">
              <p style="word-wrap: break-word" v-html="post.content"></p>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row class="down-row">
            <el-col :span="12" >
              <span class="time">{{post.time}}</span>
            </el-col>
            <el-col :span="12">
              <el-button v-if="post.isLike==1"
                         style="float: right" size="mini"
                         @click="switchToDislike"
                         type="info" icon="el-icon-caret-top">{{ post.likes }}</el-button>
              <el-button v-if="post.isLike==0" style="float: right" size="mini"
                         @click="switchToLike"
                         type="primary" icon="el-icon-caret-top">{{ post.likes }}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div id="comments" v-if="total!==0" >
      <div class="comments" v-for="comment in comments" :key="comment.id">
        <el-card>
          <div>
            <el-row class="content-cell">
              <el-col :span="1">
                <el-avatar class="image"
                           shape="square" :src="comment.user.avatar"></el-avatar>
              </el-col>
              <el-col :span="23">
                <span class="usr-name">{{comment.user.name}}</span>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row class="content-row">
              <el-col :span="20">
                <p style="word-wrap: break-word" v-html="comment.content"></p>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row class="down-row">
              <el-col :span="12" >
                <span class="time">{{comment.time}}</span>
              </el-col>
              <el-col :span="12">
                <el-button style="float: right; margin-left: 5px;" size="mini"
                           @click=
                             "replyCommentVisible = true;
                             replyForm.content ='@'+comment.user.name+'  ';"
                           type="primary" icon="el-icon-chat-line-square">回复</el-button>
                <el-button v-if="comment.isLike==1"
                           style="float: right" size="mini"
                           @click="commentSwitchToDislike(comment)" type="info"
                           icon="el-icon-caret-top">{{ comment.likes }}</el-button>
                <el-button v-if="comment.isLike==0" style="float: right" size="mini"
                           @click="commentSwitchToLike(comment)" type="primary"
                           icon="el-icon-caret-top">{{ comment.likes }}</el-button>
                <el-button v-if="authority==1" style="float: right" size="mini"
                           @click="removeComment(comment.id)"
                           type="danger" icon="el-icon-delete"></el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-pagination class="pagination"
                         :current-page="page" background layout="prev, pager, next"
                         @current-change="handlePageChange"
                         :total="total" :page-size="pageSize"></el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <Editor v-model="send.content" :is-clear="isClear1"></Editor>
        </div>
      </el-col>
    </el-row>
    <el-divider style="margin-top: 40px">发送回复</el-divider>
    <el-button class="send-btn" @click="comment"
               size="small" type="primary" icon="el-icon-chat-line-square">发送</el-button>
    <el-dialog title="回复" :visible.sync="replyCommentVisible">
      <el-form label-position="left" :model="replyForm.content" ref="replyForm"
               :rules="rules" label-width="100px">
        <el-form-item label="回复内容" prop="content">
          <Editor v-model="replyForm.content" :is-clear="isClear2"></Editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">发送</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
.content-row{
  min-height: 100px;
  margin-top: 10px;
}
.down-row{
}
.usr-name{
  font-weight: bold;
  font-size: medium;
  margin-left: 15px;
}
.post{
  background: aliceblue;
}
.post-title{
  text-align: left;
}
.image{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.time{
  margin-bottom: 5px;
  float: left;
  font-size: small;
}
.avatar-cell{
  display: table-cell;
}
.content-cell{
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
import Editor from '@/components/Editor.vue';

export default {
  components: {
    Editor,
  },
  props: [
      'circleId',
  ],
  data() {
    return {
      isClear1: false,
      isClear2: false,
      page: 1,
      total: 0,
      post: { user: {} },
      send:
        {
          user: '',
          content: '',
        },
      comments: [],
      allComments: [],
      pageSize: 10,
      replyCommentVisible: false,
      replyForm: {
        content: '',
      },
      rules: {
        content: [
          { required: true, message: '请填写回复详细内容', trigger: 'blur' },
        ],
      },
      authority: 0,
    };
  },
  mounted() {
    this.$axios.get(`/api/posts/getPost?circleId=${this.circleId}&postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取帖子详情失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.authority = res.data.authority;
        this.post = res.data.post;
      }
    });
    this.$axios.get(`/api/posts/getAllComments?circleId=${this.circleId}&postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取帖子评论失败',
          message: '',
          type: 'warning',
        });
      } else {
        console.log(this.authority);
        this.total = res.data.total;
        const temp = res.data.comments;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < temp.length / 2; i++) {
          temp[i * 2].user = temp[i * 2 + 1];
          this.allComments[i] = temp[i * 2];
        }
        this.comments = this.allComments.slice(0, 10);
      }
    });
    console.log(this.allComments);
  },
  methods: {
    removeComment(commentId) {
      this.$axios.post('/api/posts/deleteComment', {
        commentId,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '删除评论失败',
            message: '',
            type: 'warning',
          });
        } else {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.allComments.length; i++) {
            if (this.allComments[i].id === commentId) {
              this.allComments.splice(i, 1);
              break;
            }
          }
          this.total -= 1;
          this.comments = this.allComments.slice((this.page - 1) * 10, this.page * 10);
        }
      });
    },
    switchToUnsticky() {
      this.$axios.get(`/api/posts/unstick?postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '取消置顶失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.isSticky = 0;
        }
      });
    },
    switchToSticky() {
      const now = (new Date()).toLocaleString();
      this.$axios.get(`/api/posts/stick?postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}&stickTime=${now}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '置顶帖子失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.isSticky = 1;
        }
      });
    },
    submitForm() {
      if ( this.replyForm.content === '') {
        this.$notify({
          title: '回复不能为空',
          message: '',
          type: 'warning',
        });
        return;
      }
      const now = (new Date()).toLocaleString();
      this.$axios.post('/api/posts/comment', {
        postId: this.post.id,
        userId: this.$cookies.get('userID'),
        content: this.replyForm.content,
        time: now,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '发送失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '发送成功',
            message: '',
            type: 'success',
          });
          this.replyCommentVisible = false;
          this.allComments[this.total] = {
            id: res.data,
            content: this.replyForm.content,
            time: now,
            user: { name: this.$cookies.get('username') },
            isLike: 0,
            likes: 0,
          };
          if (this.page === Math.ceil(this.total / 10)) {
            if (this.total % 10 !== 0) {
              this.comments = this.allComments.slice((this.page - 1) * 10, this.page * 10);
            }
          }
          this.total += 1;
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.replyForm.content = '';
    },
    switchToInelite() {
      this.$axios.get(`/api/posts/inelite?circleId=${this.circleId}&postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '取消精华帖失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.isElite = 0;
        }
      });
    },
    switchToElite() {
      this.$axios.get(`/api/posts/elite?circleId=${this.circleId}&postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '设置精华帖失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.isElite = 1;
        }
      });
    },
    commentSwitchToDislike(com) {
      this.$axios.get(`/api/posts/comments/dislike?commentId=${com.id}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '取消点赞失败',
            message: '',
            type: 'warning',
          });
        } else {
          // eslint-disable-next-line no-param-reassign
          com.likes -= 1;
          // eslint-disable-next-line no-param-reassign
          com.isLike = 0;
        }
      });
    },
    commentSwitchToLike(com) {
      this.$axios.get(`/api/posts/comments/like?commentId=${com.id}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '点赞失败',
            message: '',
            type: 'warning',
          });
        } else {
          // eslint-disable-next-line no-param-reassign
          com.likes += 1;
          // eslint-disable-next-line no-param-reassign
          com.isLike = 1;
        }
      });
    },
    switchToDislike() {
      this.$axios.get(`/api/posts/dislike?postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '取消点赞失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.likes -= 1;
          this.post.isLike = 0;
        }
      });
    },
    switchToLike() {
      this.$axios.get(`/api/posts/like?postId=${this.$route.query.postId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '点赞失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.post.likes += 1;
          this.post.isLike = 1;
        }
      });
    },
    handlePageChange(val) {
      this.comments = this.allComments.slice((val - 1) * 10, val * 10);
      this.page = val;
    },
    comment() {
      if ( this.send.content === '') {
        this.$notify({
          title: '评论不能为空',
          message: '',
          type: 'warning',
        });
        return;
      }
      const now = (new Date()).toLocaleString();
      this.$axios.post('/api/posts/comment', {
        postId: this.$route.query.postId,
        userId: this.$cookies.get('userID'), // userId暂未获取
        content: this.send.content,
        time: now,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '发表评论失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '发表评论成功',
            message: '',
            type: 'success',
          });
          this.allComments[this.total] = {
            id: res.data,
            content: this.send.content,
            time: now,
            user: { name: this.$cookies.get('username'), },
            isLike: 0,
            likes: 0,
          };
          this.comments = this.allComments.slice((this.page - 1) * 10, this.page * 10);
          this.total += 1;
          this.send.content = '';
        }
      });
    },
  },
};
</script>
