<template>
  <div class="home-menu">
    <el-menu
      :default-active="defaultActive"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      @select="select"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- :unique-opened="true" -->
      <MenuItem v-for="item in menus" :item="item" :key="item.id" />
    </el-menu>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  computed: {
    menus() {
      const routers = this.$store.getters.routers;
      return this.filterAsyncRouter(routers);
    },
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false,
    },
    defaultActive: {
      type: String,
      default: () => "/",
    },
  },
  methods: {
    select(path) {
      this.$emit("select", path);
    },
    // 过滤hidden为1的数据,不在侧边菜单显示
    filterAsyncRouter(routers) {
      const accessedRouters = routers.filter((router) => {
        if (router.hidden === "1") {
          return false
        } else if (router.children && router.children.length) {
          router.children = this.filterAsyncRouter(router.children);
        }
        return true
      });
      return accessedRouters;
    },
  },
};
</script>

<style scoped>
.home-menu {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
