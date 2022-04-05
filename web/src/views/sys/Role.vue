<template>
  <div class="role">
    <div style="text-align: right;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="addRole">添加</el-button>
    </div>
    <div>
      <el-table :data="tableData" v-loading="tableLoading" size="small" style="width: 100%">
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column prop="code" label="角色代码"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="updated_at" label="更新时间" width="160"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="text"
              @click="editRole(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="text"
              @click="deleteRole(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              icon="el-icon-lock"
              type="text"
              @click="authEdit(scope.$index, scope.row)"
            >权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: right;margin-top: 10px;">
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
        ref="roleFormRules"
        :rules="roleFormRules"
        :model="roleForm"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="角色" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="code">
          <el-input v-model="roleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="roleForm.sort"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="权限" @open="treeOpen" v-model="authDialogShow" width="30%">
      <el-tree
        ref="tree"
        :data="authData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :props="authDefaultProps"
      ></el-tree>
      <template v-slot:footer>
        <el-button type="primary" size="mini" @click="changeAuthSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { page, create, update, roleDelete } from '../../api/role'
import { queryTree, roleMenuUpdate, roleMenu } from '../../api/menu'
export default {
  name: 'Role',
  data () {
    return {
      roleForm: {},
      query: { limit: 10, page: 1 },
      tableData: [{}],
      tableDataTotal: 0,
      tableLoading: true,
      editDialogShow: false,
      isAdd: true,
      roleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      authDialogShow: false,
      authData: [],
      authDefaultProps: {
        children: 'children',
        label: 'meta_title'
      },
      curRole: {}
    }
  },
  created () {
    this.page()
    this.queryTree()
  },
  methods: {
    addRole () {
      this.isAdd = true
      this.editDialogShow = true
      this.roleForm = {}
    },
    editRole (index, role) {
      this.isAdd = false
      this.editDialogShow = true
      this.roleForm = { ...role }
    },
    authEdit (index, role) {
      this.authDialogShow = true
      this.curRole = role
    },
    treeOpen () {
      roleMenu({ role_id: this.curRole.id }).then(res => {
        // 需要过滤掉父节点，否则即使子菜单没有全选，会变成全选状态
        const checkedKeys = res.data.filter(item => {
          return item.component !== 'Layout'
        }).map(item => item.id)
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    deleteRole (index, role) {
      this.$confirm(`删除角色【${role.name}】, 是否继续?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleDelete({ id: role.id })
          .then(res => {
            if (res.success) {
              this.$message({ type: 'success', message: '删除成功!' })
              this.page()
            } else {
              this.$message.error(res.data)
            }
          })
          .catch(() => this.$message.error('删除失败！'))
      })
    },
    onSubmit () {
      this.$refs.roleFormRules.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.create()
          } else {
            this.update()
          }
        } else {
          return false
        }
      })
    },
    changeAuthSubmit () {
      const checkedKeys = this.$refs.tree.getCheckedKeys() // 打勾状态
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys() // 半选状态，子节点没有全选的时候
      roleMenuUpdate({ trees: checkedKeys.concat(halfCheckedKeys), role_id: this.curRole.id }).then(res => {
        if (res.success) {
          this.$message({ message: '修改成功！', type: 'success' })
          this.authDialogShow = false
        } else {
          this.$message.error('修改失败！')
        }
      })
        .catch(() => this.$message.error('修改失败！'))
    },
    handleSizeChange (val) {
      this.query.limit = val
      this.page()
    },
    handleCurrentChange (val) {
      this.query.page = val
      this.page()
    },
    page () {
      this.tableLoading = true
      page(this.query).then(res => {
        if (res.success) {
          this.tableData = res.data.rows
          this.tableDataTotal = res.data.count
          this.tableLoading = false
        }
      }).catch(() => { this.tableLoading = false })
    },
    async queryTree () {
      queryTree().then(res => {
        if (res.success) {
          this.authData = res.data
        } else {
          this.$message.error('查询失败！')
        }
      })
        .catch(() => this.$message.error('查询失败！'))
    },
    create () {
      create(this.roleForm)
        .then(res => {
          if (res.success) {
            this.$message({ message: '添加成功！', type: 'success' })
            this.editDialogShow = false
            this.page()
          } else {
            this.$message.error(res.data)
          }
        })
        .catch(() => this.$message.error('添加失败！'))
    },
    update () {
      update(this.roleForm)
        .then(res => {
          if (res.success) {
            this.$message({ message: '修改成功！', type: 'success' })
            this.editDialogShow = false
            this.page()
          } else {
            this.$message.error('修改失败！')
          }
        })
        .catch(() => this.$message.error('修改失败！'))
    }
  }
}
</script>
