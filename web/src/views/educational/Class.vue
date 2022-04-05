<template>
  <div style="padding:10px;">

    <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="学院">
        <el-input v-model="seacheForm.college" clearable placeholder="请输入学院" size="small" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="seacheForm.class" clearable placeholder="请输入班级" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSeacher">搜索</el-button>
        <el-button type="primary" size="small" @click="onAddClass">添加班级</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="classTable" v-loading="tableLoading" style="width: 100%">
      <el-table-column type="index" label="序号" align="center"/>
      <el-table-column prop="college" align="center" label="学院" />
      <el-table-column prop="grade_major_class" align="center" label="年级专业班级" />
      <el-table-column prop="nums" label="班级人数" align="center" />
      <el-table-column prop="direction" label="方向" align="center"  />
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

    <el-dialog v-model="Dialog" :title="isAdd?'添加班级':'编辑班级信息'" width="35%">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="学院" >
          <el-select v-model="form.college"  placeholder="请选择课程" size="large">
            <el-option label="商学院" value="商学院" />
            <el-option label="法学院" value="法学院" />
            <el-option label="设计学院" value="设计学院" />
            <el-option label="人工智能学院" value="人工智能学院" />
            <el-option label="土木工程学院" value="土木工程学院" />
            <el-option label="现代管理学院" value="现代管理学院" />
            <el-option label="现代音乐学院" value="现代音乐学院" />
            <el-option label="儿童发展与教育学院" value="儿童发展与教育学院" />
            <el-option label="外国语与海外教育学院" value="外国语与海外教育学院" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级专业班级" >
          <el-input v-model="form.grade_major_class" clearable placeholder="请输入年级专业班级" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级人数" >
          <el-input v-model="form.nums" clearable placeholder="请输入班级人数" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专业方向" >
          <el-input v-model="form.direction" clearable placeholder="请输入专业方向" autocomplete="off" />
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
import { operateClass } from '@/api/education/operate';

onMounted(()=>{
  getClass();
})

const classTable = ref([]);
const total = ref(0);
const tableLoading = ref(false);
const getClass = () =>{
  tableLoading.value = true;
  operateClass({
    limit:pageSize.value,
    page:currentPage.value,
    class:seacheForm.value.class,
    college:seacheForm.value.college,
  }).then(res=>{
    classTable.value = res.data.rows;
    total.value = res.data.count;
    tableLoading.value = false;
  })
}

const seacheForm = ref({})
const onSeacher = () =>{
  getClass();
}


const form = ref({});
const Dialog = ref(false);
const isAdd = ref(false);
const onAddClass = () =>{
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
    operateClass({
      data:form.value,
      flag:1
    }).then(res=>{
      if(res.data.same){
        ElMessage({type:'warning',message:res.data.msg})
      }else if(res.success){
        ElMessage({type:'success',message:'添加成功！'})
        getClass()
        onCancel()
      }else{
        ElMessage({type:'danger',message:'添加失败！'})
      }
    })
  }else{
    operateClass({
      data:form.value,
      flag:3
    }).then(res=>{
      if(res.data.same){
        ElMessage({type:'warning',message:res.data.msg})
      }else if(res.success){
        ElMessage({type:'success',message:'修改成功！'})
        getClass()
        onCancel()
      }else{
        ElMessage({type:'danger',message:'修改失败！'})
      }
    })
  }
}
const handleDelete = (row) =>{
  ElMessageBox.confirm(
    '您确定要删除该班级吗？三思哦',
    '请您注意该操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      operateClass({data:row.id,flag:2}).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'删除成功！'})
          getClass()
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
  getClass();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getClass();
}

</script>

<style>
</style>
