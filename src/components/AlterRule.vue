<!--发送帖子-->
<template>
  <div>
    <el-button class="send-btn" @click="alterRuleVisible = true"
               size="small" type="primary" icon="el-icon-chat-line-square">修改</el-button>
    <el-dialog title="修改社区规则" :visible.sync="alterRuleVisible">
      <el-form label-position="left" :model="ruleForm.content" ref="ruleForm"
               label-width="100px">
        <el-form-item label="规则内容" prop="content">
          <el-input v-model="ruleForm.content"
                    type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">修改</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
.send-btn{
  margin-top: 20px;
  float: left;
}
</style>

<script>
export default {
  inject: ['reloadAll'],
  props: [
    'circleId',
  ],
  data() {
    return {
      alterRuleVisible: false,
      ruleForm: {
        content: '',
      },
    };
  },
  methods: {
    submitForm(form) {
      const finalform = form;
      finalform.circleId = this.circleId;// 圈子id暂未获取
      finalform.userId = this.$cookies.get('userID');// 用户身份暂未获取
      this.$axios.post('/api/circle/setRule', {
        circleId: finalform.circleId,
        userId: finalform.userId,
        ruleContent: finalform.content,
      }).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '修改规则失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '修改成功',
            message: '',
            type: 'success',
          });
          this.resetForm();
          this.alterRuleVisible = false;
          this.reloadAll();
          this.$router.go(0);
        }
      });
    },
    resetForm() {
      this.ruleForm.content = '';
    },
  },
};
</script>
