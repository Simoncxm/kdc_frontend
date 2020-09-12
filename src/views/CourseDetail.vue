<template>
  <div class="home">
    <Header/>
      <div class="main-box">
        <div class="main">
          <el-row :gutter="20"  class="el-row" type="flex" >
            <el-col :span="10"  class="el-col" >
              <img class="avatar" :src="course.coursePic"  alt="..." />
            </el-col>
            <el-col :span="14"  class="el-col" >
              <div class="info">
                <div class="box-content">
                  <span v-if="!isEmpty(course.name)">{{course.name}}</span>
                  <span  v-if="isEmpty(course.name)">暂无</span>
                </div>
              </div>
              <div class="content">学期：
                <span v-if="!isEmpty(course.term)">{{course.term}}</span>
                <span v-if="isEmpty(course.term)">暂无</span>
              </div>
              <div class="content">开课老师：
                <span v-if="!isEmpty(course.teacherName)">{{course.teacherName}}</span>
                <span v-if="isEmpty(course.teacherName)">暂无</span>
              </div>
              <div class="content">介绍：
                <span v-if="!isEmpty(course.intro)">{{course.intro}}</span>
                <span v-if="isEmpty(course.intro)">暂无</span>
              </div>
              <div class="buttons">
                <el-button v-if="userType === 0" type="success" @click="apply">申请加入</el-button>
                <el-button v-if="userType === 2" type="success" @click="addClass">创建课堂</el-button>
                <el-button v-if="userType === 2" type="primary" @click="editCourse">编辑课程</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="box-hd" v-if="userType !== 0">
            <div class="title">开课列表</div>
          </div>
          <div class="box-bd" v-if="userType !== 0">
            <el-table
              :data="classList"
              style="width: 100%">
              <el-table-column
                prop="title"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="date"
                label="开课日期">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时长">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">
                    进入课程
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  data() {
    return {
      userType: 1,
      serachName: '',
      course: {
        name: '测试课程',
        coursePic: 'http://www.course.ankoye.com/public/pic_default.jpeg',
        term: '',
        tearcherName: '测试老师',
        intro: '北京航空航天大学创建于1952年，时名北京航空学院，由当时的清华大学、北洋大学、厦门大学、四川大学等八所院校的航空系合并组建，1988年4月改名为北京航空航天大学。',
      },
      classList: [
        {
          title: 'hhha',
          date: '2016-05-02',
          time: '2小时',
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    isEmpty(obj) {
      return typeof obj === 'undefined' || obj === null || obj === '';
    },
    apply() {
      return null;
    },
    handleClick(row) {
      return row;
    },
    addClass() {
      return null;
    },
    editCourse() {
      return null;
    },
  },
};
</script>

<style scoped>
  .main-box {
    padding-bottom: 20px;
  }

  .main {
    margin: 0 auto;
    max-width: 1225px;
  }

  .title {
  float: left;
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333;
}

  .box-hd {
  height: 58px;
  margin: 20px 0 0 0;
  }

  .info {
  font-size: 30px;
  font-weight: 1000;
  line-height: 58px;
  }

  .content{
    text-align: left;
    color: #333;
    font-size: 20px;
  }

  .buttons{
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
</style>
