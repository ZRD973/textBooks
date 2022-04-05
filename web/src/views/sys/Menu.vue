<template>
  <div class="menu">
    <div style="text-align: right">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="addMenu"
        >添加</el-button
      >
    </div>
    <div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        size="mini"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="meta_title" label="菜单"></el-table-column>
        <el-table-column prop="path" label="访问路由"></el-table-column>
        <el-table-column prop="component" label="页面路径"></el-table-column>
        <el-table-column prop="name" label="标识"></el-table-column>
        <el-table-column prop="meta_icon" label="图标">
          <template v-slot="scope">
            <svg-icon :name="scope.row.meta_icon" class="svg-icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button
              size="mini"
              icon="el-icon-plus"
              type="text"
              @click="addChildMenu(scope.$index, scope.row)"
              >添加</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="text"
              @click="editMenu(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="text"
              @click="deleteMenu(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑" v-model="editDialogShow" width="30%">
      <el-form
        ref="menuFormRules"
        :rules="menuFormRules"
        :model="menuForm"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="菜单" prop="meta_title">
          <el-input v-model="menuForm.meta_title"></el-input>
        </el-form-item>
        <el-form-item label="访问路由" prop="path">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="页面路径" prop="component">
          <el-input v-model="menuForm.component"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="meta_icon">
          <el-select v-model="menuForm.meta_icon" placeholder="请选择">
            <el-option
              v-for="item in icons"
              :key="item"
              :label="item"
              :value="item"
            >
              <span style="float: left"
                ><svg-icon :name="item" class="svg-icon"></svg-icon
              ></span>
              <span style="float: right">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryTree, create, update, deleteMenu } from "@/api/menu";
export default {
  name: "Menu",
  data() {
    return {
      tableData: [],
      editDialogShow: false,
      tableLoading: true,
      menuFormRules: {},
      menuForm: {
        meta_title: [
          { required: true, message: "请输入菜单", trigger: "blur" },
        ],
        path: [{ required: true, message: "请输入访问路由", trigger: "blur" }],
        component: [
          { required: true, message: "请输入页面路径", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入标识", trigger: "blur" }],
        meta_icon: [{ required: true, message: "请输入图标", trigger: "blur" }],
      },
      isAdd: true,
      icons: [],
    };
  },
  created() {
    this.queryTree();
  },
  methods: {
    addMenu() {
      this.isAdd = true;
      this.menuForm = { component: "Layout", parent_id: 0 };
      this.editDialogShow = true;
      this.getIcons();
    },
    editMenu(index, row) {
      this.isAdd = false;
      this.menuForm = { ...row };
      this.editDialogShow = true;
      this.getIcons();
    },
    deleteMenu(index, row) {
      this.$confirm(`删除菜单【${row.meta_title}】, 是否继续?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMenu({ id: row.id })
          .then((res) => {
            if (res.success) {
              this.$message({ type: "success", message: "删除成功!" });
              this.queryTree();
            } else {
              this.$message.error(res.data);
            }
          })
          .catch(() => this.$message.error("删除失败！"));
      });
    },
    addChildMenu(index, row) {
      this.menuForm = { parent_id: row.id };
      this.editDialogShow = true;
      this.isAdd = true;
      this.getIcons();
    },
    onSubmit() {
      if (this.isAdd) {
        create(this.menuForm)
          .then((res) => {
            if (res.success) {
              this.$message({ type: "success", message: "添加成功!" });
              this.queryTree();
              this.editDialogShow = false;
            } else {
              this.$message.error("添加失败！");
            }
          })
          .catch(() => this.$message.error("添加失败！"));
      } else {
        update(this.menuForm)
          .then((res) => {
            if (res.success) {
              this.$message({ type: "success", message: "修改成功!" });
              this.queryTree();
              this.editDialogShow = false;
            } else {
              this.$message.error("修改失败！");
            }
          })
          .catch(() => this.$message.error("添加失败！"));
      }
    },
    queryTree() {
      this.tableLoading = true;
      queryTree()
        .then((res) => {
          this.tableData = res.data;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    getIcons() {
      if (this.icons.length === 0) {
        const files = require.context("@/assets/icons", false, /.svg$/).keys();
        this.icons = files.map((item) => {
          return item.replace("./", "").replace(".svg", "");
        });
      }
    },
  },
};
</script>

<style  scoped>
.svg-icon {
  width: 20px;
  height: 20px;
}
</style>
