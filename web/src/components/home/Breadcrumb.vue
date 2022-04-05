<template>
  <div class="home-breadcrumb">
    <!-- {{ breadcrumbs }} -->
    <div class="r-collapse">
      <svg-icon
        @click="svgClick"
        :name="isCollapse ? 'menu-l' : 'menu-r'"
      ></svg-icon>
    </div>
    <div class="r-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    },
    isCollapse: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    svgClick() {
      this.$emit("svg-click");
    }
  }
};
</script>

<style scoped>
.home-breadcrumb {
  display: flex;
}
.home-breadcrumb .el-breadcrumb {
  line-height: 28px;
}

.home-breadcrumb .r-collapse {
  width: 30px;
  line-height: 28px;
  display: flex;
  cursor: pointer;
}
.home-breadcrumb .r-collapse .svg-icon {
  align-self: center;
}
.r-breadcrumb {
  flex-grow: 1;
}
</style>
