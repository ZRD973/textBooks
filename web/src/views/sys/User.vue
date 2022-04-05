<template>
  <div class="user">
    <div>
      <el-form :inline="true" :model="query" size="mini">
        <el-form-item label="账号">
          <el-input v-model="query.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="query.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="query.role" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id || ''"
              >{{ item.name }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitQuery"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: right">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="addUser"
        >添加</el-button
      >
    </div>
    <div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template v-slot="scope">{{
            scope.row.sex === "1" ? "男" : scope.row.sex === "0" ? "女" : ""
          }}</template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="115"
        ></el-table-column>
        <el-table-column prop="native_place" label="籍贯" width="70"></el-table-column>
        <el-table-column prop="birth" label="出生年月" width="80"></el-table-column>
        <el-table-column label="角色">
          <template v-slot="scope">
            <el-tag
              style="margin-right: 5px"
              v-for="item in scope.row.sys_roles"
              size="small"
              :key="item.id"
              >{{ item.name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="updated_at"
          label="更新时间"
          width="160"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="text"
              @click="editUser(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="text"
              @click="deleteUser(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-refresh"
              type="text"
              @click="resetPsw(scope.$index, scope.row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: right; margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal"
      ></el-pagination>
    </div>

    <el-dialog title="编辑" v-model="editDialogShow" width="30%">
      <el-form
        ref="userFormRules"
        :rules="userFormRules"
        :model="userForm"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="userForm.native_place"></el-input>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker v-model="userForm.birth" type="month" placeholder="选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="userForm.roles">
            <el-checkbox
              v-for="item in roles"
              :key="item.id"
              :label="item.id"
              name="roles"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { page, create, update, userDelete, resetPsw } from "../../api/user";
import { query as roleQuery } from "../../api/role";
import dayjs from 'dayjs';
export default {
  name: 'User',
  data() {
    return {
      query: { limit: 10, page: 1 },
      tableData: [{}],
      tableDataTotal: 0,
      tableLoading: true,
      editDialogShow: false,
      userForm: { roles: [] },
      userFormRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      roles: [{}],
      isAdd: true,
    };
  },
  created() {
    this.page();
    this.roleQuery();
  },
  methods: {
    addUser() {
      this.isAdd = true;
      this.editDialogShow = true;
      this.userForm = { roles: [] };
    },
    editUser(index, user) {
      this.isAdd = false;
      this.editDialogShow = true;
      this.userForm = { ...user };
      this.userForm.roles = user.sys_roles.map((item) => item.id);
    },
    deleteUser(index, user) {
      this.$confirm(`删除用户【${user.name}】, 是否继续?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        userDelete({ id: user.id })
          .then((res) => {
            if (res.success) {
              this.$message({ type: "success", message: "删除成功!" });
              this.page();
            } else {
              this.$message.error("删除失败！");
            }
          })
          .catch(() => this.$message.error("删除失败！"));
      });
    },
    submitQuery() {
      this.page();
    },
    resetQuery() {
      this.query = { limit: 10, page: 1 };
      this.page();
    },
    onSubmit() {
      this.userForm.birth = dayjs(this.userForm.birth).format('YYYY-MM')
      this.$refs.userFormRules.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.create();
          } else {
            this.update();
          }
        } else {
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.page();
    },
    page() {
      this.tableLoading = true;
      page(this.query)
        .then((res) => {
          if (res.success) {
            this.tableData = res.data.rows;
            this.tableData.forEach((item)=>{
              item.birth ? item.birth = dayjs(item.birth).format('YYYY-MM') : ''
            })
            this.tableDataTotal = res.data.count;
            this.tableLoading = false;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    roleQuery() {
      roleQuery().then((res) => {
        if (res.success) {
          this.roles = res.data;
        }
      });
    },
    create() {
      create(this.userForm)
        .then((res) => {
          if (res.success) {
            this.$message({ message: "添加成功！", type: "success" });
            this.editDialogShow = false;
            this.page();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => this.$message.error("添加失败！"));
    },
    update() {
      update(this.userForm)
        .then((res) => {
          if (res.success) {
            this.$message({ message: "修改成功！", type: "success" });
            this.editDialogShow = false;
            this.page();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => this.$message.error("修改失败！"));
    },
    resetPsw(index, row) {
      this.$confirm(`是否重置用户【${row.name}】的密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        resetPsw({ id: row.id }).then((res) => {
          if (res.success) {
            this.$message({ message: "重置成功！", type: "success" });
          } else {
            this.$message.error(res.data);
          }
        });
      });
    },
  },
};
</script>
