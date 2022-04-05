<template>
  <el-menu-item
    :index="hasOneOrZeroChlid(item, 'path')"
    v-if="item.children.length === 0 || item.children.length === 1"
  >
    <svg-icon :name="hasOneOrZeroChlid(item, 'meta_icon')" class="svg-icon"></svg-icon>
    <template v-slot:title>
      <span class="menu-title">{{ hasOneOrZeroChlid(item, 'meta_title') }}</span>
    </template>
  </el-menu-item>
  <el-submenu v-else :index="item.path" :key="item.id">
    <template v-slot:title>
      <svg-icon :name="item.meta_icon" class="svg-icon"></svg-icon>
      <span class="menu-title">{{ item.meta_title }}</span>
    </template>
    <MenuItem v-for="chlid in item.children" :key="chlid.id" :item="chlid"></MenuItem>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    hasOneOrZeroChlid (item, key) {
      if (item.children.length === 0) {
        return item[key] || ''
      } else {
        return item.children[0][key] || ''
      }
    }
  }
}
</script>

<style  scoped>
.menu-title {
  padding-left: 5px;
}
.svg-icon {
  height: 20px;
  width: 20px;
}
</style>
