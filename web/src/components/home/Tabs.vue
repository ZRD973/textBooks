<template>
  <div class="home-tabs">
    <el-tabs
      v-model="menuTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in menuTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuTabsValue: "/"
    };
  },
  created() {
    this.menuTabsValue = this.tabsActive;
  },
  watch: {
    tabsActive(newV) {
      this.menuTabsValue = newV;
    }
  },
  props: {
    tabsActive: {
      type: String,
      default: () => "Home"
    },
    menuTabs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tabClick(tab) {
      const routers = this.$router.getRoutes();
      let path = "/";
      let query = {};
      for (let item of routers) {
        if (item.name === tab.paneName) {
          path = item.path;
          query = item.query;
          break;
        }
      }
      this.$router.push({ path, query });
    },
    removeTab(tab) {
      this.$emit("remove-tab", tab);
    }
  }
};
</script>

<style scoped>
.home-tabs .el-tabs__item {
  height: 30px;
  line-height: 30px;
}
.home-tabs .el-tabs__nav {
  border-radius: 0;
  background: #fff;
}
</style>
