<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
  html {
    height 100%
    width 100%
    overflow hidden
  }

  body {
    margin 0
    height 100%
    width 100%
    overflow hidden
    background-color #ffffff
    font-family 'Microsoft YaHei', '微软雅黑', 'MicrosoftJhengHei', 'Lantinghei SC', 'Open Sans', Arial, 'Hiragino Sans GB', 'STHeiti', 'WenQuanYi Micro Hei', SimSun, sans-serif
    /*-ms-overflow-style: none;*/
    /*overflow: auto;*/

  }

  #app {
    height 100%
    font-family: Roboto, PingFang SC !important;
    -webkit-font-smoothing: antialiased;
  }

  .vconsole-box {
    position fixed
    top 0
    right 0
    color #ffffff
    width 50px
    height 50px
    z-index 1001
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width 0
    height 0
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius 10px
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius 10px;
    background rgba(0, 0, 0, 0.1)
  }

</style>


