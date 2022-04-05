<template>
  <div style="padding: 10px;">

     <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="用户名">
        <el-input v-model="seacheForm.username" clearable placeholder="请输入用户名" size="small" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="seacheForm.name" clearable placeholder="请输入姓名" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSeacher">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="teacherTable" v-loading="tableLoading" style="width: 60%">
      <el-table-column type="index" label="序号" align="center" width="55" />
      <el-table-column prop="username" align="center" label="用户名" width="120" />
      <el-table-column prop="name" label="姓名" align="center" width="120" />
      <el-table-column prop="sex" label="性别" align="center" width="80">
          <template v-slot="scope">{{
            scope.row.sex === "1" ? "男" : scope.row.sex === "0" ? "女" : ""
          }}</template>
        </el-table-column>
      <el-table-column prop="phone" label="电话" align="center" width="150" />
    </el-table>


    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[8, 20, 30, 50]"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { operateTeacher } from '@/api/education/operate';
onMounted(()=>{
  getTeacher()
})
const teacherTable = ref([]);
const total = ref(0);
const tableLoading = ref(false);
const getTeacher = () =>{
  tableLoading.value = true
  operateTeacher({
    limit:pageSize.value,
    page:currentPage.value,
    username:seacheForm.value.username,
    name:seacheForm.value.name,
  }).then(res=>{
    teacherTable.value = res.data.rows;
    total.value = res.data.count;
    tableLoading.value = false
  })
}

const seacheForm = ref({})
const onSeacher = () =>{
  getTeacher();
}

const currentPage = ref(1);
const pageSize = ref(8);
const handleSizeChange = (val) => {
  pageSize.value = val;
  getTeacher();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getTeacher();
}

</script>

<style>
</style>
