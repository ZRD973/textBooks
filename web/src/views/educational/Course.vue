<template>
  <div style="padding:10px;">

    <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="课程">
        <el-input v-model="seacheForm.course" clearable placeholder="请输入学院" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSeacher">搜索</el-button>
        <el-button type="primary" size="small" @click="onAddCourse">添加课程</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="courseTable" v-loading="tableLoading" style="width: 35%">
    <el-table-column type="index" label="序号" align="center" width="55" />
      <el-table-column prop="course" align="center" label="课程名称" width="200" />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
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

    <el-dialog v-model="Dialog" :title="isAdd?'添加课程':'编辑课程信息'" width="35%">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="课程名称" >
          <el-input v-model="form.course" clearable placeholder="请输入课程名称" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElMessage,ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { operateCourse } from '@/api/education/operate';

onMounted(()=>{
  getCourse();
})
const courseTable = ref([]);
const total = ref(0);
const tableLoading = ref(false);
const getCourse = () =>{
  tableLoading.value = true
  operateCourse({
    limit:pageSize.value,
    page:currentPage.value,
    course:seacheForm.value.course,
  }).then(res=>{
    courseTable.value = res.data.rows;
    total.value = res.data.count;
    tableLoading.value = false;
  })
}

const seacheForm = ref({})
const onSeacher = () =>{
  getCourse();
}


const form = ref({});
const Dialog = ref(false);
const isAdd = ref(false);
const onAddCourse = () =>{
  Dialog.value = true;
  isAdd.value = true;
}
const handleEdit = (row) =>{
  Dialog.value = true;
  isAdd.value = false;
  form.value = row;
}
const onSubmit = () =>{
  if(isAdd.value){
    operateCourse({
      data:form.value,
      flag:1
    }).then(res=>{
      if(res.data.same){
        ElMessage({type:'warning',message:res.data.msg})
      }else if(res.success){
        ElMessage({type:'success',message:'添加成功！'})
        getCourse()
        onCancel()
      }else{
        ElMessage({type:'danger',message:'添加失败！'})
      }
    })
  }else{
    operateCourse({
      data:form.value,
      flag:3
    }).then(res=>{
      if(res.data.same){
        ElMessage({type:'warning',message:res.data.msg})
      }else if(res.success){
        ElMessage({type:'success',message:'修改成功！'})
        getCourse()
        onCancel()
      }else{
        ElMessage({type:'danger',message:'修改失败！'})
      }
    })
  }
}
const handleDelete = (row) =>{
  ElMessageBox.confirm(
    '您确定要删除该课程吗？三思哦',
    '请您注意该操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      operateCourse({data:row.id,flag:2}).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'删除成功！'})
          getCourse()
        }else{
          ElMessage({type:'danger',message:'删除失败！'})
        }
      })
    })
    .catch(() => {
      ElMessage({ type: 'info', message: '取消删除', })
    })
}
const onCancel = () =>{
  Dialog.value = false;
  form.value = {}
}

const currentPage = ref(1);
const pageSize = ref(8);
const handleSizeChange = (val) => {
  pageSize.value = val;
  getCourse();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getCourse();
}

</script>

<style>
</style>
