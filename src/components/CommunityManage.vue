<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="学号"
      sortable
      width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.studentId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.studentName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.tag == '学生'"
          size="mini"
          @click="setAssistant(scope.$index, scope.row)">设为助教</el-button>
        <el-button
          v-if="scope.row.tag == '助教'"
          size="mini"
          type="danger"
          @click="cancelAssistant(scope.$index, scope.row)">取消助教</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '助教' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
<!--      :filters="[{ text: '助教', value: '助教' }, { text: '学生', value: '学生' }]"-->
<!--      :filter-method="filterTag"-->
<!--      filter-placement="bottom-end"-->
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:[
      'circleId',
  ],
  data() {
    return {
      tableData: [],
      assistants: [],
      studyData: [],
    };
  },
  mounted() {
    this.$axios.get('/api/circle/getAllStudents?circleId='+this.circleId).then((res) => {
      if (res.data.code === -1) {
        this.$notify({
          title: '获取圈子学生失败',
          message: '',
          type: 'warning',
        });
      } else {
        this.tableData = res.data.studentsList;
        this.tableData.forEach((value) => {
          // eslint-disable-next-line no-param-reassign
          value.tag = '学生';
        });
        this.$axios.get('/api/circle/getAssistants?circleId='+this.circleId).then((res2) => {
          if (res2.data.code === -1) {
            this.$notify({
              title: '获取圈子助教失败',
              message: '',
              type: 'warning',
            });
          } else {
            this.assistants = res2.data.assistants;
            this.matchAssistants();
          }
        });
      }
    });

  },
  methods: {
    matchAssistants() {
      const that = this;
      this.tableData.forEach((value) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const x of that.assistants) {
          if (x.userId === value.userId) {
            // eslint-disable-next-line no-param-reassign
            value.tag = '助教';
          }
        }
      });
    },
    setAssistant(index, row) {
      console.log(index, row);
      this.$axios.get(`/api/circle/addAssistant?assistantId=${row.userId}&circleId=${this.circleId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '设置助教失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '设置助教成功',
            message: '',
            type: 'success',
          });
          // eslint-disable-next-line no-param-reassign
          row.tag = '助教';
        }
      });
    },
    cancelAssistant(index, row) {
      console.log(index, row);
      this.$axios.get(`/api/circle/deleteAssistant?assistantId=${row.userId}&circleId=${this.circleId}&userId=${this.$cookies.get('userID')}`).then((res) => {
        if (res.data.code === -1) {
          this.$notify({
            title: '取消助教失败',
            message: '',
            type: 'warning',
          });
        } else {
          this.$notify({
            title: '取消助教成功',
            message: '',
            type: 'success',
          });
          // eslint-disable-next-line no-param-reassign
          row.tag = '学生';
        }
      });
    },
  },
};
</script>
