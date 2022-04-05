<template>
  <div style="padding:20px;margin:20px;">

    <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="教材">
        <el-input v-model="seacheForm.book" clearable placeholder="请输入教材名称" size="small" />
      </el-form-item>
      <el-form-item label="书号">
        <el-input v-model="seacheForm.ISBN" clearable placeholder="请输入教材书号" size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="refresh">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="bookTable" v-loading="tableLoading" size="small" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" fixed="left" width="55"  />
      <el-table-column prop="book" align="center" label="教材名称" fixed="left" width="200" show-overflow-tooltip />
      <el-table-column prop="editor" align="center" label="主编" show-overflow-tooltip />
      <el-table-column prop="pubDate" align="center" label="出版时间" show-overflow-tooltip />
      <el-table-column prop="ISBN" align="center" label="书号"  show-overflow-tooltip />
      <el-table-column prop="publisher" align="center" label="出版社" show-overflow-tooltip />
      <el-table-column prop="book_type" align="center" label="教材类型" show-overflow-tooltip />
      <el-table-column prop="book_usage" align="center" label="使用情况" show-overflow-tooltip />
      <el-table-column prop="price" align="center" label="单价"  show-overflow-tooltip />
      <el-table-column prop="book_total" align="center" label="教材库存" fixed="right" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="handleAddBook(row)">增订</el-button>
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

     <el-dialog v-model="addDialog" title="续订教材" width="55%">
       <el-form :model="form" :inline="true"  :rules="rules" ref="ruleFormRef"  label-width="120px">
        <el-form-item label="教材名称" prop="book">
          <el-input v-model="form.book" disabled placeholder="请输入教材名称" /> 
        </el-form-item>
        <el-form-item label="学生用书" prop="sdt_book_nums">
          <el-input v-model.number="form.sdt_book_nums" placeholder="请输入学生用书数量" /> 
        </el-form-item>
        <el-form-item label="学生备用" prop="standby_nums">
          <el-input v-model.number="form.standby_nums" placeholder="请输入学生备用书数量" /> 
        </el-form-item>
        <el-form-item label="教师用书" prop="tch_book_nums">
          <el-input v-model.number="form.tch_book_nums" placeholder="请输入教师用书数量" /> 
        </el-form-item>
        <el-form-item label="教材单价" prop="price">
          <el-input v-model.number="form.price" disabled placeholder="请输入教材单价(单位：元)" /> 
        </el-form-item>
        <el-form-item label="教材总数">
          <el-input v-model.number="bookTotal" disabled placeholder="教材总价" /> 
        </el-form-item>
        <el-form-item label="教材总价">
          <el-input v-model.number="bookPriceTotal" disabled placeholder="教材总价" /> 
        </el-form-item>
        <el-form-item label="教材使用情况" prop="book_usage">
          <el-select v-model="form.book_usage"  placeholder="请选择教材使用情况">
            <el-option label="选用" value="选用" />
            <el-option label="不选用" value="不选用" />
          </el-select>
        </el-form-item>
      </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialog=false">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </span>
        </template>
    </el-dialog>



  </div>
</template>
<script setup>
import { ElMessage,ElMessageBox } from 'element-plus';
import { computed, onMounted, reactive, ref} from 'vue';
import { operateRecord, operateStore } from '@/api/book/operate';
import { getRecordDetail } from '@/api/education/operate';
import dayjs from 'dayjs';
onMounted(()=>{
  refresh();
})
const tableLoading = ref(false);
const refresh = () =>{
  tableLoading.value = true;
  operateStore({
    limit:pageSize.value,
    page:currentPage.value,
    book:seacheForm.book,
    ISBN:seacheForm.ISBN,
  }).then(res=>{
    bookTable.value = res.data.rows;
    total.value = res.data.count;
    bookTable.value.forEach((item)=>{
      item.pubDate ? item.pubDate = dayjs(item.birth).format('YYYY-MM') : ''
    })
    tableLoading.value = false;
  })
}

// 搜索表单
const seacheForm = reactive({});

// 表格
const bookTable = ref([]);
const total = ref(0);
const bookTotal = computed(()=>{
  let total = form.value.sdt_book_nums + form.value.standby_nums + form.value.tch_book_nums;
  return total;
})
const bookPriceTotal = computed(()=>{
  let total = (form.value.sdt_book_nums + form.value.standby_nums + form.value.tch_book_nums) * Number(form.value.price);
  return total;
})
const addDialog = ref(false);
const form = ref({});
const handleAddBook = (row) =>{
  getRecordDetail({record_id:row.record_id}).then(res=>{
    form.value = res.data[0];
    form.value.sdt_book_nums=0
    form.value.standby_nums=0
    form.value.tch_book_nums=0
    addDialog.value = true;
  })
}

const onSubmit = () =>{
  if(bookTotal.value==0){
    ElMessage({type:'warning',message:'未填写征订数量！'});
    return;
  }
  delete form.value.id;
  form.value.total = bookPriceTotal.value;
  form.value.book_total = bookTotal.value;
  form.value.apply = 1;
  operateRecord({
    data:form.value,
    flag:1
  }).then(res=>{
    if(res.success){
      ElMessage({type:'success',message:'申请成功！'});
      addDialog.value = false;
    }else{
      ElMessage({type:'danger',message:'申请失败！'});
    }
  })
}



// 分页
const currentPage = ref(1);
const pageSize = ref(8);
const handleSizeChange = (val) => {
  pageSize.value = val;
  refresh();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  refresh();
}

</script>

<style>
</style>
