<template>
  <div class="home">
    <div class="header">
      <div class="logo">高校教材管理系统</div>
      <div class="user-center">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ $store.state.user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">首页</el-dropdown-item>
              <el-dropdown-item command="b">修改密码</el-dropdown-item>
              <el-dropdown-item command="c">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <Menu
          @select="select"
          :isCollapse="isCollapse"
          :defaultActive="menuDefaultActive"
        />
      </div>
      <div
        class="right"
        :style="{ width: `calc(100% - ${isCollapse ? 0 : 200}px)` }"
      >
        <div class="top">
          <div class="breadcrumb">
            <Breadcrumb
              :breadcrumbs="breadcrumbs"
              :isCollapse="isCollapse"
              @svg-click="svgClick"
            />
          </div>
          <div class="tabs">
            <Tabs
              :tabsActive="menuTabsActive"
              :menuTabs="menuTabs"
              @remove-tab="removeTab"
            />
          </div>
        </div>
        <div class="content">
          <router-view v-slot="{ Component }">
            <!-- tabs切换时缓存组件-->
            <keep-alive :include="$store.state.keepAlive">
              <component class="view" :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/home/Menu";
import Breadcrumb from "@/components/home/Breadcrumb";
import Tabs from "@/components/home/Tabs";
import { removeToken } from "@/utils/cookie";
export default {
  name: "Home",
  components: {
    Menu,
    Breadcrumb,
    Tabs
  },
  data() {
    return {
      isCollapse: false, // 左侧菜单折叠
      breadcrumbs: [],
      menuDefaultActive: "/", // 左侧菜单激活
      menuTabsActive: "Home", // 顶部top激活
      menuTabs: [{ title: "首页", name: "Home", path: "/" }] // 菜单tabs
    };
  },
  created() {
    this.setMenu();
  },
  watch: {
    $route(newV) {
      this.routeChange();
    }
  },
  methods: {
    routeChange() {
      this.setMenu();
    },
    select(path) {
      // const routers = this.$router.getRoutes();
      // for (let i in routers) {
      //   if (routers[i].path === path) {
      //     this.$store.commit("setKeepAlive", routers[i].name);
      //     break;
      //   }
      // }
    },
    setMenu() {
      const route = this.$route;
      // 设置左侧菜单激活
      this.menuDefaultActive = route.path;
      // 设置面包屑
      this.breadcrumbs = route.matched.filter(
        item => item.meta && item.meta.title && route.path !== "/"
      );
      // 激活tabs
      this.menuTabsActive = route.name;
      // 设置tabs项,不存在就添加
      if (!this.menuTabs.some(item => item.name === route.name)) {
        this.menuTabs.push({
          title: route.meta.title,
          name: route.name,
          path: route.path
        });
      }
    },
    removeTab(tab) {
      if (tab === "Home") {
        return;
      }
      // 关闭tab
      this.menuTabs = this.menuTabs.filter(item => {
        return item.name !== tab;
      });
      // 关闭之后，如果当前打开页面是tab激活项，则路由访问前一个tab项
      if (tab === this.$route.name) {
        this.$router.push(this.menuTabs[this.menuTabs.length - 1].path);
      }

      this.$store.commit("removeKeepAlive", tab);
    },
    /**
     * 关闭tab，删除缓存组件，修改router里meta的keepAlive为false
     */
    noKeepAlive(tab) {
      const routers = this.$router.getRoutes();
      for (let i in routers) {
        if (routers[i].name === tab) {
          routers[i].meta.keepAlive = false;
          break;
        }
      }
      console.log(routers);
    },
    /**
     * 点击左侧菜单，重新激活
     */
    needKeepAlive(path) {
      const routers = this.$router.getRoutes();
      for (let i in routers) {
        if (routers[i].path === path && routers[i].meta.keep) {
          routers[i].meta.keepAlive = true;
          break;
        }
      }
      console.log(routers);
    },
    svgClick() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          this.$router.push("/");
          break;
        case "b":
          this.$router.push("/change/psw");
          break;
        case "c":
          removeToken();
          this.$store.commit("reSetRouters");
          this.$store.commit("reSetUserInfo");
          this.$router.push("/login");
          localStorage.clear();
          break;
      }
    }
  }
};
</script>

<style scoped>
.el-dropdown__popper .el-dropdown-menu {
  text-align: center !important;
}
.home .header {
  height: 60px;
  /* background: rgb(67, 129, 230); */
  background: #2c2e30;
  position: relative;
}
.logo {
  position: absolute;
  left: 30px;
  color: #fff;
  font-size: 22px;
  line-height: 60px;
}
.user-center {
  position: absolute;
  right: 30px;
  top: 20px;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.main {
  height: calc(100vh - 60px);
  display: flex;
}
.main .left {
  height: 100%;
}
.main .right {
  height: 100%;
}
.main .right .top {
  height: 70px;
  box-sizing: border-box;
}
.main .right .top .breadcrumb {
  padding: 5px 10px;
}
.content {
  height: calc(100% - 70px);
  overflow-y: auto;
  padding: 5px 10px 30px 10px;
  box-sizing: border-box;
}
</style>
