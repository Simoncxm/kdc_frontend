<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor';

export default {
  name: 'editoritem',
  data() {
    return {
      // uploadPath,
      editor: null,
      info: null,
    };
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info = null;
      }
    },
    value() {
      this.editor.txt.html(this.value);
    },
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgServer = 'http://otp.cdinfotech.top/file/upload_images';// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = { };// 自定义 header
      this.editor.customConfig.uploadFileName = 'file';// 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;// 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'table', // 表格
        'code', // 插入代码
        'fullscreen', // 全屏
      ];
      this.editor.customConfig.onchange = (html) => {
        this.info = html; // 绑定当前逐渐地值
        this.$emit('change', this.info); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>

<style lang="css">
  .editor {
    max-width: 800px;
    margin-top: 20px;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 250px;
    max-width: 800px;
  }
</style>
