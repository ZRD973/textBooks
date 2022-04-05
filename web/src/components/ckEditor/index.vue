<template>
  <div>
    <textarea :id="id" name="content"></textarea>
  </div>
</template>
<script>
export default {
  props: ["content"], //从父组件转递的内容
  mounted: function() {
    const self = this; // 渲染编辑器，配置上传图片的路径 // self.ckeditor = window.CKEDITOR.replace(self.id);
    setTimeout(function() {
      // 渲染编辑器
      self.ckeditor = window.CKEDITOR.replace(self.id); // 设置初始内容
      self.ckeditor.setData(self.content); // 监听内容变更事件

      self.ckeditor.on("change", function() {
        self.$emit("sendContnet", self.ckeditor.getData());
      });
    }, 100);
  },
  data: function() {
    return {
      id: parseInt(Math.random() * 10000).toString(),
      ckeditor: null
    };
  },

  watch: {
    // 监听prop的变化，更新ckeditor中的值
    content: function() {
      if (this.content !== this.ckeditor.getData()) {
        this.ckeditor.setData(this.content);
        setTimeout(() => {
          //暂先处理setData赋值不上的问题500ms
          let body = document
            .getElementById(this.ckeditor.id + "_contents")
            .getElementsByTagName("iframe")[0]
            .contentDocument.getElementsByTagName("body");
          if (body.length == 1) {
            body[0].innerHTML = this.content;
          }
        }, 500);
      }
    }
  }
};
</script>
<style scoped>
</style>

