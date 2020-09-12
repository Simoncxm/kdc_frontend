<template>
  <div>
    <el-col :span="9" :offset="8" style="margin-top: 5px">
      <el-row v-for="application in applications" :key="application.id" style="margin-bottom: 8px">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="float: left;font-size: large" >教师申请</span>
          </div>
          <el-row>
            <el-col :span="17">
              <div class="item text">姓名：{{application.name}}</div>
              <div class="item text">教工ID：{{application.id}}</div>
              <div class="item text">申请描述：{{application.describe}}</div>
            </el-col>
          </el-row>
          <div style="float: right; padding: 3px 0;margin-bottom: 5px">
            <el-button  type="primary" size="small">同意</el-button>
            <el-button  type="danger" size="small">拒绝</el-button>
          </div>
        </el-card>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'VerifyCards',
  data() {
    return {
      applications: [
        {
          name: '林广艳',
          id: '1234567',
          describe: '北京航空航天软件学院软件工程实践课老师',
        },
        {
          name: '谭火彬',
          id: '7654321',
          describe: '北京航空航天软件学sssssssssssssssss院软件系统设计与分析课老师',
        },
        {
          name: '贾经冬',
          id: '1357975',
          describe: '北京航空航天软件学院软件测试与交付课老师',
        },
      ],
    };
  },
};
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    text-align: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
